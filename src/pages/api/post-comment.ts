import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma"; // Certifique-se de ter configurado o prisma client

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ success: false, message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];
  const decodedToken = verifyToken(token);
  if (!decodedToken) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }

  const { contentId, userId, text } = req.body;

  if (decodedToken.id !== userId) {
    return res.status(403).json({ success: false, message: "User mismatch" });
  }

  try {
    const comment = await prisma.comment.create({
      data: {
        contentId,
        userId,
        text,
      },
    });

    return res.status(200).json({ success: true, data: comment });
  } catch (error) {
    console.error("Error creating comment", error);
    return res.status(500).json({ success: false, message: "Error creating comment", error });
  }
}