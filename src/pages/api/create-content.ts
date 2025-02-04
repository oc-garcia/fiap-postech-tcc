import { NextApiRequest, NextApiResponse } from "next";
import { openAi } from "@/lib/openAi";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const GeneratedContentSchema = z.object({
  generatedContent: z.string(),
  status: z.string(),
});

const getSpecificInstructions = (type: string): string => {
  switch (type) {
    case "prova":
      return "Crie uma prova que contenha questões objetivas e discursivas. Para cada questão, inclua um gabarito com respostas e justificativas. Comece com uma introdução que contextualize os tópicos e, ao final, inclua dicas para ajudar na revisão dos conceitos.";
    case "atividade":
      return "Desenvolva uma atividade prática que estimule a participação dos alunos. Inclua exercícios interativos, exemplos práticos e questões de reflexão, sugerindo formas de autoavaliação para o aluno.";
    case "apresentação":
      return "Estruture o conteúdo como se fosse uma apresentação de slides para PowerPoint (PPT). Divida o conteúdo em slides, onde cada slide contenha um título e pontos-chave. O formato deve facilitar a conversão para um arquivo PPT.";
    case "outro":
      return "Crie um conteúdo versátil e adaptável, com uma linguagem clara e objetiva. Organize as informações de forma lógica, com seções bem definidas, e inclua exemplos práticos ou estudos de caso para ilustrar os conceitos.";
    default:
      return "";
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const formData = req.body;
  const specificInstructions = getSpecificInstructions(formData.type);

  const systemMessage =
    formData.type === "apresentação"
      ? "Você é um assistente de professor especializado em criar apresentações de slides para PowerPoint (PPT). Gere um conteúdo educativo formatado em Markdown, organizado em slides, onde cada slide possui um título e pontos principais que facilitem a conversão para uma apresentação visual."
      : "Você é um assistente de professor para criação de conteúdo e atividades para alunos. Gere um conteúdo educativo formatado em Markdown para fácil exportação para PDF.";

  const userPrompt =
    formData.type === "apresentação"
      ? `
Gere uma apresentação de slides em Markdown baseada nas seguintes informações:

**Título:** ${formData.title}
**Descrição:** ${formData.description}
**Tipo:** ${formData.type}
**Disciplina:** ${formData.subject}
**Tags:** ${formData.tags.join(", ")}

A apresentação deve conter os seguintes slides:
- Slide de Título (com o título e subtítulo)
- Slide de Introdução
- Slides para os tópicos principais (ex.: Objetivo, Desenvolvimento, Conclusão)
- Slide de Referências (se aplicável)

Direcionamento específico: ${getSpecificInstructions(formData.type)}
`
      : `
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

Direcionamento específico: ${specificInstructions}
`;

  try {
    const completion = await openAi.beta.chat.completions.parse({
      model: "gpt-4o-2024-08-06",
      messages: [
        {
          role: "system",
          content: systemMessage,
        },
        {
          role: "user",
          content: userPrompt,
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
