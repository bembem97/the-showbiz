import React from "react";
import { Metadata } from "next";
import User from "./_src/components/user";
import { SignOut } from "@/module/sign-in/auth-button";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "My Watchlist",
};

export default async function Watchlist() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="p-2">
      <User />
      <SignOut />
    </div>
  );
}
