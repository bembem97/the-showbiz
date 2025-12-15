"use client";

import TSLink from "@/components/ui/link";
import { Popper, PopperButton, PopperPanel } from "@/components/ui/popper";
import { cn } from "@/lib/utils";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { useColorScheme } from "@mui/material/styles";
import React from "react";
import { GoogleSignIn } from "./auth-button";

export default function SignInPopper({
  className,
  ...rest
}: React.ComponentProps<"div">) {
  const { colorScheme } = useColorScheme();
  const themeMode = colorScheme === "dark" ? "primary" : "inherit";

  return (
    <Popper {...rest} className={cn(className)}>
      <Button
        component={PopperButton}
        color={themeMode}
        className="text-foreground"
      >
        Sign In
      </Button>

      <PopperPanel placement="bottom-end">
        <Paper className="space-y-2 p-4">
          <Button component={TSLink} href="/signin" className="w-full">
            Sign In with Email
          </Button>

          <GoogleSignIn data-popper-button />

          <Divider />

          <div className="flex items-center gap-x-0.5">
            <span>New Here?</span>
            <Button
              color={themeMode}
              variant="text"
              component={TSLink}
              href="/signup"
              className="normal-case underline"
              data-popper-button
            >
              Create an account
            </Button>
          </div>
        </Paper>
      </PopperPanel>
    </Popper>
  );
}
