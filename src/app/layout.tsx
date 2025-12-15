import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import NextTopLoader from "nextjs-toploader";
import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { Roboto } from "next/font/google";
import { AppThemeProvider } from "@/theme";
import { cn } from "@/lib/utils";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "@/components/global/header";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: {
    template: "%s | TheShowbiz",
    default: "TheShowbiz",
  },
  description:
    "A fast, feature-rich TV and movie discovery platform powered by TMDB. Browse detailed show and film information, cast profiles, trailers, ratings, and personalized watchlists with a clean, responsive interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(roboto.variable)}>
      <body className={cn("antialiased")}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <AppThemeProvider>
            <CssBaseline />
            {/* Stops the flickering (dark mode) on first render of the page  */}
            <InitColorSchemeScript attribute="data" />
            <NextTopLoader color="var(--mui-palette-primary-dark)" />

            <Header />
            <main>{children}</main>
          </AppThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
