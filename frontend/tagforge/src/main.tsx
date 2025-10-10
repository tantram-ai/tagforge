import { StrictMode, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, CssBaseline, useMediaQuery } from "@mui/material";
import { lightTheme, darkTheme } from "./shared/hooks/theme.js";
import { App } from "./App.js";


function Main() {
  // Detect system preference
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  // Track if user has chosen manually
  const [mode, setMode] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") ||
    (prefersDarkMode ? "dark" : "light")
  );

  // Update mode if system theme changes and user hasn't chosen manually
  useEffect(() => {
    if (!localStorage.getItem("theme")) {
      setMode(prefersDarkMode ? "dark" : "light");
    }
  }, [prefersDarkMode]);

  // Toggle between light/dark
  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("theme", newMode);
  };

  // Memoize theme for performance
  const theme = useMemo(
    () => (mode === "light" ? lightTheme : darkTheme),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App toggleTheme={toggleTheme} mode={mode} />
    </ThemeProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
