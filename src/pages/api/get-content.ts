import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const contents = await prisma.content.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        comments: true,
        votes: true,
      },
    });
    return res.status(200).json(contents);
  } catch (error) {
    console.error("Erro ao buscar conteúdos:", error);
    return res.status(500).json({ message: "Falha ao buscar conteúdos do banco de dados." });
  }
}