import axios from "axios";

interface VotePayload {
  contentId: string;
  voteType: string;
}

/**
 * Realiza a requisição para votar em um conteúdo.
 * Lança erro se não estiver logado (ou se a API retornar 401).
 */
export const postVote = async ({ contentId, voteType }: VotePayload) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Você precisa estar logado para votar.");
  }

  const response = await axios.post(
    "/api/vote",
    { contentId, voteType },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
