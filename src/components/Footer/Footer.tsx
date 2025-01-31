import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const Footer = () => {
  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
            <Typography textAlign="center" color="inherit">
              © 2025 EducaPro.
            </Typography>
            <Typography textAlign="center" color="inherit">
              Todos os direitos reservados.
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;