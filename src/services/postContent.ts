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

interface PostContentData extends FormData, GeneratedContent {
  visibility: string;
}

export const postContent = async (data: PostContentData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token not found");
  }
  try {
    const saveResponse = await axios.post("/api/save-content", data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (saveResponse.status !== 200) {
      throw new Error("Falha ao salvar conteúdo no banco de dados.");
    }
    return saveResponse.data;
  } catch (error: unknown) {
    console.error("Erro ao salvar conteúdo:", error);
    throw new Error("Falha ao salvar conteúdo no banco de dados.");
  }
};