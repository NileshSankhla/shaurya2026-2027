"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "./Navbar";
import styles from "./page.module.css";

const ShipCanvas = dynamic(() => import("./ShipCanvas"), { ssr: false });

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

  useEffect(() => {
    // Generate static array of 40 ash particles with varying sizes, speeds, and drifts
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
  }, []);

  return (
    <main className={styles.heroPage}>
      <Navbar />
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

        {/* 3D Pirate Ship at Bottom Left */}
        <div className={styles.bottomLeftShip}>
          <ShipCanvas />
        </div>

        <div className={styles.centerImageWrap}>
          <img src="/image.png" alt="Shaurya" className={styles.centerImage} />
        </div>

        <img
          src="/coins.png"
          alt="Coins"
          className={styles.bottomRightCoins}
        />
        <img
          src="/chest2.png"
          alt="Chest"
          className={styles.bottomRightChest}
        />
      </section>

      {/* About Section */}
      <section className={styles.aboutSection} id="about">
        <div className={styles.aboutContainer}>
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
    </main>
  );
}
