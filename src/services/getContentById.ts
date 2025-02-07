import axios from "axios";
import { Content, Vote } from "@prisma/client";

export interface ContentWithVotes extends Content {
  votes: Vote[];
  author?: { name: string };
}

export async function getContentById(contentId: string): Promise<ContentWithVotes> {
  try {
    const response = await axios.get(`/api/get-content-by-id?contentId=${contentId}`);
    const contentData = response.data;
    // Garante que exista a propriedade votes (mesmo que seja vazia)
    return {
      ...contentData,
      votes: contentData.votes ?? [],
    } as ContentWithVotes;
  } catch (error) {
    console.error("Error fetching content:", error);
    throw error;
  }
}