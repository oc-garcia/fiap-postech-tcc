import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "@/lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
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

  // Token is valid, return the user ID
  return res.status(200).json({ success: true, userId: decodedToken.id });
}