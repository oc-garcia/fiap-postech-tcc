import axios from "axios";
import { postContent } from "./postContent";

interface FormData {
  title: string;
  description: string;
  type: string;
  subject: string;
  tags: string[];
}

export const generateContentFromForm = async (formData: FormData) => {
  try {
    const response = await axios.post("/api/create-content", formData);

    if (response.status !== 200) {
      throw new Error("Falha ao gerar conteúdo com a OpenAI.");
    }

    const generatedContent = response.data;

    const data = { ...formData, ...generatedContent, visibility: "public" };

    const saveResponse = await postContent(data);

    return saveResponse;
  } catch (error) {
    console.error("Erro ao gerar conteúdo:", error);
    throw new Error("Falha ao gerar conteúdo com a OpenAI.");
  }
};
