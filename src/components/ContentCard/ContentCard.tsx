import React from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { Content } from "@prisma/client";

interface ContentCardProps {
  content: Content;
}

const ContentCard: React.FC<ContentCardProps> = ({ content }) => {
  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {content.title}
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        {content.description}
      </Typography>
      <Typography variant="caption" color="textSecondary">
        {new Date(content.creationDate).toLocaleDateString()}
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" color="primary">
          Ver Mais
        </Button>
      </Box>
    </Paper>
  );
};

export default ContentCard;
