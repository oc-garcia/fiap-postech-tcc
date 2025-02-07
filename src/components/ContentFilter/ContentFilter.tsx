import React from "react";
import { Box, FormControl, InputLabel, Select, MenuItem, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { SchoolSubject } from "@prisma/client";

export interface FilterValues {
  type: string;
  subject: string;
  search: string;
}

interface ContentFilterProps {
  filterValues: FilterValues;
  onFilterChange: (values: FilterValues) => void;
  onResetFilter?: () => void;
}

// Permite também valores vazios para os campos "type" e "subject"
const filterSchema = z.object({
  search: z.string().optional(),
  type: z.union([z.enum(["atividade", "prova", "apresentação", "outro"]), z.literal("").optional()]),
  subject: z.union([z.nativeEnum(SchoolSubject), z.literal("").optional()]),
});

const ContentFilter: React.FC<ContentFilterProps> = ({ filterValues, onFilterChange, onResetFilter }) => {
  const formik = useFormik({
    initialValues: filterValues,
    enableReinitialize: true,
    validationSchema: toFormikValidationSchema(filterSchema),
    onSubmit: (values) => {
      onFilterChange(values);
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
      <TextField
        label="Pesquisar"
        name="search"
        value={formik.values.search}
        onChange={formik.handleChange}
        size="small"
      />
      <FormControl sx={{ minWidth: 120 }} size="small">
        <InputLabel id="type-label">Tipo</InputLabel>
        <Select labelId="type-label" name="type" value={formik.values.type} label="Tipo" onChange={formik.handleChange}>
          <MenuItem value="">Todos</MenuItem>
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
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 150 }} size="small">
        <InputLabel id="subject-label">Disciplina</InputLabel>
        <Select
          labelId="subject-label"
          name="subject"
          value={formik.values.subject}
          label="Disciplina"
          onChange={formik.handleChange}>
          <MenuItem value="">Todas</MenuItem>
          {Object.values(SchoolSubject).map((subject) => (
            <MenuItem key={subject} value={subject}>
              {subject}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" size="small">
        Aplicar
      </Button>
      {onResetFilter && (
        <Button variant="outlined" size="small" onClick={onResetFilter}>
          Resetar
        </Button>
      )}
    </Box>
  );
};

export default ContentFilter;
