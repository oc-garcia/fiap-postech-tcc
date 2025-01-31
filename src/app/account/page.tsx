"use client";

import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Paper, List, ListItem, ListItemText, Skeleton } from "@mui/material";
import Hero from "@/components/Hero/Hero";
import { User, Content, SchoolSubject } from "@prisma/client"; // Importa os tipos diretamente do Prisma

type UserWithContents = User & {
  createdContents: Content[];
};

const mockUser: UserWithContents = {
  id: "1",
  name: "Usuário Mockado",
  email: "usuario@mockado.com",
  password: "mockpassword",
  role: "user",
  contentPreferences: "Matemática, Ciências",
  createdContents: [
    {
      id: "1",
      title: "Conteúdo Mockado 1",
      description: "Descrição do conteúdo mockado 1",
      type: "atividade",
      status: "ativo",
      visibility: "public",
      creationDate: new Date(),
      authorId: "1",
      generatedContent: "Conteúdo gerado 1",
      upvotes: 10,
      downvotes: 2,
      tags: "tag1, tag2",
      subject: SchoolSubject.Matematica,
      subdisciplineId: null,
    },
    {
      id: "2",
      title: "Conteúdo Mockado 2",
      description: "Descrição do conteúdo mockado 2",
      type: "prova",
      status: "ativo",
      visibility: "public",
      creationDate: new Date(),
      authorId: "1",
      generatedContent: "Conteúdo gerado 2",
      upvotes: 5,
      downvotes: 1,
      tags: "tag3, tag4",
      subject: SchoolSubject.Historia,
      subdisciplineId: null,
    },
  ],
};

const Account = () => {
  const [user, setUser] = useState<UserWithContents | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula um atraso para exibir o skeleton
    setTimeout(() => {
      setUser(mockUser);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Hero
        title="Conta"
        subtitle="Gerencie suas informações e preferências"
        backgroundImage="/images/account-hero-image.jpg"
      />
      <Container
        sx={{
          my: 4,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 600 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Informações da Conta
          </Typography>
          {loading ? (
            <List>
              <ListItem>
                <ListItemText primary="Nome" secondary={<Skeleton width="60%" />} />
              </ListItem>
              <ListItem>
                <ListItemText primary="E-mail" secondary={<Skeleton width="80%" />} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Preferências de Conteúdo" secondary={<Skeleton width="50%" />} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Conteúdos Criados" secondary={<Skeleton width="30%" />} />
              </ListItem>
            </List>
          ) : user ? (
            <List>
              <ListItem>
                <ListItemText primary="Nome" secondary={user.name} />
              </ListItem>
              <ListItem>
                <ListItemText primary="E-mail" secondary={user.email} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Preferências de Conteúdo"
                  secondary={user.contentPreferences || "Nenhuma preferência definida"}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary="Conteúdos Criados" secondary={user.createdContents.length} />
              </ListItem>
            </List>
          ) : (
            <List>
              <ListItem>
                <ListItemText primary="Nome" secondary={<Skeleton width="60%" />} />
              </ListItem>
              <ListItem>
                <ListItemText primary="E-mail" secondary={<Skeleton width="80%" />} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Preferências de Conteúdo" secondary={<Skeleton width="50%" />} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Conteúdos Criados" secondary={<Skeleton width="30%" />} />
              </ListItem>
            </List>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Account;
