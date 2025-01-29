import { config } from 'dotenv';
config();

const API_KEY = process.env.NINJA_API_KEY;
const API_URL = process.env.NINJA_API_URL;

if (!API_KEY) {
    throw new Error('API key is not defined');
}

if (!API_URL) {
    throw new Error('API URL is not defined');
}

function getSynonyms(word: string): Promise<string[]> {
    const link = `${API_URL}?word=${word}`;
    const headers: Record<string, string> = { 'X-API-Key': API_KEY as string };

    return fetch(link, { headers })
        .then((response) => {
            if (!response.ok) {
                console.log('Response:', response);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            return data.synonyms;
        });
}

function test() {
    const word = "accost";
    console.log("Word:", word);
    getSynonyms(word)
        .then((synonyms) => {
            console.log("Synonyms:", synonyms);
        })
        .catch((error) => {
            console.error('Error in test:', error instanceof Error ? error.message : error);
        });
}

test()