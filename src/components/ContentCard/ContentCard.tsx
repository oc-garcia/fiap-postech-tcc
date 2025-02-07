import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReactMarkdown from "react-markdown";
import { Comment, Content, Vote } from "@prisma/client";
import { generatePdfFromElement } from "@/utils/generatePdf";
import createPptFromContent from "@/utils/generatePpt";
import SchoolIcon from "@mui/icons-material/School";
import Link from "next/link";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { postVote } from "@/services/postVote";
import { AuthContext } from "@/context/AuthContext";
import { getContentById } from "@/services/getContentById";
import CommentSection from "./CommentSection/CommentSection";

interface ContentWithVotes extends Content {
  votes: Vote[];
  author?: { name: string };
  comments?: Comment[];
}

interface ContentCardProps {
  content: ContentWithVotes;
  isPreview?: boolean;
  displayComments?: boolean;
  onVoteSuccess?: (updatedContent: ContentWithVotes) => void;
}

const ContentCard: React.FC<ContentCardProps> = ({
  content: initialContent,
  isPreview = true,
  onVoteSuccess,
  displayComments = false,
}) => {
  const { isLoggedIn, userId } = useContext(AuthContext);
  const [content, setContent] = useState<ContentWithVotes>(initialContent);

  const markdownRef = useRef<HTMLDivElement>(null);
  const [voteCounts, setVoteCounts] = useState({ upvotes: 0, downvotes: 0 });
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loadingVote, setLoadingVote] = useState(false);

  useEffect(() => {
    const counts = content.votes?.reduce(
      (acc, vote) => {
        if (vote.type === "up") acc.upvotes += 1;
        if (vote.type === "down") acc.downvotes += 1;
        return acc;
      },
      { upvotes: 0, downvotes: 0 }
    );
    setVoteCounts(counts);

    const userVote = content.votes?.find((vote) => vote.userId === userId);
    setUserVote(userVote ? (userVote.type as "up" | "down") : null);
  }, [content.votes, userId, content]);

  const slug = content.id;

  const handleDownload = async () => {
    if (content.type !== "apresentação" && markdownRef.current) {
      await generatePdfFromElement(markdownRef.current, content.title);
    } else {
      createPptFromContent(content.generatedContent, content.title);
    }
  };

  const handleVote = async (voteType: "up" | "down") => {
    if (!isLoggedIn) {
      setSnackbarOpen(true);
      return;
    }

    setLoadingVote(true);

    try {
      await postVote({ contentId: content.id, voteType });
      const updatedContent = await getContentById(content.id);
      setContent(updatedContent);
      if (onVoteSuccess) {
        onVoteSuccess(updatedContent);
      }
    } catch (error) {
      console.error(`Error voting ${voteType}`, error);
    } finally {
      setLoadingVote(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2, overflowX: "hidden" }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {content.title}
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom sx={{ maxWidth: "100%" }}>
        {content.description}
      </Typography>

      <Box sx={{ mt: 1, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="caption" color="textSecondary">
            <strong>Criado em:</strong> {new Date(content.creationDate).toLocaleDateString("pt-BR")}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            <strong>Disciplina:</strong> {content.subject}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              flexWrap: "wrap",
            }}>
            <Typography variant="caption" color="textSecondary">
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
          {loadingVote ? (
            <CircularProgress size={16} />
          ) : (
            <ThumbUpIcon
              sx={{
                fontSize: 16,
                mr: 0.5,
                cursor: "pointer",
                color: userVote === "up" ? "green" : "inherit",
                "&:hover": {
                  color: "green",
                },
              }}
              onClick={() => handleVote("up")}
            />
          )}{" "}
          {!loadingVote && voteCounts?.upvotes ? voteCounts.upvotes : !loadingVote ? 0 : ""}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {loadingVote ? (
            <CircularProgress size={16} />
          ) : (
            <ThumbDownIcon
              sx={{
                fontSize: 16,
                mr: 0.5,
                cursor: "pointer",
                color: userVote === "down" ? "red" : "inherit",
                "&:hover": {
                  color: "red",
                },
              }}
              onClick={() => handleVote("down")}
            />
          )}{" "}
          {!loadingVote && voteCounts?.downvotes ? voteCounts.downvotes : !loadingVote ? 0 : ""}
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
      {displayComments && (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
            sx={{ backgroundColor: "primary.main", color: "white" }}>
            <Typography variant="h6">Comentários</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CommentSection comments={content.comments || []} contentId={content.id} />
          </AccordionDetails>
        </Accordion>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={handleSnackbarClose} severity="warning" sx={{ width: "100%" }}>
          Você precisa estar logado para votar.
        </Alert>
      </Snackbar>
      <pre>{JSON.stringify(content, null, 2)}</pre>
    </Paper>
  );
};

export default ContentCard;
