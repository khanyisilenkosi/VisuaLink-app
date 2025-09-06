
import { GoogleGenAI, Modality } from "@google/genai";
import type { GeneratedContent } from '../../types';

const apiKey = import.meta.env.VITE_API_KEY;

if (!apiKey) {
  throw new Error("VITE_API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey });


export const editImageWithNanoBanana = async (
  base64ImageData: string,
  mimeType: string,
  prompt: string
): Promise<GeneratedContent> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-pro-vision",
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
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
          const base64ImageBytes = part.inlineData.data;
          const imageMimeType = part.inlineData.mimeType;
          imageUrl = `data:${imageMimeType};base64,${base64ImageBytes}`;
        } else if (part.text) {
          text = part.text;
        }
      }
    }
    
    if (!imageUrl) {
        throw new Error("The AI did not return an image. It may have refused the request. Please try a different prompt.");
    }

    return { imageUrl, text };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while communicating with the Gemini API.");
  }
};