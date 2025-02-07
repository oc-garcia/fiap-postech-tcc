import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { contentId } = req.query;

  if (!contentId || typeof contentId !== "string") {
    return res.status(400).json({ error: "Invalid or missing contentId" });
  }

  try {
    const content = await prisma.content.findUnique({
      where: { id: contentId },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        comments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        votes: true,
      },
    });

    if (!content) {
      return res.status(404).json({ error: "Content not found" });
    }

    return res.status(200).json(content);
  } catch (error) {
    console.error("Error fetching content:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
