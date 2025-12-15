import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import SchemeMode from "./scheme-mode";
import Authentication from "./authentication";
import NavLink from "./nav-link";

export default function Header() {
  return (
    <AppBar
      variant="outlined"
      elevation={0}
      className="sticky top-0 border-x-0 border-t-0"
    >
      <Toolbar variant="dense" disableGutters className="px-2">
        <div className="ml-auto flex w-max items-center gap-x-1">
          <nav className="hidden 3xl:contents">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/tv">Series</NavLink>
            <NavLink href="/movie" className="mr-2">
              Movies
            </NavLink>
            <NavLink href="/watchlist" className="mr-2">
              My Watchlist
            </NavLink>
          </nav>

          <Authentication />
          <SchemeMode />
        </div>
      </Toolbar>
    </AppBar>
  );
}
