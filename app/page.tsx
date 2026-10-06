"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "./Navbar";
import styles from "./page.module.css";

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

function StatCounter({ prefix = "", targetNumber, suffix = "", label, isFullyScrolled }: StatItemProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isFullyScrolled) {
      setCount(0);
      return;
    }

    // Smooth timer-based count up over 1.5s once fully scrolled to About section
    const startTime = performance.now();
    const duration = 1500;

    let animationFrameId: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic function for smooth deceleration at the end
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(targetNumber * easeProgress));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isFullyScrolled, targetNumber]);

  return (
    <div className={styles.statCard}>
      <h3 className={styles.statNumber}>
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </h3>
      <p className={styles.statLabel}>{label}</p>
    </div>
  );
}

export default function Home() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Generate static array of ash particles with varying sizes, speeds, and drifts
    const generated: Particle[] = Array.from({ length: 45 }, (_, i) => ({
      id: i,
      left: Math.random() * 100, // percentage across width
      size: Math.random() * 5 + 2, // 2px to 7px size
      duration: Math.random() * 7 + 5, // 5s to 12s float speed
      delay: Math.random() * 8, // staggered start delays up to 8s
      opacity: Math.random() * 0.7 + 0.3,
      drift: (Math.random() - 0.5) * 120, // horizontal sway px
    }));
    setParticles(generated);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      // Scroll progress: 0→1 (phase 1: hero→about), 1→2 (phase 2: about→games)
      const progress = Math.min(Math.max(scrollY / (windowHeight * 0.8), 0), 2);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- Phase 1: scrollProgress 0 → 1 (hero image fades, about/ship slide in) ---
  const phase1 = Math.min(scrollProgress, 1);

  // --- Phase 2: scrollProgress 1 → 2 (about exits left, ship exits right, games fades in) ---
  const phase2 = Math.min(Math.max(scrollProgress - 1, 0), 1);

  // 1. image.png fade-slide to top (phase 1 only)
  const imageOpacity = Math.max(1 - phase1 * 1.5, 0);
  const imageTranslateY = -20 - phase1 * 120;

  // 2. About section: fade in during phase 1, fade out during phase 2
  const aboutFadeIn = Math.min(Math.max((phase1 - 0.2) * 1.4, 0), 1);
  const aboutFadeOut = 1 - phase2;
  const aboutOpacity = aboutFadeIn * aboutFadeOut;

  // Text: slide in from left (phase 1), slide out to left (phase 2)
  const textSlideIn = -80 * (1 - aboutFadeIn);
  const textSlideOut = -150 * phase2;
  const textTranslateX = textSlideIn + textSlideOut;

  // Ship: slide in from right (phase 1), slide out to right (phase 2)
  const shipSlideIn = 100 * (1 - aboutFadeIn);
  const shipSlideOut = 150 * phase2;
  const shipTranslateX = shipSlideIn + shipSlideOut;

  // 3. Games section: fades in during phase 2
  const gamesOpacity = phase2;
  const gamesTranslateY = 40 * (1 - phase2); // slides up slightly as it appears

  // Flag indicating when page is fully scrolled to the About section (phase1 >= 0.85)
  const isFullyScrolled = phase1 >= 0.85 && phase2 < 0.3;

  return (
    <main className={styles.heroPage}>
      <Navbar />

      {/* Tall scroll driver — 300vh so we get 2x viewport of scroll distance */}
      <div className={styles.scrollContainer}>
        <section className={styles.heroSection}>
          {/* Ash Particles overlay */}
          <div className={styles.particlesContainer} aria-hidden="true">
            {particles.map((p) => (
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

          {/* Floating Center Image: fades out and slides UP to top on scroll */}
          <div
            className={styles.centerImageWrap}
            style={{
              opacity: imageOpacity,
              transform: `translateY(${imageTranslateY}px)`,
              pointerEvents: imageOpacity < 0.1 ? "none" : "auto",
            }}
          >
            <img src="/image.png" alt="Shaurya" className={styles.centerImage} />
          </div>

          {/* About Section Container — exits left/right in phase 2 */}
          <div
            className={styles.aboutWrapper}
            id="about"
            style={{
              opacity: aboutOpacity,
              pointerEvents: aboutOpacity < 0.1 ? "none" : "auto",
            }}
          >
            <div className={styles.aboutGrid}>
              {/* About Text Content: fades and slides from LEFT, exits LEFT */}
              <div
                className={styles.aboutTextContent}
                style={{
                  transform: `translateX(${textTranslateX}px)`,
                }}
              >
                <h3 className={styles.aboutYellowHeading}>ABOUT US</h3>
                <h2 className={styles.aboutTitle}>
                  Brave Hearts Write History With Courage
                </h2>
                <p className={styles.aboutDescription}>
                  Shaurya is IIT Kharagpur&apos;s premier annual sports festival, bringing together athletes and enthusiasts from across the nation. Celebrating skill, spirit, and sportsmanship, Shaurya provides a high-octane platform to compete, excel, and carve a legacy in gold.
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

              {/* 3D Pirate Ship canvas: slides from RIGHT, exits RIGHT */}
              <div
                className={styles.aboutShipContainer}
                style={{
                  transform: `translateX(${shipTranslateX}px)`,
                }}
              >
                <ShipCanvas />
              </div>
            </div>
          </div>

          {/* Games Section: fades in during phase 2, inside the fixed hero */}
          <div
            className={styles.gamesWrapper}
            id="games"
            style={{
              opacity: gamesOpacity,
              transform: `translateY(${gamesTranslateY}px)`,
              pointerEvents: gamesOpacity < 0.1 ? "none" : "auto",
            }}
          >
            <GamesSection />
          </div>
        </section>
      </div>
    </main>
  );
}
