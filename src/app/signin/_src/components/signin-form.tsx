"use client";

import TSLink from "@/components/ui/link";
import { signIn } from "@/lib/auth-client";
import { GoogleSignIn } from "@/module/sign-in/auth-button";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SignInForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    const res = await signIn.email({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      rememberMe: Boolean(formData.get("remember")),
    });

    if (res.error) {
      setError(res.error.message || "Something went wrong.");
    } else {
      router.push("/watchlist");
    }
  }

  return (
    <Stack className="space-y-4">
      {error && <Alert severity="error">{error}</Alert>}

      <Stack component="form" onSubmit={handleSubmit} className="space-y-4">
        <TextField label="Email Address" id="email" name="email" />
        <TextField
          type="password"
          label="Password"
          id="password"
          name="password"
        />

        <FormControlLabel
          control={<Checkbox defaultChecked />}
          name="remember"
          label="Remember me"
        />

        <Button type="submit">Sign In</Button>
      </Stack>

      <div className="flex flex-wrap items-center justify-center gap-x-1">
        <span>{"Don't have an account?"}</span>
        <Button
          variant="text"
          component={TSLink}
          href="/signup"
          className="typography-span"
        >
          Sign up
        </Button>
      </div>

      <Divider>Or</Divider>

      <GoogleSignIn />
    </Stack>
  );
}
