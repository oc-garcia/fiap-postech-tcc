import React, { useRef } from "react";
import { Box, Typography, Paper, Button, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
      </Box>

      <Accordion sx={{ mt: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          sx={{ backgroundColor: "primary.main", color: "white" }}>
          <Typography variant="h6">Conteúdo Gerado</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div
            ref={markdownRef}
            style={{
              padding: "16px",
              backgroundColor: "#fff",
              color: "#000",
              borderRadius: "4px",
            }}>
            <ReactMarkdown>{content.generatedContent}</ReactMarkdown>
          </div>
          <Button variant="contained" color="primary" startIcon={<DownloadIcon />} onClick={handleDownload}>
            .PDF
          </Button>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

export default ContentCard;
