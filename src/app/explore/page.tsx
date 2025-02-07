"use client";

import React, { useContext, useEffect, useState } from "react";
import { Box, Container, Typography, Skeleton, Snackbar, Alert } from "@mui/material";
import Hero from "@/components/Hero/Hero";
import { Content, Vote } from "@prisma/client";
import ContentCard from "@/components/ContentCard/ContentCard";
import { getContent } from "@/services/getContent";
import ContentFilter, { FilterValues } from "@/components/ContentFilter/ContentFilter";
import { AuthContext } from "@/context/AuthContext";
import { getUser } from "@/services/getUser";

export interface ContentWithVotes extends Content {
  votes: Vote[];
  author?: { name: string };
}

const Explore = () => {
  const [contents, setContents] = useState<ContentWithVotes[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterValues, setFilterValues] = useState<FilterValues>({
    search: "",
    type: "",
    subject: "",
  });
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "warning" | "error" | "info";
  }>({
    open: false,
    message: "",
    severity: "warning",
  });

  const { userId, setUserId } = useContext(AuthContext);

  // Busca os conteúdos e, se necessário, recupera o usuário
  const fetchContents = async () => {
    if (userId == null) {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userResponse = await getUser(token);
          if (!userResponse.success || !userResponse.userId) {
            console.error("Erro ao buscar usuário:", userResponse.message);
            setSnackbar({
              open: true,
              message: "Faça Login para aproveitar todos os recursos.",
              severity: "info",
            });
            return;
          }
          setUserId(userResponse.userId);
        } catch (error) {
          console.error("Erro ao buscar usuário:", error);
          setSnackbar({
            open: true,
            message: "Faça Login para aproveitar todos os recursos.",
            severity: "info",
          });
        }
      }
    }

    try {
      const response = await getContent();
      setContents(response);
    } catch (error) {
      console.error("Erro ao buscar conteúdos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContents();
  }, []);

  // Atualiza os valores dos filtros conforme o formulário é alterado
  const handleFilterChange = (values: FilterValues) => {
    setFilterValues(values);
  };

  // Função para resetar os filtros para os valores iniciais
  const handleResetFilter = () => {
    const defaultFilters: FilterValues = {
      search: "",
      type: "",
      subject: "",
    };
    setFilterValues(defaultFilters);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const filteredContents = contents.filter((content) => {
    let matches = true;
    if (filterValues.search) {
      const searchText = filterValues.search.toLowerCase();
      matches =
        matches &&
        (content.title.toLowerCase().includes(searchText) ||
          content.description.toLowerCase().includes(searchText) ||
          (content.tags ? content.tags.toLowerCase().includes(searchText) : false));
    }
    if (filterValues.type) {
      matches = matches && content.type === filterValues.type;
    }
    if (filterValues.subject) {
      matches = matches && content.subject.toLowerCase() === filterValues.subject.toLowerCase();
    }
    return matches;
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", overflowX: "hidden" }}>
      <Hero
        title="Explore"
        subtitle="Mergulhe em conteúdos educativos incríveis escolhidos pela comunidade"
        backgroundImage="/images/explore-hero-image.jpg"
      />
      <Container sx={{ my: 4, flex: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Conteúdos
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <ContentFilter
            filterValues={filterValues}
            onFilterChange={handleFilterChange}
            onResetFilter={handleResetFilter}
          />
        </Box>
        {loading ? (
          <>
            <Skeleton variant="rectangular" width="100%" height={118} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" width="100%" height={118} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" width="100%" height={118} sx={{ mb: 2 }} />
          </>
        ) : filteredContents.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            Nenhum conteúdo encontrado.
          </Typography>
        ) : (
          filteredContents.map((content) => (
            <ContentCard key={content.id} content={content} onVoteSuccess={fetchContents} />
          ))
        )}
      </Container>
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

export default Explore;
