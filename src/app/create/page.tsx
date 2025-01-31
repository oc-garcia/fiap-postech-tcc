"use client";

import CreateContentForm from "@/components/CreateContentForm/CreateContentForm";
import Hero from "@/components/Hero/Hero";
import { Box, Button, Drawer } from "@mui/material";
import React, { useState } from "react";

const Create = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <Box>
      <Hero title="Create" subtitle="Lorem ipsum dolor sit amet" backgroundImage="/images/create-hero-image.jpg" />
      <Button onClick={toggleDrawer(true)}>Open drawer</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <CreateContentForm />
      </Drawer>
    </Box>
  );
};

export default Create;
