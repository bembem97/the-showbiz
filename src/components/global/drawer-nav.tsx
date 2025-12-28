"use client";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import StarIcon from "@mui/icons-material/Star";
import TvIcon from "@mui/icons-material/Tv";
import TheatersIcon from "@mui/icons-material/Theaters";
import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import TSLink from "../ui/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function DrawerNav({
  children,
  ...rest
}: React.ComponentProps<typeof IconButton>) {
  const [open, setOpen] = useState<null | boolean | HTMLElement>(null);
  const pathname = usePathname();
  const activeLink = (href: string) => ({
    "text-foreground bg-primary dark:bg-primary/15": pathname === href,
  });

  const toggleDrawer = (open: null | boolean | HTMLElement) => () => {
    setOpen(open);
  };

  /** ---------------------------
   **  EVENT DELEGATION HERE
   * ---------------------------- */
  const handleDelegatedClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;

    // Check if click came from a PopperButton
    const button = target.closest("[data-drawer-button]") as HTMLElement | null;

    if (button) {
      setOpen(open ? null : button);
    }
  };

  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <IconButton onClick={toggleDrawer(true)} color="inherit" {...rest}>
        <MenuIcon />
      </IconButton>

      <Drawer
        open={Boolean(open)}
        onClose={toggleDrawer(false)}
        slotProps={{
          paper: {
            className:
              "p-0 grid auto-rows-min items-start w-full max-w-xs border-0 border-r border-divider",
          },
        }}
      >
        <IconButton onClick={toggleDrawer(false)} className="ml-auto flex">
          <CloseIcon />
        </IconButton>

        <Divider />

        <nav onClick={handleDelegatedClick}>
          <List>
            <ListItem disableGutters disablePadding>
              <ListItemButton
                data-drawer-button
                component={TSLink}
                href="/"
                className={cn(activeLink("/"))}
              >
                <ListItemAvatar>
                  <HomeIcon />
                </ListItemAvatar>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem disableGutters disablePadding>
              <ListItemButton
                data-drawer-button
                component={TSLink}
                href="/shows"
                className={cn(activeLink("/shows"))}
              >
                <ListItemAvatar>
                  <TvIcon />
                </ListItemAvatar>
                <ListItemText primary="Shows" />
              </ListItemButton>
            </ListItem>
            <ListItem disableGutters disablePadding>
              <ListItemButton
                data-drawer-button
                component={TSLink}
                href="/movies"
                className={cn(activeLink("/movies"))}
              >
                <ListItemAvatar>
                  <TheatersIcon />
                </ListItemAvatar>
                <ListItemText primary="Movies" />
              </ListItemButton>
            </ListItem>
            <ListItem disableGutters disablePadding>
              <ListItemButton
                data-drawer-button
                component={TSLink}
                href="/stars"
                className={cn(activeLink("/stars"))}
              >
                <ListItemAvatar>
                  <StarIcon />
                </ListItemAvatar>
                <ListItemText primary="Stars" />
              </ListItemButton>
            </ListItem>
            <ListItem disableGutters disablePadding>
              <ListItemButton
                data-drawer-button
                component={TSLink}
                href="/watchlist"
                className={cn(activeLink("/watchlist"))}
              >
                <ListItemAvatar>
                  <BookmarkBorderIcon />
                </ListItemAvatar>
                <ListItemText primary="Watchlist" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Drawer>
    </>
  );
}
