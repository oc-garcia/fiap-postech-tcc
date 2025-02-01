import axios from "axios";

interface FormData {
  title: string;
  description: string;
  type: string;
  subject: string;
  tags: string[];
}

interface GeneratedContent {
  generatedContent: string;
  status: string;
}

interface SaveContentData extends FormData, GeneratedContent {
  authorId: string;
  visibility: string;
}

export const saveContent = async (data: SaveContentData) => {
  try {
    const saveResponse = await axios.post("/api/save-content", data);

    if (saveResponse.status !== 200) {
      throw new Error("Falha ao salvar conteúdo no banco de dados.");
    }

    return saveResponse.data;
  } catch (error) {
    console.error("Erro ao salvar conteúdo:", error);
    throw new Error("Falha ao salvar conteúdo no banco de dados.");
  }
};