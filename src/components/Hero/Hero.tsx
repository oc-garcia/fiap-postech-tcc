import React from "react";
import { Box, Typography } from "@mui/material";

interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, backgroundImage }) => {
  return (
    <Box
      sx={{
        position: "relative",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "40vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      />
      <Box
        sx={{
          position: "relative",
          color: "white",
          zIndex: 1,
          padding: 0.5,
        }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
        <Typography variant="h5" component="p" gutterBottom sx={{ fontWeight: "bold" }}>
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default Hero;
