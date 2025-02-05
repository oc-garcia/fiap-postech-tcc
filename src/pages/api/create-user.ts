import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, email, password, role, contentPreferences } = req.body;

    // Verifica se o email já está em uso
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Salva o novo usuário no banco de dados
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        contentPreferences,
      },
    });

    return res.status(201).json({ message: "User created successfully", user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role } });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return res.status(500).json({ message: "Falha ao criar usuário." });
  }
}