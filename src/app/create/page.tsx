"use client";

import CreateContentForm from "@/components/CreateContentForm/CreateContentForm";
import Hero from "@/components/Hero/Hero";
import {
  Box,
  Container,
  Typography,
  Drawer,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";

const Create = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Hero
        title="Criar Conteúdo"
        subtitle="Inspire suas aulas com novos materiais"
        backgroundImage="/images/create-hero-image.jpg"
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
        <Button variant="contained" color="primary" onClick={toggleDrawer(true)}>
          Abrir Formulário de Criação
        </Button>
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          PaperProps={{ sx: { width: "100%", height: "100%" } }}>
          <Box sx={{ p: 4, position: "relative" }}>
            <IconButton onClick={toggleDrawer(false)} sx={{ position: "absolute", top: 16, right: 16 }}>
              <CloseIcon />
            </IconButton>
            <CreateContentForm />
          </Box>
        </Drawer>
        <Box sx={{ width: "100%", maxWidth: 800, mt: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Instruções para Criar Conteúdo
          </Typography>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
              sx={{ backgroundColor: "primary.main", color: "white" }}>
              <Typography variant="h6">Título</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                O título deve ser claro e descritivo, refletindo o conteúdo que será abordado. Ele deve chamar a atenção
                dos professores e alunos.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
              sx={{ backgroundColor: "primary.main", color: "white" }}>
              <Typography variant="h6">Descrição</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                A descrição deve fornecer uma visão geral do conteúdo, destacando os principais pontos e objetivos. Seja
                conciso, mas informativo.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
              sx={{ backgroundColor: "primary.main", color: "white" }}>
              <Typography variant="h6">Tipo</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                Selecione o tipo de conteúdo que você está criando. Pode ser uma atividade, prova, apresentação ou outro
                tipo de material educativo.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
              sx={{ backgroundColor: "primary.main", color: "white" }}>
              <Typography variant="h6">Disciplina</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                Escolha a disciplina relacionada ao conteúdo que você está criando. Isso ajudará outros professores a
                encontrar e utilizar seu material.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
              sx={{ backgroundColor: "primary.main", color: "white" }}>
              <Typography variant="h6">Tags</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                Adicione tags relevantes ao seu conteúdo. As tags ajudam a categorizar e facilitar a busca pelo
                material. Selecione pelo menos uma tag.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Container>
    </Box>
  );
};

export default Create;
