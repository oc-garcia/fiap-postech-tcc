import React, { useState } from "react";
import { useFormik } from "formik";
import * as z from "zod";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { SchoolSubject } from "@prisma/client";
import useGetSubdisciplines from "@/hooks/useGetSubdisciplines";

// Esquema de validação usando Zod
const contentSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  description: z.string().optional(),
  type: z.enum(["atividade", "prova", "apresentação", "outro"]),
  subject: z.nativeEnum(SchoolSubject),
  tags: z.array(z.string()).optional(),
});

const TeachingContentForm = () => {
  const [selectedSubject, setSelectedSubject] = useState("");

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      type: "atividade",
      subject: "",
      tags: [],
    },
    validationSchema: toFormikValidationSchema(contentSchema),
    onSubmit: (values) => {
      console.log("Valores do formulário", values);
      // Lógica de envio do formulário (ex.: chamada à API)
    },
  });

  // Convert enum to array of values
  const schoolSubjects = Object.values(SchoolSubject);
  const subdisciplineList = useGetSubdisciplines(selectedSubject);

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ maxWidth: 500, margin: "0 auto", padding: 2 }}>
      <Typography variant="h5" mb={2}>
        Criar Conteúdo
      </Typography>

      <TextField
        fullWidth
        label="Título"
        name="title"
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Descrição"
        name="description"
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
        margin="normal"
        multiline
        rows={4}
      />

      <TextField
        fullWidth
        select
        label="Tipo"
        name="type"
        value={formik.values.type}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.type && Boolean(formik.errors.type)}
        helperText={formik.touched.type && formik.errors.type}
        margin="normal">
        {[
          { value: "atividade", label: "Atividade" },
          { value: "prova", label: "Prova" },
          { value: "apresentação", label: "Apresentação" },
          { value: "outro", label: "Outro" },
        ].map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        select
        label="Disciplina"
        name="subject"
        value={formik.values.subject}
        onChange={(e) => {
          formik.handleChange(e);
          setSelectedSubject(e.target.value);
        }}
        onBlur={formik.handleBlur}
        error={formik.touched.subject && Boolean(formik.errors.subject)}
        helperText={formik.touched.subject && formik.errors.subject}
        margin="normal">
        {schoolSubjects.map((subject) => (
          <MenuItem key={subject} value={subject}>
            {subject}
          </MenuItem>
        ))}
      </TextField>

      <FormControl fullWidth margin="normal">
        <InputLabel>Tags</InputLabel>
        <Select
          margin="none"
          multiple
          label="Tags"
          name="tags"
          value={formik.values.tags}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.tags && Boolean(formik.errors.tags)}
          renderValue={(selected) => selected.join(", ")}>
          {subdisciplineList.map((subdiscipline) => (
            <MenuItem key={subdiscipline} value={subdiscipline}>
              {subdiscipline}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
        Enviar
      </Button>
    </Box>
  );
};

export default TeachingContentForm;
