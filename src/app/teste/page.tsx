"use client";

import CreateContentForm from "@/components/CreateContentForm/CreateContentForm";
import { Button, Drawer } from "@mui/material";
import React, { useState } from "react";

const Teste = () => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Open drawer</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <CreateContentForm />
      </Drawer>
    </div>
  );
};

export default Teste;
