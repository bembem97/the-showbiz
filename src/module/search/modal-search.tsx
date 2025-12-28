"use client";

import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

export default function ModalSearch({
  children,
  ...rest
}: React.ComponentProps<typeof IconButton>) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton {...rest} color="inherit" onClick={handleOpen}>
        <SearchIcon />
      </IconButton>

      <Modal open={open} onClose={handleClose}>
        <div className="absolute inset-0 m-4 mx-auto grid w-full max-w-2xl">
          <Paper className="p-4">
            <h2>Search</h2>
          </Paper>
        </div>
      </Modal>
    </>
  );
}
