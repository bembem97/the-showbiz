"use client";

import { cn } from "@/lib/utils";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import MuiPopper from "@mui/material/Popper";

import React from "react";

const PopperContext = React.createContext<{
  // handleClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  anchorEl: null | HTMLElement;
  open: boolean;
}>({
  // handleClick: () => {},
  setAnchorEl: () => {},
  anchorEl: null,
  open: false,
});

export function Popper({
  children,
  className,
  ...rest
}: React.ComponentProps<"div">) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(anchorEl ? null : event.currentTarget);
  // };

  /** ---------------------------
   **  EVENT DELEGATION HERE
   * ---------------------------- */
  const handleDelegatedClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;

    // Check if click came from a PopperButton
    const button = target.closest("[data-popper-button]") as HTMLElement | null;

    if (button) {
      setAnchorEl(anchorEl ? null : button);
    }
  };

  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setAnchorEl(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <PopperContext value={{ setAnchorEl, anchorEl, open }}>
      <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
        <div
          className={cn("size-fit", className)}
          {...rest}
          onClick={handleDelegatedClick}
        >
          {children}
        </div>
      </ClickAwayListener>
    </PopperContext>
  );
}

export const PopperButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithRef<"button">
>(({ children, ...rest }, ref) => {
  // const { handleClick } = React.use(PopperContext);

  return (
    <button {...rest} ref={ref} data-popper-button>
      {children}
    </button>
  );
});

export function PopperPanel({
  className,
  children,
  ...rest
}: Omit<React.ComponentProps<typeof MuiPopper>, "open" | "children"> & {
  children:
    | React.ReactNode
    | ((
        setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
      ) => React.ReactNode);
}) {
  const { open, anchorEl, setAnchorEl } = React.use(PopperContext);

  const content =
    typeof children === "function" ? children(setAnchorEl) : children;

  return (
    <MuiPopper
      anchorEl={anchorEl}
      className={cn("z-modal", className)}
      {...rest}
      open={open}
    >
      {open ? content : null}
    </MuiPopper>
  );
}
