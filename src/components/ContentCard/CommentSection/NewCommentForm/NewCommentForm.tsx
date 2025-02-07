"use client";

import React from "react";
import { Box, TextField, Button, Typography, CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import * as z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export interface NewCommentFormProps {
  onSubmit: (commentText: string) => void;
  onClose: () => void;
}

const commentSchema = z.object({
  comment: z.string().min(1, "O comentário é obrigatório"),
});

const NewCommentForm: React.FC<NewCommentFormProps> = ({ onSubmit, onClose }) => {
  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: toFormikValidationSchema(commentSchema),
    onSubmit: (values, { resetForm }) => {
      onSubmit(values.comment);
      resetForm();
      onClose();
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Novo Comentário
      </Typography>
      <TextField
        label="Comentário"
        name="comment"
        multiline
        fullWidth
        minRows={3}
        value={formik.values.comment}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.comment && Boolean(formik.errors.comment)}
        helperText={formik.touched.comment && formik.errors.comment}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: 1 }}>
        <Button variant="outlined" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" variant="contained" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? <CircularProgress size="1rem" /> : "Enviar"}
        </Button>
      </Box>
    </Box>
  );
};

export default NewCommentForm;