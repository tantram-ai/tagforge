// src/theme.js
import { createTheme } from "@mui/material/styles";

declare module '@mui/material/styles' {
  interface Palette {
    customBackground?: {
      activeButton?: string;
    };
  }
  interface PaletteOptions {
    customBackground?: {
      activeButton?: string;
      cardBg?:string
    },
    customBorders?: {
      cardBorder?: string;
      sideBorder?:string
    };
  }
  
}

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
    customBackground: {
      activeButton: "#e3f2fd",
      cardBg:"#ffffff"
    },
    customBorders:{
      cardBorder:"#ffffff",
      sideBorder:"#dedede"
    }
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
      default: "#292828",
      paper: "#0b0b0b",
    },
    text: {
      primary: "#ffffff",
      secondary: "#aaaaaa",
    },
    customBackground: {
      activeButton: "#373737",
      cardBg:"#000"
    },
    customBorders:{
      cardBorder:"gray",
      sideBorder:"gray"
    }
  },
});

export { lightTheme, darkTheme };
