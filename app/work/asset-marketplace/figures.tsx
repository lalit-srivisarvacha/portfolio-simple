import { Icon, type IconName } from "@/components/ui";
import type { CSSProperties } from "react";
import styles from "./figures.module.css";

/*
 * Drawn figures for the asset marketplace case study, in the page's own
 * tones. Each fills the image well it is placed in and plays a short
 * entrance when it mounts; under reduced motion it simply appears.
 */

type FanPill = { label: string; icon: IconName; x: number; y: number; delay: number; hot?: boolean };

/* Positions are percentages of the 2:1 fan box; the hub sits at its bottom centre. */
const FAN: FanPill[] = [
  { label: "Codebases", icon: "code", x: 50, y: 52.14, delay: 120, hot: true },
  { label: "Domains", icon: "globe", x: 34, y: 85.07, delay: 155 },
  { label: "Patents & IP", icon: "scroll", x: 39.34, y: 66.19, delay: 190 },
  { label: "Contracts", icon: "files", x: 60.66, y: 66.19, delay: 225 },
  { label: "Apps", icon: "appStore", x: 66, y: 85.07, delay: 260 },
  { label: "Websites", icon: "monitor", x: 22.14, y: 70.44, delay: 435 },
  { label: "Physical hardware", icon: "hardDrives", x: 28.68, y: 49.53, delay: 470 },
  { label: "Inventory", icon: "stack", x: 36.54, y: 37.89, delay: 260 },
  { label: "Workspace data", icon: "database", x: 50, y: 26.07, delay: 295, hot: true },
  { label: "Branding", icon: "dna", x: 63.46, y: 37.89, delay: 330 },
  { label: "LLM models", icon: "cpu", x: 71.32, y: 49.53, delay: 365 },
  { label: "Vendors", icon: "storefront", x: 77.86, y: 70.44, delay: 400 },
  { label: "Digital products", icon: "package", x: 9.47, y: 85.05, delay: 575 },
  { label: "Content library", icon: "bookOpen", x: 12.33, y: 60.28, delay: 610 },
  { label: "Partnerships", icon: "handshake", x: 21.27, y: 33.26, delay: 400 },
  { label: "Licenses & permits", icon: "sealCheck", x: 34.78, y: 15.38, delay: 435 },
  { label: "Financial assets", icon: "handCoins", x: 65.22, y: 15.38, delay: 470 },
  { label: "Subscription base", icon: "repeat", x: 78.73, y: 33.26, delay: 505 },
  { label: "Distribution", icon: "shareNetwork", x: 87.67, y: 60.28, delay: 540 },
  { label: "Audience", icon: "usersThree", x: 90.53, y: 85.05, delay: 575 },
];

const RINGS = [72, 134, 196, 258, 320, 382, 444, 506, 568];

/** AssetHub at the centre, with the kinds of assets founders can sell fanning out around it. */
export function AssetFan() {
  return (
    <div className={styles.frame}>
      <div
        className={styles.fan}
        role="img"
        aria-label="AssetHub at the centre, with the kinds of assets founders can sell fanning out around it: codebases and workspace data, along with patents and IP, domains, physical hardware, websites, contracts, apps, branding and more."
      >
        <svg className={styles.rings} viewBox="0 0 1120 560" aria-hidden="true">
          {RINGS.map((r, i) => (
            <path key={r} d={`M${560 - r} 508 A ${r} ${r} 0 0 1 ${560 + r} 508`} style={{ opacity: Math.max(0.25, 1 - i * 0.1) }} />
          ))}
        </svg>
        <span className={styles.hub} style={{ left: "50%", top: "90.71%" }}>
          <Icon name="tag" />
        </span>
        {FAN.map((p) => (
          <span
            key={p.label}
            className={`${styles.fanPill} ${p.hot ? styles.hot : ""}`}
            style={{ left: `${p.x}%`, top: `${p.y}%`, "--d": `${p.delay}ms` } as CSSProperties}
          >
            <Icon name={p.icon} />
            {p.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Codebases and workspace data flow into AI labs as training data; LLMs come out the other side. */
export function TrainingFlow() {
  return (
    <div className={styles.frame}>
      <div
        className={styles.flow}
        role="img"
        aria-label="Codebases and workspace data flow into AI labs as training data, and LLMs come out the other side."
      >
        <svg className={`${styles.flowLines} ${styles.flowRings}`} viewBox="0 0 1000 640" aria-hidden="true">
          <circle cx="520" cy="320" r="140" />
          <circle cx="520" cy="320" r="205" style={{ opacity: 0.6 }} />
          <circle cx="520" cy="320" r="270" style={{ opacity: 0.3 }} />
        </svg>
        <svg
          className={`${styles.flowLines} ${styles.wipe}`}
          viewBox="0 0 1000 640"
          aria-hidden="true"
          style={{ "--a": "28%", "--b": "46%", "--d": "600ms", "--t": "800ms" } as CSSProperties}
        >
          <path d="M292 192 C 392 192 362 320 434 320" />
          <path d="M292 448 C 392 448 362 320 434 320" />
        </svg>
        <svg
          className={`${styles.flowLines} ${styles.wipe}`}
          viewBox="0 0 1000 640"
          aria-hidden="true"
          style={{ "--a": "58%", "--b": "73%", "--d": "1440ms", "--t": "550ms" } as CSSProperties}
        >
          <path d="M606 320 L 716 320" />
        </svg>
        <span className={styles.flowPill} style={{ left: "29%", top: "30%", "--d": "280ms" } as CSSProperties}>
          <Icon name="code" />
          Codebases
        </span>
        <span className={styles.flowCap} style={{ left: "29%", top: "50%", "--d": "360ms" } as CSSProperties}>
          Training data
        </span>
        <span className={styles.flowPill} style={{ left: "29%", top: "70%", "--d": "440ms" } as CSSProperties}>
          <Icon name="database" />
          Workspace data
        </span>
        <span className={styles.lab} style={{ "--d": "1020ms" } as CSSProperties}>
          <Icon name="flask" />
          <b>AI labs</b>
        </span>
        <span className={styles.out} style={{ "--d": "1680ms" } as CSSProperties}>
          <i>
            <Icon name="sparkle" />
          </i>
          <span>
            <b>LLMs</b>
            <em>Trained models</em>
          </span>
        </span>
      </div>
    </div>
  );
}
