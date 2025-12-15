"use client";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import { useColorScheme } from "@mui/material/styles";
import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { cn } from "@/lib/utils";
import { Popper, PopperButton, PopperPanel } from "../ui/popper";
import Stack from "@mui/material/Stack";

export default function SchemeMode({
  className,
  ...rest
}: React.ComponentProps<"div">) {
  const { mode, setMode, colorScheme } = useColorScheme();

  if (!mode) {
    return (
      <IconButton
        className="size-10 text-foreground"
        component={PopperButton}
        title="Theme Mode"
      >
        {mode === "dark" ? (
          <DarkModeIcon />
        ) : mode === "light" ? (
          <LightModeIcon />
        ) : (
          <SettingsBrightnessIcon />
        )}
      </IconButton>
    );
  }

  return (
    <>
      <Popper {...rest} className={cn(className)}>
        <IconButton
          className="size-10 text-foreground"
          component={PopperButton}
          title="Theme Mode"
        >
          {mode === "dark" ? (
            <DarkModeIcon />
          ) : mode === "light" ? (
            <LightModeIcon />
          ) : (
            <SettingsBrightnessIcon />
          )}
        </IconButton>
        <PopperPanel placement="bottom-end">
          <Paper className="p-2" elevation={1}>
            <Stack className="space-y-2">
              <span className="typography-h4">Theme</span>
              <ButtonGroup
                color={colorScheme === "dark" ? "primary" : "inherit"}
              >
                <Button
                  startIcon={<LightModeIcon />}
                  onClick={() => setMode("light")}
                >
                  Light
                </Button>
                <Button
                  startIcon={<SettingsBrightnessIcon />}
                  onClick={() => setMode("system")}
                >
                  System
                </Button>
                <Button
                  startIcon={<DarkModeIcon />}
                  onClick={() => setMode("dark")}
                >
                  Dark
                </Button>
              </ButtonGroup>
            </Stack>
          </Paper>
        </PopperPanel>
      </Popper>
    </>
  );
}
