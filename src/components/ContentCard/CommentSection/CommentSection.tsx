import React, { useContext, useState } from "react";
import { Box, Typography, Drawer, Button, Snackbar, Alert } from "@mui/material";
import NewCommentForm from "./NewCommentForm/NewCommentForm";
import { AuthContext } from "@/context/AuthContext";
import { postComment } from "@/services/postComment";

export interface Comment {
  id: string;
  contentId: string;
  userId: string;
  text: string;
  creationDate: Date;
  user?: {
    id: string;
    name: string;
  };
}

interface CommentSectionProps {
  comments: Comment[];
  contentId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments, contentId }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "warning" | "error";
  }>({
    open: false,
    message: "",
    severity: "warning",
  });
  const { isLoggedIn, userId } = useContext(AuthContext);

  const handleOpenDrawer = () => {
    if (!isLoggedIn) {
      setSnackbar({
        open: true,
        message: "Comentários são disponíveis apenas para usuários logados.",
        severity: "warning",
      });
      return;
    }
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleNewCommentSubmit = async (commentText: string) => {
    if (!userId) {
      console.error("User is not logged in.");
      return;
    }
    const payload = {
      contentId,
      userId,
      text: commentText,
    };

    try {
      await postComment(payload);
      setSnackbar({ open: true, message: "Comentário postado com sucesso.", severity: "success" });
    } catch (error) {
      console.error("Error posting comment:", error);
      setSnackbar({ open: true, message: "Erro ao postar comentário.", severity: "error" });
    }
    console.log("Novo comentário:", commentText);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box>
      {!comments || comments.length === 0 ? (
        <Typography variant="body2" color="textSecondary">
          Este conteúdo ainda não possui comentários.
        </Typography>
      ) : (
        comments.map((comment) => (
          <Box key={comment.id} sx={{ mb: 2, p: 1, border: "1px solid #ccc", borderRadius: 1 }}>
            <Typography variant="caption" color="textSecondary">
              {comment.user?.name || "Anônimo"} &#8226; {new Date(comment.creationDate).toLocaleDateString("pt-BR")}
            </Typography>
            <Typography variant="body2">{comment.text}</Typography>
          </Box>
        ))
      )}
      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Button variant="contained" onClick={handleOpenDrawer}>
          Adicionar Comentário
        </Button>
      </Box>
      <Drawer anchor="bottom" open={isDrawerOpen} onClose={handleCloseDrawer}>
        <NewCommentForm onSubmit={handleNewCommentSubmit} onClose={handleCloseDrawer} />
      </Drawer>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CommentSection;
