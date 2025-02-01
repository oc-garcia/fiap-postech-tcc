import { NextApiRequest, NextApiResponse } from "next";
import { openAi } from "@/lib/openAi";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const GeneratedContentSchema = z.object({
  generatedContent: z.string(),
  status: z.string(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const formData = req.body;
  try {
    const completion = await openAi.beta.chat.completions.parse({
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

    res.status(200).json(completion.choices[0].message.parsed);
  } catch (error) {
    console.error("Erro ao gerar conteúdo:", error);
    res.status(500).json({ error: "Falha ao gerar conteúdo com a OpenAI." });
  }
};

export default handler;
