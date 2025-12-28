"use client";

import { GoogleIcon } from "@/components/ui/icon";
import { signIn, signOut } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import Button from "@mui/material/Button";
import { useColorScheme } from "@mui/material/styles";
import { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function SignOut({
  className,
  ...rest
}: React.ComponentProps<typeof Button>) {
  const { colorScheme } = useColorScheme();
  const router = useRouter();
  const pathname = usePathname();
  const themeMode = colorScheme === "dark" ? "primary" : "inherit";

  return (
    <Button
      color={themeMode}
      variant="text"
      className={cn("normal-case")}
      onClick={async () =>
        await signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push(pathname as Route); // redirect to login page
            },
          },
        })
      }
      {...rest}
    >
      Sign Out
    </Button>
  );
}
export function GoogleSignIn({
  className,
  ...rest
}: React.ComponentProps<typeof Button>) {
  const { colorScheme } = useColorScheme();
  const themeMode = colorScheme === "dark" ? "primary" : "inherit";

  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("r") || "/";

  return (
    <Button
      color={themeMode}
      startIcon={<GoogleIcon />}
      className={cn("w-full normal-case")}
      onClick={async () =>
        signIn.social({
          provider: "google",
          callbackURL: redirectUrl,
        })
      }
      {...rest}
    >
      Sign In with Google
    </Button>
  );
}
