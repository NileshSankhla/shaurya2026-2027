"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import styles from "./page.module.css";

const Navbar = dynamic(() => import("./Navbar"), { ssr: false });
const ShipCanvas = dynamic(() => import("./ShipCanvas"), { ssr: false });
const GamesSection = dynamic(() => import("./GamesSection"), { ssr: false });

interface Particle {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  drift: number;
}

interface StatItemProps {
  prefix?: string;
  targetNumber: number;
  suffix?: string;
  label: string;
  isFullyScrolled: boolean;
}

const PARTICLES: Particle[] = Array.from({ length: 45 }, (_, i) => ({
  id: i,
  left: (i * 37) % 100,
  size: 2 + ((i * 13) % 30) / 10,
  duration: 5 + ((i * 17) % 70) / 10,
  delay: ((i * 19) % 80) / 10,
  opacity: 0.3 + ((i * 23) % 70) / 100,
  drift: ((i * 29) % 120) - 60,
}));

function StatCounter({ prefix = "", targetNumber, suffix = "", label, isFullyScrolled }: StatItemProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isFullyScrolled) {
      return;
    }

    const startTime = performance.now();
    const duration = 1500;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(targetNumber * easeProgress));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(() => {
      setCount(0);
      animate(performance.now());
    });
    return () => cancelAnimationFrame(animationFrameId);
  }, [isFullyScrolled, targetNumber]);

  return (
    <div className={styles.statCard}>
      <h3 className={styles.statNumber}>
        {prefix}
        {(isFullyScrolled ? count : 0).toLocaleString()}
        {suffix}
      </h3>
      <p className={styles.statLabel}>{label}</p>
    </div>
  );
}

const TOTAL_SECTIONS = 3; // 0=Hero, 1=About, 2=Games
const TRANSITION_MS = 800; // matches CSS transition duration

export default function Home() {
  const [particlesVisible, setParticlesVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const isAnimatingRef = useRef(false);
  const touchStartY = useRef(0);

  const navigateSection = useCallback(
    (direction: 1 | -1) => {
      if (isAnimatingRef.current) return;

      setActiveSection((prev) => {
        const next = prev + direction;
        if (next < 0 || next >= TOTAL_SECTIONS) return prev;
        isAnimatingRef.current = true;
        setTimeout(() => {
          isAnimatingRef.current = false;
        }, TRANSITION_MS);
        return next;
      });
    },
    []
  );

  // Wheel navigation
  useEffect(() => {
    const particleFrame = requestAnimationFrame(() => setParticlesVisible(true));

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) < 15) return;
      navigateSection(e.deltaY > 0 ? 1 : -1);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      cancelAnimationFrame(particleFrame);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [navigateSection]);

  // Keyboard navigation (arrow keys)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        navigateSection(1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        navigateSection(-1);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [navigateSection]);

  // Touch swipe navigation
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 50) return; // minimum swipe distance
      navigateSection(delta > 0 ? 1 : -1);
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [navigateSection]);

  // --- Animation values derived from activeSection ---

  // Hero image: visible only on section 0
  const imageOpacity = activeSection === 0 ? 1 : 0;
  const imageTranslateY = activeSection === 0 ? -20 : -140;

  // About: visible only on section 1
  const aboutOpacity = activeSection === 1 ? 1 : 0;
  const textTranslateX =
    activeSection === 0 ? -80 : activeSection === 1 ? 0 : -150;
  const shipTranslateX =
    activeSection === 0 ? 100 : activeSection === 1 ? 0 : 150;

  // Games: visible only on section 2
  const gamesOpacity = activeSection === 2 ? 1 : 0;
  const gamesTranslateY = activeSection === 2 ? 0 : 40;

  // Stat counter trigger
  const isFullyScrolled = activeSection === 1;

  return (
    <main className={styles.heroPage}>
      <Navbar />

      <section className={styles.heroSection}>
        {/* Ash Particles overlay */}
        <div className={styles.particlesContainer} aria-hidden="true">
          {particlesVisible && PARTICLES.map((p) => (
            <span
              key={p.id}
              className={styles.particle}
              style={
                {
                  left: `${p.left}%`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  animationDuration: `${p.duration}s`,
                  animationDelay: `${p.delay}s`,
                  opacity: p.opacity,
                  "--drift": `${p.drift}px`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        {/* Hero image — fades out when leaving section 0 */}
        <div
          className={styles.centerImageWrap}
          style={{
            opacity: imageOpacity,
            transform: `translateY(${imageTranslateY}px)`,
            pointerEvents: activeSection === 0 ? "auto" : "none",
          }}
        >
          <Image
            src="/image.png"
            alt="Shaurya"
            width={650}
            height={500}
            className={styles.centerImage}
          />
        </div>

        {/* About section — visible on section 1 */}
        <div
          className={styles.aboutWrapper}
          id="about"
          style={{
            opacity: aboutOpacity,
            pointerEvents: activeSection === 1 ? "auto" : "none",
          }}
        >
          <div className={styles.aboutGrid}>
            <div
              className={styles.aboutTextContent}
              style={{ transform: `translateX(${textTranslateX}px)` }}
            >
              <h3 className={styles.aboutYellowHeading}>ABOUT US</h3>
              <h2 className={styles.aboutTitle}>
                Brave Hearts Write History With Courage
              </h2>
              <p className={styles.aboutDescription}>
                Shaurya is IIT Kharagpur&apos;s premier annual sports festival,
                bringing together athletes and enthusiasts from across the
                nation. Celebrating skill, spirit, and sportsmanship, Shaurya
                provides a high-octane platform to compete, excel, and carve a
                legacy in gold.
              </p>

              <div className={styles.statsGrid}>
                <StatCounter
                  targetNumber={50}
                  suffix="+"
                  label="Colleges Participating"
                  isFullyScrolled={isFullyScrolled}
                />
                <StatCounter
                  prefix="₹"
                  targetNumber={5}
                  suffix="L+"
                  label="Prize Pool"
                  isFullyScrolled={isFullyScrolled}
                />
                <StatCounter
                  targetNumber={20}
                  suffix="+"
                  label="Sporting Events"
                  isFullyScrolled={isFullyScrolled}
                />
                <StatCounter
                  targetNumber={10000}
                  suffix="+"
                  label="Footfall & Audience"
                  isFullyScrolled={isFullyScrolled}
                />
              </div>
            </div>

            <div
              className={styles.aboutShipContainer}
              style={{ transform: `translateX(${shipTranslateX}px)` }}
            >
              <ShipCanvas />
            </div>
          </div>
        </div>

        {/* Games section — visible on section 2 */}
        <div
          className={styles.gamesWrapper}
          id="games"
          style={{
            opacity: gamesOpacity,
            transform: `translateY(${gamesTranslateY}px)`,
            pointerEvents: activeSection === 2 ? "auto" : "none",
          }}
        >
          <GamesSection />
        </div>
      </section>
    </main>
  );
}
