import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import React from "react";

interface Props extends React.ComponentProps<typeof Alert> {
  error: { message: string } | string | number;
  message?: string;
}

export default function AlertError({ error, message, ...rest }: Props) {
  return (
    <Alert severity="error" {...rest}>
      <AlertTitle>
        {typeof error === "string" || typeof error === "number"
          ? error
          : "message" in error
            ? error.message
            : "Something went wrong."}
      </AlertTitle>
      {message ? message : null}
    </Alert>
  );
}
