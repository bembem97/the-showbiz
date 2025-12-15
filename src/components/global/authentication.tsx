"use client";

import React from "react";
import SignInPopper from "@/module/sign-in/signIn-popper";
import Avatar from "@mui/material/Avatar";
import Image from "next/image";
import { Popper, PopperButton, PopperPanel } from "../ui/popper";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { SignOut } from "@/module/sign-in/auth-button";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useSession } from "@/lib/auth-client";
import { useColorScheme } from "@mui/material/styles";
import ErrorIcon from "@mui/icons-material/Error";

export default function Authentication() {
  const { colorScheme } = useColorScheme();
  const themeMode = colorScheme === "dark" ? "primary" : "inherit";
  const { data: session, error, isPending } = useSession();

  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });

  // console.log({ session });

  if (isPending)
    return (
      <Button
        color={themeMode}
        loading
        loadingPosition="start"
        className="text-foreground"
      >
        Sign In
      </Button>
    );

  if (error)
    return (
      <Button
        color="error"
        className="text-foreground opacity-50"
        startIcon={<ErrorIcon />}
        disabled
      >
        Error
      </Button>
    );

  if (!session) {
    return <SignInPopper />;
  }

  return (
    <>
      <Popper>
        <Button
          variant="text"
          component={PopperButton}
          className="w-max min-w-0"
          endIcon={<ArrowDropDownIcon className="not-dark:text-foreground" />}
        >
          <Avatar className="size-8">
            <Image
              src={session.user.image || "/image-not-found-2to3.png"}
              alt={session.user.name || "undefined"}
              width={128}
              height={128}
            />
          </Avatar>
        </Button>
        <PopperPanel placement="bottom-end">
          <Paper className="grid min-w-32">
            <SignOut />
          </Paper>
        </PopperPanel>
      </Popper>
    </>
  );
}
