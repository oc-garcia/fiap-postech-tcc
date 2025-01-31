import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const Footer = () => {
  return (
    <AppBar position="sticky" color="primary" sx={{ top: "auto", bottom: 0 }}>
      <Container maxWidth="xl">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Typography textAlign="center" color="inherit">
              © 2025 EducaPro. Todos os direitos reservados.
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;