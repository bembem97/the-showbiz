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
import ErrorIcon from "@mui/icons-material/Error";
import Skeleton from "@mui/material/Skeleton";
// import { useColorScheme } from "@mui/material/styles";

export default function Authentication() {
  // const { colorScheme } = useColorScheme();
  // const themeMode = colorScheme === "dark" ? "primary" : "inherit";
  const { data: session, error, isPending } = useSession();

  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });

  if (isPending && !session)
    return <Skeleton variant="rounded" sx={{ width: 64, height: 30 }} />;

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
          color="inherit"
          endIcon={<ArrowDropDownIcon color="inherit" />}
        >
          <Avatar className="size-8">
            <Image
              src={session.user.image || "/mascot.png"}
              alt={session.user.name || "undefined"}
              width={128}
              height={128}
              className="object-top"
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
