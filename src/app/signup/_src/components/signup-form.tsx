"use client";

import { signUp } from "@/lib/auth-client";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useColorScheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import { GoogleSignIn } from "@/module/sign-in/auth-button";
import TSLink from "@/components/ui/link";

export default function SignUpForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const { colorScheme } = useColorScheme();
  const mode = colorScheme === "dark" ? "primary" : "inherit";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    const res = await signUp.email({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (res.error) {
      setError(res.error.message || "Something went wrong.");
    } else {
      router.push("/watchlist");
    }
  }

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}

      <Stack component="form" onSubmit={handleSubmit} className="space-y-4">
        <TextField name="name" placeholder="Full Name" id="name" />
        <TextField label="Email Address" id="email" name="email" />
        <TextField
          type="password"
          label="Password"
          id="password"
          name="password"
        />
        <Button type="submit" color={mode}>
          Create Account
        </Button>
      </Stack>

      <Divider>Or</Divider>

      <Button
        color={mode}
        component={TSLink}
        data-popper-button
        href="/signin"
        className="w-full"
      >
        Sign In with Email
      </Button>

      <GoogleSignIn />
    </>
  );
}
