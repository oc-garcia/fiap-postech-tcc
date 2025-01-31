"use client";

import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Skeleton } from "@mui/material";
import Hero from "@/components/Hero/Hero";
import { Content } from "@prisma/client";
import ContentCard from "@/components/ContentCard/ContentCard";

const mockContents: Content[] = [
  {
    id: "1",
    title: "Conteúdo Mockado 1",
    description: "Descrição do conteúdo mockado 1",
    type: "atividade",
    creationDate: new Date(),
    authorId: "1",
    generatedContent: "Conteúdo gerado 1",
    status: "ativo",
    upvotes: 10,
    downvotes: 2,
    tags: "tag1, tag2",
    visibility: "public",
    subject: "Matematica",
    subdisciplineId: null,
  },
  {
    id: "2",
    title: "Conteúdo Mockado 2",
    description: "Descrição do conteúdo mockado 2",
    type: "prova",
    creationDate: new Date(),
    authorId: "1",
    generatedContent: "Conteúdo gerado 2",
    status: "ativo",
    upvotes: 5,
    downvotes: 1,
    tags: "tag3, tag4",
    visibility: "public",
    subject: "Historia",
    subdisciplineId: null,
  },
];

const Explore = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        // Simula um atraso para exibir o skeleton
        await new Promise((resolve) => setTimeout(resolve, 2000));
        // Substitua pelo código real para buscar os dados do Prisma
        // const contentsData = await prisma.content.findMany();
        // setContents(contentsData);
        setContents(mockContents);
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