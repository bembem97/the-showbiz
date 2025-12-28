"use client";

import { yellow, cyan } from "@mui/material/colors";
import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    "3xs": true;
    "2xs": true;
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    "2xl": true;
    "3xl": true;
    "4xl": true;
    "5xl": true;
    "6xl": true;
    "7xl": true;
    "8xl": true;
  }
}

export const theme: ThemeOptions = createTheme({
  // todo: Properties integrating with tailwindcss
  modularCssLayers: "@layer theme, base, mui, components, utilities;",
  cssVariables: {
    nativeColor: true,
    colorSchemeSelector: "data",
    disableCssColorScheme: true,
  },
  // ? ...
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: yellow["A700"],
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: cyan["A700"],
        },
      },
    },
  },
  // ? ...
  typography: {
    fontFamily: "var(--font-roboto)",
    h1: {
      fontSize: "clamp(1.375rem, 4vw, 2rem)",
      fontWeight: 600,
      letterSpacing: "var(--tracking-normal)",
    },
    h2: {
      fontSize: "1.275rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.2rem",
    },
    h4: {
      fontSize: "1.125rem",
    },
    h5: {
      fontSize: "1rem",
    },
    h6: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
    body1: {
      fontWeight: 300,
    },
    body2: {
      fontWeight: 300,
    },
    subtitle1: {
      fontWeight: 400,
    },
    subtitle2: {
      fontWeight: 400,
    },
  },
  breakpoints: {
    values: {
      "3xs": 256,
      "2xs": 288,
      xs: 320,
      sm: 384,
      md: 448,
      lg: 512,
      xl: 576,
      "2xl": 672,
      "3xl": 768,
      "4xl": 896,
      "5xl": 1024,
      "6xl": 1152,
      "7xl": 1280,
      "8xl": 1440,
    },
  },
  components: {
    MuiAlert: {
      defaultProps: {
        severity: "info",
      },
    },
    MuiPaper: {
      defaultProps: {
        variant: "outlined",
        elevation: 0,
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
        variant: "outlined",
        size: "small",
      },
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          borderRadius: "0.375rem",
          "@supports (corner-shape: bevel superellipse(infinity))": {
            cornerShape: "bevel superellipse(infinity)",
          },
        },
      },
    },
    MuiChip: {
      defaultProps: {
        size: "small",
        variant: "outlined",
      },
      styleOverrides: {
        root: ({ theme }) => ({
          textTransform: "capitalize",
          fontSize: theme.typography.body2.fontSize,
        }),
      },
    },
    MuiInputBase: {
      defaultProps: {
        size: "small",
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
    MuiLink: {
      defaultProps: {
        underline: "none",
      },
    },
  },
});

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider disableTransitionOnChange theme={theme}>
      {children}
    </ThemeProvider>
  );
}
