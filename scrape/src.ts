interface MovieQuote {
    title: string;
    phrase: string;
    time: number;
}

interface ApiResponse {
    docs: {
        title: string;
        phrase: string;
        time: string;
    }[];
}

async function fetchMovieQuotes(word: string): Promise<MovieQuote[]> {
    const apiUrl = `https://api.quodb.com/search/${word}?advance-search=true&keywords=${word}&titles_per_page=10000`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: ApiResponse = await response.json();

        // Transform the API response into the desired format
        return data.docs.map((doc) => ({
            title: doc.title,
            phrase: doc.phrase,
            time: Number(doc.time) / 6000, // Convert time to minutes
        }));
    } catch (error) {
        console.error('Error fetching movie quotes:', error instanceof Error ? error.message : error);
        throw error;
    }
}

async function main() {
    const word = "hallow";
    try {
        const movieQuotes = await fetchMovieQuotes(word);
        console.log("Movie quotes length:", movieQuotes.length);
        console.log("Movie quotes:", movieQuotes);
    } catch (error) {
        console.error('Error in main:', error instanceof Error ? error.message : error);
    }
}

// Run the main function
main();