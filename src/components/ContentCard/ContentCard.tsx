import React, { useRef } from "react";
import { Box, Typography, Paper, Button, Accordion, AccordionSummary, AccordionDetails, Chip } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReactMarkdown from "react-markdown";
import { Content } from "@prisma/client";
import { generatePdfFromElement } from "@/utils/generatePdf";
import createPptFromContent from "@/utils/generatePpt";
import SchoolIcon from "@mui/icons-material/School";

interface ContentCardProps {
  content: Content;
}

const ContentCard: React.FC<ContentCardProps> = ({ content }) => {
  const markdownRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (content.type != "apresentação" && markdownRef.current) {
      await generatePdfFromElement(markdownRef.current, content.title);
    } else {
      createPptFromContent(content.generatedContent, content.title);
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

      <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="textSecondary">
            <strong>Disciplina:</strong> {content.subject}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, flexWrap: "wrap" }}>
            <Typography variant="body2" color="textSecondary">
              <strong>Tags:</strong>
            </Typography>
            {content.tags.split(",").map((tag) => (
              <Chip key={tag} label={tag.trim()} sx={{ mr: 1, mt: 1 }} />
            ))}
          </Box>
        </Box>
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
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
              <SchoolIcon sx={{ color: "inherit", mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}>
                EducaPro
              </Typography>
            </Box>
            <ReactMarkdown>{content.generatedContent}</ReactMarkdown>
          </div>
          {content.type === "apresentação" && (
            <Button variant="contained" color="primary" startIcon={<DownloadIcon />} onClick={handleDownload}>
              .PPT
            </Button>
          )}
          {content.type != "apresentação" && (
            <Button variant="contained" color="primary" startIcon={<DownloadIcon />} onClick={handleDownload}>
              .PDF
            </Button>
          )}
        </AccordionDetails>
      </Accordion>
      {/* <pre>{JSON.stringify(content, null, 2)}</pre> */}
    </Paper>
  );
};

export default ContentCard;
