"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Content } from "@prisma/client";
import ContentCard from "@/components/ContentCard/ContentCard";
import { Alert, Box, Button, Skeleton } from "@mui/material";
import { getContentById } from "@/services/getContentById";

const ContentPage = () => {
  const params = useParams<{ id: string }>();
  const contentId = params?.id;
  const [content, setContent] = useState<Content | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      if (!contentId) return;
      try {
        const response: Content = await getContentById(contentId);
        setContent(response);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching content:", error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [contentId]);

  if (isLoading)
    return (
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          flex: 1,
        }}>
        <Skeleton variant="rectangular" sx={{ width: "100%", height: "100%", flex: 1 }} />
      </Box>
    );

  if (!content)
    return (
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          flex: 1,
        }}>
        <Alert severity="info">Ops! Conteúdo não encontrado.</Alert>
        <Button variant="contained" color="primary" onClick={() => router.back()}>
          Voltar
        </Button>
      </Box>
    );

  return (
    <Box sx={{ p: 2, display: "flex", justifyContent: "center", alignItems: "center", flex: 1 }}>
      <ContentCard content={content} isPreview={false} />
    </Box>
  );
};

export default ContentPage;
