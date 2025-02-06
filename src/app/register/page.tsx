"use client";

import React, { useState } from "react";
import { Box, Container, TextField, Button, Typography, Paper, Link } from "@mui/material";
import { useFormik } from "formik";
import * as z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { createUser } from "@/services/createUser";

const registerSchema = z
  .object({
    name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres").nonempty("Nome é obrigatório"),
    email: z.string().email("E-mail inválido").nonempty("E-mail é obrigatório"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres").nonempty("Senha é obrigatória"),
    confirmPassword: z
      .string()
      .min(6, "A confirmação da senha deve ter pelo menos 6 caracteres")
      .nonempty("Confirmação da senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

const Register = () => {
  const [message, setMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: toFormikValidationSchema(registerSchema),
    onSubmit: async (values) => {
      setMessage("");
      try {
        const data = await createUser({
          name: values.name,
          email: values.email,
          password: values.password,
          role: "user",
          contentPreferences: "",
        });
        if (data.success) {
          setMessage("Usuário criado com sucesso!");
        } else {
          setMessage(data.message || "Erro ao criar usuário.");
        }
      } catch (error) {
        console.error(error);
        setMessage("Erro ao conectar com o servidor.");
      }
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Registrar
          </Typography>
          {message && (
            <Typography color="error" sx={{ mb: 2 }}>
              {message}
            </Typography>
          )}
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              label="Nome"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              label="E-mail"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              label="Senha"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              label="Confirme a Senha"
              name="confirmPassword"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              margin="normal"
              variant="outlined"
              required
            />
            <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
              Registrar
            </Button>
          </form>
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography variant="body2">
              Já tem uma conta? <Link href="/login">Faça login</Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
