import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { Content } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { title, description, type, subject, tags, generatedContent, status, authorId, visibility } = req.body;

    const tagsString = Array.isArray(tags) ? tags.join(",") : tags;

    const savedContent: Content = await prisma.content.create({
      data: {
        title,
        description,
        type,
        subject,
        tags: tagsString,
        generatedContent,
        status,
        authorId,
        visibility,
      },
    });

    return res.status(200).json(savedContent);
  } catch (error) {
    console.error("Erro ao salvar conteúdo:", error);
    return res.status(500).json({ message: "Falha ao salvar conteúdo no banco de dados." });
  }
}