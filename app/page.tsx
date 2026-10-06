"use client";

import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import styles from "./page.module.css";

interface Particle {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  drift: number;
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
      // Calculate scroll progress from 0 (top) to 1 (scrolled 1 screen height)
      const progress = Math.min(Math.max(scrollY / (windowHeight * 0.8), 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Image fade out & slide up as scrollProgress goes 0 -> 1
  const imageOpacity = Math.max(1 - scrollProgress * 1.5, 0);
  const imageTranslateY = -20 - scrollProgress * 80; // slides up

  // About content fade in & slide up as scrollProgress goes 0 -> 1
  const aboutOpacity = Math.min(Math.max((scrollProgress - 0.2) * 1.4, 0), 1);
  const aboutTranslateY = 60 * (1 - aboutOpacity); // slides into place from bottom

  return (
    <main className={styles.heroPage}>
      <Navbar />

      {/* Main Single-Viewport Container with Fixed Hero Background */}
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

          {/* Floating Center Image: fades out and slides up on scroll */}
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

          {/* About Section: fades in and slides up on scroll over the SAME background */}
          <div
            className={styles.aboutContainer}
            id="about"
            style={{
              opacity: aboutOpacity,
              transform: `translateY(${aboutTranslateY}px)`,
              pointerEvents: aboutOpacity < 0.1 ? "none" : "auto",
            }}
          >
            <div className={styles.aboutBadge}>
              <span>ABOUT SHAURYA 2026</span>
            </div>
            <h2 className={styles.aboutTitle}>
              Brave Hearts Write History With Courage
            </h2>
            <p className={styles.aboutDescription}>
              Shaurya is IIT Kharagpur&apos;s premier annual sports festival, bringing together athletes and enthusiasts from across the nation. Celebrating skill, spirit, and sportsmanship, Shaurya provides a high-octane platform to compete, excel, and carve a legacy in gold.
            </p>

            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <h3 className={styles.statNumber}>50+</h3>
                <p className={styles.statLabel}>Colleges Participating</p>
              </div>
              <div className={styles.statCard}>
                <h3 className={styles.statNumber}>₹5L+</h3>
                <p className={styles.statLabel}>Prize Pool</p>
              </div>
              <div className={styles.statCard}>
                <h3 className={styles.statNumber}>20+</h3>
                <p className={styles.statLabel}>Sporting Events</p>
              </div>
              <div className={styles.statCard}>
                <h3 className={styles.statNumber}>10,000+</h3>
                <p className={styles.statLabel}>Footfall & Audience</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
