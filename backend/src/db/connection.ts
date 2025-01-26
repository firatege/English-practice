import { connect } from 'ts-postgres'
import { config } from 'dotenv'
config()

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

export default main