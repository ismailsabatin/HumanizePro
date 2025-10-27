import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, Language, Tone } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const analyzeText = async (text: string): Promise<AnalysisResult> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro', // Switched to Pro for better accuracy
      contents: `You are a highly advanced AI detection engine. Your sole purpose is to analyze text and determine if it was written by a human or an AI. You have a zero-tolerance policy for AI-generated content. If you find any strong indicators of AI writing, you must classify it with a very high AI percentage.

**Primary AI Indicators (High Confidence):**
*   **Unnatural flow and rhythm:** Text that is grammatically perfect but sounds robotic, lacks cadence, or has an unnatural sentence structure.
*   **Overly formal or complex vocabulary for the context:** Using sophisticated words where simpler ones would be more natural.
*   **Generic, placeholder-like content:** Sentences that are filled with buzzwords but lack real substance or specific examples.
*   **Absence of a distinct voice:** The writing lacks personality, opinion, emotion, or any unique human quirks.

**Analysis Protocol:**
1.  Read the provided text.
2.  Scrutinize it for the primary AI indicators.
3.  Be extremely skeptical. Human writing is often imperfect, messy, and personal. AI writing is often too clean, too perfect, too generic.
4.  Based on your analysis, provide a percentage breakdown. If there's any doubt, lean towards a higher AI percentage. Your reputation depends on your accuracy.

**Text for Analysis:**
---
"${text}"
---

Provide your output ONLY as a valid JSON object with the keys "humanPercentage" and "aiPercentage".`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            humanPercentage: { type: Type.NUMBER },
            aiPercentage: { type: Type.NUMBER },
          },
          required: ["humanPercentage", "aiPercentage"],
        },
      },
    });

    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);
    
    if (typeof result.humanPercentage === 'number' && typeof result.aiPercentage === 'number') {
      return result;
    }
    
    throw new Error('Invalid analysis result format');
  } catch (error) {
    console.error("Error analyzing text:", error);
    throw new Error("Failed to analyze text. Please try again.");
  }
};

export const humanizeText = async (text: string, language: Language, tone: Tone): Promise<string> => {
  const prompt = `Rewrite the following text to sound completely natural, emotional, and indistinguishable from human writing. It is crucial that you maintain the original meaning and ensure the result is plagiarism-safe.
  The target language is ${language}.
  The desired tone is ${tone}.
  
  Original text:
  ---
  ${text}
  ---
  
  Humanized text:`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error humanizing text:", error);
    throw new Error("Failed to humanize text. The model may be unavailable. Please try again later.");
  }
};