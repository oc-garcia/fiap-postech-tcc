import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const generatePdfFromElement = async (element: HTMLElement, fileName: string, scale: number = 2) => {
  const canvas = await html2canvas(element, { scale });
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();

  const imgProps = pdf.getImageProperties(imgData);
  const imgWidth = pdfWidth;
  const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

  pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  pdf.save(`${fileName}.pdf`);
};