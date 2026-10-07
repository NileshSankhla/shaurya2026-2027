import styles from "./Navbar.module.css";

interface NavbarProps {
  links?: Array<{ label: string; href: string }>;
}

const defaultLinks = [
  { label: "Home", href: "#home" },
  { label: "Events", href: "#events" },
  { label: "Games", href: "#games" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "Team", href: "/teams" },
];

export default function Navbar({ links = defaultLinks }: NavbarProps) {
  // Keep the first two links left of the logo and render the rest on the right.
  const leftLinks = links.slice(0, 2);
  const rightLinks = links.slice(2);

  return (
    <header className={styles.headerFixed}>
      <nav className={styles.navbar} aria-label="Main navigation">
        <div className={styles.navContainer}>
          <div className={styles.leftGroup}>
            {leftLinks.map((link) => (
              <a key={link.label} href={link.href} className={styles.navBtn}>
                {link.label}
              </a>
            ))}
          </div>

          <div className={styles.logoWrap}>
            <a href={links[0]?.href ?? "#home"} className={styles.logoLink}>
              <img src="/logo.png" alt="Shaurya logo" className={styles.logo} />
            </a>
          </div>

          <div className={styles.rightGroup}>
            {rightLinks.map((link) => (
              <a key={link.label} href={link.href} className={styles.navBtn}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
