import { Metadata } from "next";
import SignUpForm from "./_src/components/signup-form";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import React from "react";

export const metadata: Metadata = {
  title: "Sign up",
};

export default async function SignUpPage() {
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
          <div className="flex items-center justify-between">
            <h1>Sign Up</h1>
            <Tooltip title="This sign-up form does not include email verification.">
              <InfoIcon />
            </Tooltip>
          </div>

          <SignUpForm />
        </Stack>
      </Paper>
    </div>
  );
}
