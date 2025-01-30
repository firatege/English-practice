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
        systemInstruction: " give 50 words about the user prompt with json format. Just words ",
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

    return result.response.text();
}

export async function main(prompt: string | undefined ) {
    if (!prompt) {
        throw new Error('Prompt is not defined');
    }
    try {
        const response = await generateAIResponse(prompt);
        console.log(response);
    } catch (error) {
        console.error('Error generating AI response:', error instanceof Error ? error.message : error);
    }
}


export default main;

