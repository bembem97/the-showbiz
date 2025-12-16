import { Metadata } from "next";
import SignUpForm from "./_src/components/signup-form";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

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
    <main className="mx-auto max-w-md space-y-4 p-6 text-white">
      <h1 className="text-2xl font-bold">Sign Up</h1>

      <SignUpForm />
    </main>
  );
}
