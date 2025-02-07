import PptxGenJS from "pptxgenjs";

const createPptFromContent = (generatedContent: string, fileName: string) => {
  const pptx = new PptxGenJS();
  const slidesContent = generatedContent.split("---");

  slidesContent.forEach((slideMarkdown) => {
    const slide = pptx.addSlide();
    const cleanSlide = slideMarkdown.trim();
    if (!cleanSlide) return;

    const lines = cleanSlide
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    let title = "";
    let content = cleanSlide;

    if (lines[0].startsWith("#")) {
      title = lines[0].replace(/^#+\s*/, "");
      content = lines.slice(1).join("\n");
    }

    const marginX = 0.5;
    const marginY = 0.5;
    const slideWidth = 10;

    if (title) {
      slide.addText(title, {
        x: marginX,
        y: marginY,
        w: slideWidth - marginX * 2,
        fontSize: 28,
        bold: true,
        color: "363636",
      });
      slide.addText(content, {
        x: marginX,
        y: marginY + 1.5,
        w: slideWidth - marginX * 2,
        fontSize: 18,
        color: "363636",
        autoFit: true,
        margin: 0.1,
        bullet: false,
      });
    } else {
      slide.addText(content, {
        x: marginX,
        y: marginY,
        w: slideWidth - marginX * 2,
        fontSize: 18,
        color: "363636",
        autoFit: true,
        margin: 0.1,
        bullet: false,
      });
    }
  });

  pptx.writeFile({ fileName: `${fileName}.pptx` });
};

export default createPptFromContent;