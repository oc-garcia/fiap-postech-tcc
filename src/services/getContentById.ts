import axios from "axios";
import { Content } from "@prisma/client";

export const getContentById = async (contentId: string): Promise<Content> => {
  try {
    const response = await axios.get<Content>(`/api/get-content-by-id?contentId=${contentId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching content:", error);
    throw error;
  }
};
