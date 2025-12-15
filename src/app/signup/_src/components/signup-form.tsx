"use client";

import { signUp } from "@/lib/auth-client";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function SignUpForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

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
    <Stack className="space-y-4">
      {error && <p className="text-error">{error}</p>}
      <Stack component="form" onSubmit={handleSubmit}>
        <TextField name="name" placeholder="Full Name" required />
        <TextField name="email" placeholder="Email Address" required />
        <TextField
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <Button type="submit">Create Account</Button>
      </Stack>
    </Stack>
  );
}
