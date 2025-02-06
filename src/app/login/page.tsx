"use client";

import React from "react";
import { Box, Container, TextField, Button, Typography, Paper, Link } from "@mui/material";
import { useFormik } from "formik";
import * as z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido").nonempty("E-mail é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres").nonempty("Senha é obrigatória"),
});

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: toFormikValidationSchema(loginSchema),
    onSubmit: (values) => {
      console.log("Valores do formulário", values);
      // Adicione aqui a lógica de autenticação
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
            Login
          </Typography>
          <form onSubmit={formik.handleSubmit}>
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
            <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
              Entrar
            </Button>
          </form>
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography variant="body2">
              Não tem uma conta? <Link href="/register">Registre-se</Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
