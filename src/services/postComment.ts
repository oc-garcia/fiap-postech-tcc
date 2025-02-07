import axios from "axios";

export interface PostCommentPayload {
  contentId: string;
  userId: string;
  text: string;
}

export const postComment = async (payload: PostCommentPayload) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token not found");
  }

  try {
    const response = await axios.post("/api/post-comment", payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
