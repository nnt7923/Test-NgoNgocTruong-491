"use client";

import { Compass, Home, UserRound } from "lucide-react";
import styles from "./AppNav.module.css";

const navItems = [
  { label: "Trang chủ", icon: Home },
  { label: "Khám phá", icon: Compass },
  { label: "Hồ sơ", icon: UserRound },
];

export function AppNav() {
  return (
    <nav className={styles.nav} aria-label="Điều hướng chính">
      {navItems.map((item, index) => {
        const Icon = item.icon;

        return (
          <button
            className={`${styles.navButton} ${index === 0 ? styles.active : ""}`}
            type="button"
            key={item.label}
            aria-label={item.label}
            title={item.label}
          >
            <Icon aria-hidden="true" size={22} strokeWidth={2.4} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
