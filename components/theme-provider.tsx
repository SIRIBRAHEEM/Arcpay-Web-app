"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";

type Theme = "light" | "dark";
type ThemePreference = Theme | "system";

type ThemeContextValue = {
  theme: Theme;
  preference: ThemePreference;
  setThemePreference: (preference: ThemePreference) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const THEME_STORAGE_KEY = "arcpay:theme-preference";
const SYSTEM_THEME_QUERY = "(prefers-color-scheme: dark)";

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";

  return window.matchMedia(SYSTEM_THEME_QUERY).matches ? "dark" : "light";
}

function getStoredPreference(): ThemePreference {
  if (typeof window === "undefined") return "system";

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (stored === "dark" || stored === "light" || stored === "system") {
    return stored;
  }

  return "system";
}

function resolveTheme(preference: ThemePreference): Theme {
  return preference === "system" ? getSystemTheme() : preference;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreference] = useState<ThemePreference>("system");
  const [theme, setTheme] = useState<Theme>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const nextPreference = getStoredPreference();
    setPreference(nextPreference);
    setTheme(resolveTheme(nextPreference));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const mediaQuery = window.matchMedia(SYSTEM_THEME_QUERY);

    function handleSystemThemeChange() {
      if (preference === "system") {
        setTheme(mediaQuery.matches ? "dark" : "light");
      }
    }

    setTheme(resolveTheme(preference));

    if (preference === "system") {
      mediaQuery.addEventListener("change", handleSystemThemeChange);
    }

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [preference, ready]);

  useEffect(() => {
    if (!ready) return;

    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
    root.dataset.themePreference = preference;
    window.localStorage.setItem(THEME_STORAGE_KEY, preference);
  }, [preference, ready, theme]);

  const value = useMemo(
    () => ({
      theme,
      preference,
      setThemePreference: setPreference,
      toggleTheme: () => {
        setPreference((current) => {
          if (current === "system") return theme === "dark" ? "light" : "dark";
          if (current === "light") return "dark";
          return "system";
        });
      }
    }),
    [preference, theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider.");
  }

  return context;
}
