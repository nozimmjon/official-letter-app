import { useState } from "react";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun, AlignmentType } from "docx";

export default function OfficialLetterGenerator() {
  const [formData, setFormData] = useState({
    day: "",
    month: "",
    year: "",
    docNumber: "",
    recipientPosition: "",
    recipientName: "",
    letterBody: "",
    senderPosition: "",
    senderName: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateDocx = async () => {
    const dateLine = `${formData.day} ${formData.month} ${formData.year} й. `;
    const fullDocNumber = `№ ${formData.docNumber}`;

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: "O‘ZBEKISTON RESPUBLIKASI MARKAZIY BANKI",
                  bold: true,
                  size: 28,
                  font: "Times New Roman",
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: "THE CENTRAL BANK OF THE REPUBLIC OF UZBEKISTAN",
                  size: 28,
                  font: "Times New Roman",
                }),
              ],
            }),
            new Paragraph({
              text: `${dateLine}               ${fullDocNumber}`,
              spacing: { after: 300 },
              font: "Times New Roman",
              size: 24,
            }),
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({
                  text: formData.recipientPosition,
                  size: 28,
                  font: "Times New Roman",
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({
                  text: formData.recipientName,
                  bold: true,
                  size: 28,
                  font: "Times New Roman",
                }),
              ],
            }),
            new Paragraph({
              spacing: { before: 300, after: 200 },
              children: [
                new TextRun({
                  text: `Ҳурматли ${formData.recipientName},`,
                  bold: true,
                  size: 28,
                  font: "Times New Roman",
                }),
              ],
            }),
            new Paragraph({
              spacing: { line: 276 },
              indent: { firstLine: 720 },
              children: [
                new TextRun({
                  text: formData.letterBody,
                  size: 28,
                  font: "Times New Roman",
                }),
              ],
            }),
            new Paragraph({ spacing: { before: 300 } }),
            new Paragraph({
              text: formData.senderPosition,
              spacing: { before: 300 },
              font: "Times New Roman",
              size: 28,
            }),
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({
                  text: formData.senderName,
                  bold: true,
                  size: 28,
                  font: "Times New Roman",
                }),
              ],
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "official_letter.docx");
  };

  return (
    <div style={{ maxWidth: "768px", margin: "0 auto", padding: "24px" }}>
      <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>Official Letter Generator</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
        <div>
          <label>Day</label>
          <input name="day" value={formData.day} onChange={handleChange} />
        </div>
        <div>
          <label>Month</label>
          <input name="month" value={formData.month} onChange={handleChange} />
        </div>
        <div>
          <label>Year</label>
          <input name="year" value={formData.year} onChange={handleChange} />
        </div>
      </div>
      <div>
        <label>Document Number</label>
        <input name="docNumber" value={formData.docNumber} onChange={handleChange} />
      </div>
      <div>
        <label>Recipient Position</label>
        <input name="recipientPosition" value={formData.recipientPosition} onChange={handleChange} />
      </div>
      <div>
        <label>Recipient Name</label>
        <input name="recipientName" value={formData.recipientName} onChange={handleChange} />
      </div>
      <div>
        <label>Letter Body</label>
        <textarea name="letterBody" rows={8} value={formData.letterBody} onChange={handleChange} />
      </div>
      <div>
        <label>Sender Position</label>
        <input name="senderPosition" value={formData.senderPosition} onChange={handleChange} />
      </div>
      <div>
        <label>Sender Name</label>
        <input name="senderName" value={formData.senderName} onChange={handleChange} />
      </div>
      <button onClick={generateDocx}>Generate .docx Letter</button>
    </div>
  );
}
