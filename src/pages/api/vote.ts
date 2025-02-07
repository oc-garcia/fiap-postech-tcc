import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }
  const token = authHeader.split(" ")[1];
  const user = verifyToken(token);
  if (!user) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }

  const { contentId, voteType } = req.body;
  if (!contentId || (voteType !== "up" && voteType !== "down")) {
    return res.status(400).json({ error: "Dados inválidos" });
  }

  const existingVote = await prisma.vote.findUnique({
    where: {
      userId_contentId: { userId: user.id, contentId },
    },
  });

  if (existingVote) {
    if (existingVote.type === voteType) {
      await prisma.vote.delete({
        where: { id: existingVote.id },
      });
      return res.status(200).json({ message: "Voto removido" });
    } else {
      await prisma.vote.update({
        where: { id: existingVote.id },
        data: { type: voteType },
      });
      return res.status(200).json({ message: "Voto atualizado" });
    }
  } else {
    await prisma.vote.create({
      data: {
        userId: user.id,
        contentId,
        type: voteType,
      },
    });
    return res.status(200).json({ message: "Voto registrado" });
  }
}