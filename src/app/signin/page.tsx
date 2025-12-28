import React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import SignInForm from "./_src/components/signin-form";
import CircularProgress from "@mui/material/CircularProgress";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";

export const metadata: Metadata = {
  title: "Sign in",
};

const fallback = (
  <div className="grid place-items-center p-4">
    <CircularProgress />
  </div>
);

export default async function SignIn() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/");
  }

  return (
    <div className="grid p-2">
      <Paper className="mx-auto w-full max-w-md p-4">
        <Stack className="space-y-4">
          <div className="justify-between flex items-center">
            <h1>Sign In</h1>
            <Tooltip title="This sign-in form does not include email verification.">
              <InfoIcon />
            </Tooltip>
          </div>

          <React.Suspense fallback={fallback}>
            <SignInForm />
          </React.Suspense>
        </Stack>
      </Paper>
    </div>
  );
}
