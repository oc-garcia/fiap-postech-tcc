import { Comment, Content, User, Vote } from "@prisma/client";
import axios from "axios";

export interface ContentWithVotes extends Content {
  votes: Vote[];
}

export interface UserWithDetails extends User {
  createdContents: ContentWithVotes[];
  comments: Comment[];
  votes: Vote[];
}

export const getUserWithDetails = async (token: string): Promise<UserWithDetails> => {
  try {
    const response = await axios.get<UserWithDetails>("/api/get-user-with-details", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
