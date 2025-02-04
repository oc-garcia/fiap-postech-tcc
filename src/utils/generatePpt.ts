import PptxGenJS from "pptxgenjs";

/**
 * Função que converte um conteúdo estruturado em slides (por exemplo, separado por um delimitador)
 * em uma apresentação PPTX.
 */
const createPptFromContent = (generatedContent: string, fileName: string) => {
  const pptx = new PptxGenJS();

  // Exemplo: supondo que o conteúdo gerado tenha um separador '---' para indicar a quebra de slides.
  const slidesContent = generatedContent.split("---");

  slidesContent.forEach((slideText) => {
    // Cria um novo slide para cada parte
    const slide = pptx.addSlide();
    slide.addText(slideText.trim(), { x: 0.5, y: 0.5, fontSize: 18 });
  });

  // Salva o arquivo PPTX localmente (ou você pode retornar o buffer para enviar como resposta)
  pptx.writeFile({ fileName: `${fileName}.pptx` });
};

export default createPptFromContent;
