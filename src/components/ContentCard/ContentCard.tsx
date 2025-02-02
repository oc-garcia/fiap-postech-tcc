import React from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { Content } from "@prisma/client";

interface ContentCardProps {
  content: Content;
}

const ContentCard: React.FC<ContentCardProps> = ({ content }) => {
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    element.href = URL.createObjectURL(file);
    element.download = `${content.title}.json`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {content.title}
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        {content.description}
      </Typography>
      <Typography variant="caption" color="textSecondary">
        {new Date(content.creationDate).toLocaleDateString("pt-BR")}
      </Typography>
      <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained" color="primary">
          Ver Mais
        </Button>
        <Button variant="contained" color="primary" startIcon={<DownloadIcon />} onClick={handleDownload}>
          .PDF
        </Button>
      </Box>
      <pre>{JSON.stringify(content, null, 2)}</pre>
    </Paper>
  );
};

export default ContentCard;
