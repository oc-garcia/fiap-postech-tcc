import axios from "axios";

interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role: string;
  contentPreferences: string;
}

export const createUser = async (userData: CreateUserPayload) => {
  try {
    const response = await axios.post("/api/create-user", userData, {
      headers: { "Content-Type": "application/json" },
    });
    return { success: true, ...response.data };
  } catch (error) {
    return error;
  }
};
