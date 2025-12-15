"use client";

import { useSession } from "@/lib/auth-client";
import Alert from "@mui/material/Alert";
import React from "react";

export default function User() {
  const { data: session, error, isPending } = useSession();

  if (isPending && !session) return;

  if (!session) return <p>You need to sign in to see your watchlist.</p>;

  if (error) return <Alert severity="error">{error.message}</Alert>;

  const {
    user: { name },
  } = session;

  return <h1>Welcome to the Showbiz, {name}!</h1>;
}
