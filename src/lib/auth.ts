import jwt from "jsonwebtoken";

interface DecodedToken {
  id: string;
  name: string;
}

export function verifyToken(token: string): DecodedToken | null {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT secret não definido!");
    }
    // Verifica e decodifica o token
    const decoded = jwt.verify(token, secret) as DecodedToken;
    return decoded;
  } catch (error) {
    console.error("Erro ao verificar token:", error);
    return null;
  }
}

export function generateToken(payload: object): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT secret não definido!");
  }
  return jwt.sign(payload, secret, { expiresIn: "1h" });
}
