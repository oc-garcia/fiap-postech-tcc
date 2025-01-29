import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

console.log("API Key:", process.env.OPENAI_API_KEY);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, dangerouslyAllowBrowser: true });

const GeneratedContentSchema = z.object({
  generatedContent: z.string(),
  status: z.string(),
});

interface FormData {
  title: string;
  description: string;
  type: string;
  subject: string;
  tags: string[];
}

export const generateContentFromForm = async (formData: FormData) => {
  try {
    const completion = await openai.beta.chat.completions.parse({
      model: "gpt-4o-2024-08-06",
      messages: [
        {
          role: "system",
          content:
            "Você é um assistente de professor para criação de conteúdo e atividades para alunos. Gere um conteúdo educativo formatado em Markdown para fácil exportação para PDF.",
        },
        {
          role: "user",
          content: `
          Gere um conteúdo bem estruturado no formato Markdown baseado nas seguintes informações:

          **Título:** ${formData.title}
          **Descrição:** ${formData.description}
          **Tipo:** ${formData.type}
          **Disciplina:** ${formData.subject}
          **Tags:** ${formData.tags.join(", ")}

          O conteúdo deve incluir:
          - Introdução
          - Objetivo
          - Desenvolvimento
          - Conclusão
          - Referências (se aplicável)
        `,
        },
      ],
      response_format: zodResponseFormat(GeneratedContentSchema, "generatedContent"),
    });

    return completion.choices[0].message.parsed;
  } catch (error) {
    console.error("Erro ao gerar conteúdo:", error);
    throw new Error("Falha ao gerar conteúdo com a OpenAI.");
  }
};
