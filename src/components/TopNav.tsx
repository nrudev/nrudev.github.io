import { useEffect, useState } from "react";
import { PORTFOLIO } from "@/data";
import type { Theme } from "@/types";
import { ArrowOut, MoonIcon, Spike, SunIcon } from "@/components/Icons";

interface TopNavProps {
  theme: Theme;
  onToggleTheme: () => void;
  onBrandClick: () => void;
}

export function TopNav({ theme, onToggleTheme, onBrandClick }: TopNavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`top-nav${scrolled ? " scrolled" : ""}`}>
      <div className="container top-nav-inner">
        <a
          href="#top"
          className="brand"
          onClick={(e) => {
            e.preventDefault();
            onBrandClick();
          }}
        >
          <Spike />
          <span>{PORTFOLIO.name}</span>
        </a>
        <div className="nav-links">
          {PORTFOLIO.nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </div>
        <div className="nav-right">
          <button
            type="button"
            className="theme-toggle"
            aria-label="Toggle theme"
            onClick={onToggleTheme}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <a
            className="btn btn-primary"
            href={PORTFOLIO.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <ArrowOut />
          </a>
        </div>
      </div>
    </nav>
  );
}
