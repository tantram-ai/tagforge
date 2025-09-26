// src/theme.js
import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2", // blue
    },
    secondary: {
      main: "#9c27b0", // purple
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#555555",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9", // light blue
    },
    secondary: {
      main: "#ce93d8", // light purple
    },
    background: {
      default: "#121212",
      paper: "#0b0b0b",
    },
    text: {
      primary: "#ffffff",
      secondary: "#aaaaaa",
    },
  },
});

export { lightTheme, darkTheme };
