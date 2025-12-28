import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import SchemeMode from "./scheme-mode";
import Authentication from "./authentication";
import NavLink from "./nav-link";
import DrawerNav from "./drawer-nav";
import ModalSearch from "@/module/search/modal-search";
import BrandName from "./logo";

export default function Header() {
  return (
    <AppBar
      variant="outlined"
      elevation={0}
      className="sticky top-0 border-x-0 border-t-0"
    >
      <Toolbar variant="dense" disableGutters className="px-2">
        <div className="flex shrink grow items-center text-black 3xl:justify-end 3xl:gap-x-1 dark:text-primary">
          <DrawerNav className="flex 3xl:hidden" />

          <BrandName className="max-3xl:mr-auto" />

          <nav className="hidden shrink grow basis-full items-center justify-center justify-items-stretch 3xl:flex">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/shows">Series</NavLink>
            <NavLink href="/movies">Movies</NavLink>
            <NavLink href="/stars">Stars</NavLink>
            <NavLink href="/watchlist">My Watchlist</NavLink>
          </nav>

          <ModalSearch />
          <Authentication />
          <SchemeMode />
        </div>
      </Toolbar>
    </AppBar>
  );
}
