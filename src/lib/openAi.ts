import OpenAI from "openai";

export const openAi = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });