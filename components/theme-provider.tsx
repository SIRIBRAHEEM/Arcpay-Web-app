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
  const [preference, setPreference] = useState<ThemePreference>(() => {
    if (typeof window === "undefined") return "system";
    return getStoredPreference();
  });

  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    const pref = getStoredPreference();
    return resolveTheme(pref);
  });

  // No need for ready state anymore — initial values are resolved immediately on client

  useEffect(() => {
    const mediaQuery = window.matchMedia(SYSTEM_THEME_QUERY);

    function handleSystemThemeChange() {
      if (preference === "system") {
        setTheme(mediaQuery.matches ? "dark" : "light");
      }
    }

    // Ensure theme is in sync when preference changes (e.g. toggle to/from system)
    if (preference === "system") {
      setTheme(resolveTheme(preference));
      mediaQuery.addEventListener("change", handleSystemThemeChange);
    } else {
      // Explicit preference — ensure theme matches it
      setTheme(preference as Theme);
    }

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [preference]);

  // Apply theme changes to DOM immediately (script handles initial paint)
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
    root.dataset.themePreference = preference;
    window.localStorage.setItem(THEME_STORAGE_KEY, preference);
  }, [preference, theme]);

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
