
let word = "hallow"
let link = `https://dictionary.yandex.net/dicservice.json/queryCorpus?srv=tr-text&ui=tr&src=${word}&lang=en-tr&flags=1063&chunks=1&maxlen=200&v=2`

try {
    const response = await fetch(link);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data.result.examples);
}
catch (error) {
    console.error('Error fetching movie quotes:', error instanceof Error ? error.message : error);
    throw error;
}

