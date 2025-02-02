import React, { useRef } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ReactMarkdown from "react-markdown";
import { Content } from "@prisma/client";
import { generatePdfFromElement } from "@/utils/generatePdf";

interface ContentCardProps {
  content: Content;
}

const ContentCard: React.FC<ContentCardProps> = ({ content }) => {
  const markdownRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (markdownRef.current) {
      await generatePdfFromElement(markdownRef.current, content.title);
    }
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

      <div
        ref={markdownRef}
        style={{
          marginTop: "16px",
          padding: "16px",
          backgroundColor: "#fff",
          color: "#000",
          borderRadius: "4px",
        }}>
        <ReactMarkdown>{content.generatedContent}</ReactMarkdown>
      </div>
    </Paper>
  );
};

export default ContentCard;
