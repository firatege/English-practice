import readline from 'readline';
import { main_ai } from '../ai/connect';
import { main_scrape } from '../scrape/yandex';
import { main_examples } from '../scrape/examples';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Please enter your favorite topic: ', async (answer) => {
    console.log(`User input: ${answer}`);
    try {
        const result = await main_ai(answer);
        console.log(JSON.stringify(result, null, 2));
    } catch (error) {
        console.error('Error processing AI response:', error instanceof Error ? error.message : error);
    } finally {
        rl.close();
    }
});

rl.on('close', () => {
    process.exit(0);
});