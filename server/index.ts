import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { GoogleGenAI, Modality } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = "gemini-2.5-flash-image-preview";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

app.post("/generate", async (req, res) => {
  const { base64, mimeType, prompt } = req.body;

  if (!base64 || !mimeType || !prompt) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [
        { inlineData: { data: base64, mimeType } },
        { text: prompt }
      ],
      config: { responseModalities: [Modality.IMAGE, Modality.TEXT] }
    });

    let imageUrl: string | null = null;
    let text: string | null = null;

    if (
      response.candidates &&
      response.candidates.length > 0 &&
      response.candidates[0].content &&
      Array.isArray(response.candidates[0].content.parts)
    ) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        } else if (part.text) {
          text = part.text;
        }
      }
    }

    if (!imageUrl) {
      return res.status(500).json({ error: "Gemini API did not return an image" });
    }

    res.json({ imageUrl, text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error communicating with Gemini API" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
