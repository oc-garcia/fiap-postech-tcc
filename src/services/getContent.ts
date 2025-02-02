import axios from "axios";
import { Content } from "@prisma/client";

export const getContent = async (): Promise<Content[]> => {
  try {
    const response = await axios.get("/api/get-content");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar conteúdos:", error);
    throw new Error("Falha ao buscar conteúdos do servidor.");
  }
};
