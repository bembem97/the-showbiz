import { Metadata } from "next";
import SignUpForm from "./_src/components/signup-form";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignUpPage() {
  return (
    <main className="mx-auto max-w-md space-y-4 p-6 text-white">
      <h1 className="text-2xl font-bold">Sign Up</h1>

      <SignUpForm />
    </main>
  );
}
