
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
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
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-bold">Official Letter Generator</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="day">Day</Label>
              <Input id="day" name="day" value={formData.day} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="month">Month</Label>
              <Input id="month" name="month" value={formData.month} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="year">Year</Label>
              <Input id="year" name="year" value={formData.year} onChange={handleChange} />
            </div>
          </div>
          <div>
            <Label htmlFor="docNumber">Document Number</Label>
            <Input id="docNumber" name="docNumber" value={formData.docNumber} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="recipientPosition">Recipient Position</Label>
            <Input id="recipientPosition" name="recipientPosition" value={formData.recipientPosition} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="recipientName">Recipient Name</Label>
            <Input id="recipientName" name="recipientName" value={formData.recipientName} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="letterBody">Letter Body</Label>
            <Textarea id="letterBody" name="letterBody" rows={8} value={formData.letterBody} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="senderPosition">Sender Position</Label>
            <Input id="senderPosition" name="senderPosition" value={formData.senderPosition} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="senderName">Sender Name</Label>
            <Input id="senderName" name="senderName" value={formData.senderName} onChange={handleChange} />
          </div>
          <Button onClick={generateDocx}>Generate .docx Letter</Button>
        </CardContent>
      </Card>
    </div>
  );
}
