import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables.");
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Missing token" });
  }
  const token = authHeader.split(" ")[1];

  let userId: string;
  try {
    // Assert JWT_SECRET as string since we've checked it's defined above.
    const decoded = jwt.verify(token, JWT_SECRET as string);
    if (typeof decoded !== "object" || !decoded || !("id" in decoded)) {
      return res.status(401).json({ success: false, message: "Invalid token payload" });
    }
    userId = (decoded as JwtPayload).id as string;
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }

  const { title, description, type, subject, tags, generatedContent } = req.body;
  try {
    const content = await prisma.content.create({
      data: {
        title,
        description,
        type,
        subject,
        tags: tags.join(","),
        generatedContent,
        visibility: "public",
        authorId: userId,
        status: "active",
      },
    });

    return res.status(200).json({ success: true, content });
  } catch (error) {
    console.error("Error creating content:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}
