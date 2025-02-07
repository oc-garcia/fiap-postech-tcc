import React, { useRef } from "react";
import { Box, Typography, Paper, Button, Accordion, AccordionSummary, AccordionDetails, Chip } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReactMarkdown from "react-markdown";
import { Content } from "@prisma/client";
import { generatePdfFromElement } from "@/utils/generatePdf";
import createPptFromContent from "@/utils/generatePpt";
import SchoolIcon from "@mui/icons-material/School";
import Link from "next/link";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

interface ContentCardProps {
  content: Content & { author?: { name: string } };
  isPreview?: boolean;
}

const ContentCard: React.FC<ContentCardProps> = ({ content, isPreview = true }) => {
  const markdownRef = useRef<HTMLDivElement>(null);

  const slug = content.id;

  const handleDownload = async () => {
    if (content.type !== "apresentação" && markdownRef.current) {
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
      <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
        <Box>
          <Typography variant="body2" color="textSecondary">
            <strong>Disciplina:</strong> {content.subject}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              flexWrap: "wrap",
              marginTop: 1,
            }}>
            <Typography variant="body2" color="textSecondary">
              <strong>Tags:</strong>
            </Typography>
            {content.tags.split(",").map((tag) => (
              <Chip key={tag} label={tag.trim()} />
            ))}
          </Box>
        </Box>
        {isPreview && (
          <Link href={`/content/${slug}`} passHref legacyBehavior>
            <Button variant="contained" color="primary">
              Ver Mais
            </Button>
          </Link>
        )}
      </Box>
      {/* New info: upvotes, downvotes and author */}
      <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 2 }}>
        <Typography variant="body2" color="textSecondary">
          <ThumbUpIcon sx={{ fontSize: 16, mr: 0.5 }} /> {content.upvotes}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <ThumbDownIcon sx={{ fontSize: 16, mr: 0.5 }} /> {content.downvotes}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <strong>Autor:</strong> {content.author?.name || "Desconhecido"}
        </Typography>
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
          {content.type !== "apresentação" && (
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
