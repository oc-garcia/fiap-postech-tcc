import axios from "axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
}

export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>("/api/login", payload);
    return response.data;
  } catch (error: unknown) {
    let message = "Erro ao realizar login, tente novamente.";
    if (axios.isAxiosError(error) && error.response) {
      const data = error.response.data as { message?: string };
      message = data.message || message;
    }
    return {
      success: false,
      message,
    };
  }
};