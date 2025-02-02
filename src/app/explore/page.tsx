"use client";

import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Skeleton } from "@mui/material";
import Hero from "@/components/Hero/Hero";
import { Content } from "@prisma/client";
import ContentCard from "@/components/ContentCard/ContentCard";
import { getContent } from "@/services/getContent";

const Explore = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await getContent();
        setContents(response);
      } catch (error) {
        console.error("Erro ao buscar conteúdos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContents();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Hero
        title="Explore"
        subtitle="Mergulhe em conteúdos educativos incríveis escolhidos pela comunidade"
        backgroundImage="/images/explore-hero-image.jpg"
      />
      <Container sx={{ my: 4, flex: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Conteúdos
        </Typography>
        {loading ? (
          <>
            <Skeleton variant="rectangular" width="100%" height={118} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" width="100%" height={118} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" width="100%" height={118} sx={{ mb: 2 }} />
          </>
        ) : (
          contents.map((content) => <ContentCard key={content.id} content={content} />)
        )}
      </Container>
    </Box>
  );
};

export default Explore;
