"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./GamesSection.module.css";

interface Game {
  image: string;
  name: string;
  description: string;
}

const games: Game[] = [
  {
    image: "/games/cricket.png",
    name: "Cricket",
    description:
      "Experience the thrill of leather on willow as top university teams battle for glory in powerplay tournaments and T20 showdowns.",
  },
  {
    image: "/games/football.png",
    name: "Football",
    description:
      "Watch electrifying 11-a-side matches where strategy meets raw athleticism on the pitch under floodlights.",
  },
  {
    image: "/games/basketball.png",
    name: "Basketball",
    description:
      "Fast-paced court action with slam dunks, buzzer-beaters, and fierce inter-college rivalries that keep the crowd roaring.",
  },
];

export default function GamesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalGames = games.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % totalGames);
      }, 500); // matches the CSS transition duration
    }, 3500);

    return () => clearInterval(interval);
  }, [totalGames]);

  return (
    <section className={styles.gamesSection} id="games">
      <div className={styles.sectionHeader}>
        <h3 className={styles.yellowHeading}>OUR GAMES</h3>
        <h2 className={styles.sectionTitle}>Compete. Conquer. Celebrate.</h2>
      </div>

      <div className={styles.carouselTrack}>
        {games.map((game, idx) => {
          // Compute slot position (0: Left, 1: Center/Active, 2: Right)
          const position = (idx - activeIndex + 1 + totalGames) % totalGames;
          const isActive = position === 1;

          return (
            <div
              key={game.name}
              className={`${styles.gameCard} ${isActive ? styles.cardActive : ""}`}
              style={{ "--card-pos": position } as React.CSSProperties}
              onClick={() => setActiveIndex(idx)}
            >
              <div className={styles.cardImageWrap}>
                <Image
                  src={game.image}
                  alt={game.name}
                  width={340}
                  height={300}
                  className={styles.cardImage}
                />
              </div>
              <div className={styles.cardInfo}>
                <h4 className={styles.cardName}>{game.name}</h4>
                <p className={styles.cardDesc}>{game.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dot indicators */}
      <div className={styles.dotsRow}>
        {games.map((_, idx) => (
          <button
            key={idx}
            className={`${styles.dot} ${
              idx === activeIndex ? styles.dotActive : ""
            }`}
            onClick={() => {
              setTimeout(() => {
                setActiveIndex(idx);
              }, 400);
            }}
            aria-label={`Show game ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
