import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeContext = createContext();

const THEME_KEY = "theme";

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme =
      localStorage.getItem(THEME_KEY);

    setIsDark(savedTheme !== "light");
  }, []);

  useEffect(() => {
    localStorage.setItem(
      THEME_KEY,
      isDark ? "dark" : "light"
    );

    document.body.className = isDark
      ? "dark-theme"
      : "light-theme";
  }, [isDark]);

  const toggleTheme = () =>
    setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () =>
  useContext(ThemeContext);