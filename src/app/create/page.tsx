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
  AlertColor,
  Snackbar,
  Alert,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import React, { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";

const Create = () => {
  const { isLoggedIn } = useContext(AuthContext);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: AlertColor }>({
    open: false,
    message: "",
    severity: "success",
  });

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleOpenForm = () => {
    if (!isLoggedIn) {
      setSnackbar({
        open: true,
        message: "Você precisa estar logado para criar conteúdo.",
        severity: "warning",
      });
      return;
    }
    setDrawerOpen(true);
  };

  const handleSuccess = () => {
    setDrawerOpen(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
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
        <Box sx={{ mt: 2, display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
          <Button variant="contained" color="primary" onClick={handleOpenForm} sx={{ mr: 4 }}>
            Abrir Formulário de Criação
          </Button>
          <Image src="/svg/openAi.svg" alt="OpenAI Logo" width={20} height={20} />
          <Typography variant="caption">Powered by OpenAI</Typography>
        </Box>
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          PaperProps={{ sx: { width: "100%", height: "100%" } }}>
          <Box sx={{ p: 4, position: "relative" }}>
            <IconButton onClick={toggleDrawer(false)} sx={{ position: "absolute", top: 16, right: 16 }}>
              <CloseIcon />
            </IconButton>
            <CreateContentForm onSuccess={handleSuccess} setSnackbar={setSnackbar} />
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
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Create;
