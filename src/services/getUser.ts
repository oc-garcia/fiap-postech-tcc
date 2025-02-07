import axios from "axios";

interface GetUserResponse {
  success: boolean;
  userId?: string;
  message?: string;
}

export const getUser = async (token: string): Promise<GetUserResponse> => {
  try {
    const response = await axios.get<GetUserResponse>("/api/get-user", {
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
