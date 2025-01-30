import axios from "axios";

interface FormData {
  title: string;
  description: string;
  type: string;
  subject: string;
  tags: string[];
}

export const generateContentFromForm = async (formData: FormData) => {
  try {
    const response = await axios.post("/api/content", formData);

    if (response.status !== 200) {
      throw new Error("Falha ao gerar conteúdo com a OpenAI.");
    }

    return response.data;
  } catch (error) {
    console.error("Erro ao gerar conteúdo:", error);
    throw new Error("Falha ao gerar conteúdo com a OpenAI.");
  }
};