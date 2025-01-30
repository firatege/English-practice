import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "dotenv";

config();

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    throw new Error('API key is not defined');
}

const genAI = new GoogleGenerativeAI(API_KEY);

async function generateAIResponse(prompt: string) {
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: "Give 50 words about the user prompt in JSON format. Just words.",
    });

    const result = await model.generateContent({
        contents: [
            {
                role: 'user',
                parts: [
                    {
                        text: prompt,
                    }
                ],
            }
        ],
        generationConfig: {
            maxOutputTokens: 1000,
            temperature: 0.1,
        }
    });

    const words = result.response.text().split(/\s+/).filter(word => word.length > 0);
    return {
        prompt: prompt,
        words: words
    };
}

export async function main_ai(prompt: string | undefined) {
    if (!prompt) {
        throw new Error('Prompt is not defined');
    }
    try {
        const response = await generateAIResponse(prompt);
        console.log(JSON.stringify(response, null, 2));
    } catch (error) {
        console.error('Error generating AI response:', error instanceof Error ? error.message : error);
    }
    return prompt;
}

export default main_ai;