"use client";

import { useSyncExternalStore } from "react";
import { Icon } from "./Icon";

type Theme = "light" | "dark";

/* The <html data-theme> attribute is the single source of truth; the inline
   script in app/layout.tsx sets it before paint. This hook mirrors it. */
function subscribe(onChange: () => void) {
  const obs = new MutationObserver(onChange);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => obs.disconnect();
}
const getSnapshot = (): Theme =>
  document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
const getServerSnapshot = (): Theme => "light";

export function useTheme(): [Theme, (t: Theme) => void] {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const set = (t: Theme) => {
    document.documentElement.setAttribute("data-theme", t);
    try {
      localStorage.setItem("theme", t);
    } catch {}
  };
  return [theme, set];
}

/** 64×32 pill switch: sun and moon slots, an ink knob under the active theme. Flips data-theme on <html> and persists the choice. */
export function ThemeToggle() {
  const [theme, setTheme] = useTheme();
  const dark = theme === "dark";
  return (
    <button
      type="button"
      className="lds-toggle"
      role="switch"
      aria-checked={dark}
      aria-label="Dark mode"
      onClick={() => setTheme(dark ? "light" : "dark")}
    >
      <span className="lds-toggle__knob" aria-hidden="true" />
      <span className="lds-toggle__slot lds-toggle__slot--light">
        <Icon name="sun" />
      </span>
      <span className="lds-toggle__slot lds-toggle__slot--dark">
        <Icon name="moon" />
      </span>
    </button>
  );
}
