import axios from "axios";
import { Content, Vote } from "@prisma/client";

export interface ContentWithVotes extends Content {
  votes: Vote[];
  author?: { name: string };
}

export const getContent = async (): Promise<ContentWithVotes[]> => {
  try {
    const response = await axios.get("/api/get-content");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar conteúdos:", error);
    throw new Error("Falha ao buscar conteúdos do servidor.");
  }
};
