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

    const generatedContent = response.data;

    const saveResponse = await axios.post("/api/saveContent", {
      ...formData,
      generatedContent: generatedContent.generatedContent,
      status: generatedContent.status,
      authorId: "some-author-id",
      visibility: "public",
    });

    if (saveResponse.status !== 200) {
      throw new Error("Falha ao salvar conteúdo no banco de dados.");
    }

    return saveResponse.data;
  } catch (error) {
    console.error("Erro ao gerar conteúdo:", error);
    throw new Error("Falha ao gerar conteúdo com a OpenAI.");
  }
};
