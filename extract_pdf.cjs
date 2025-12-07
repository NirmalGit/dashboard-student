const fs = require('fs');
const { PDFParse } = require('pdf-parse');

const pdfPath = 'CSE III SEM Syllabus 2025-26130825124057.pdf';

fs.readFile(pdfPath, async (err, data) => {
  if (err) {
    console.error('Error reading PDF:', err);
    return;
  }

  try {
    const parser = new PDFParse({ data: data });
    const result = await parser.getText();
    console.log(result.text);
  } catch (error) {
    console.error('Error parsing PDF:', error);
  }
});