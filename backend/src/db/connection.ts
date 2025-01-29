import { connect } from 'ts-postgres'
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config();

async function main() {
    const client = await connect({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    })

    try {
        const result = await client.query('SELECT $1::text as message', ['DB is connected'])
        console.log(result.rows[0])
        return client
    }
    catch (error) {
        console.error('Error:', error instanceof Error ? error.message : error)
    }
}

async function test() {
    try {
        await main()
    }
    catch (error) {
        console.error('Error in test:', error instanceof Error ? error.message : error)
    }
}

test()

export default main