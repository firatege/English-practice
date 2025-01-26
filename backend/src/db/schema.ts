// Schema of the database

import main from './connection'

let user_table =  `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`

const schemas = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS words (
    word_id SERIAL PRIMARY KEY,
    word VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS user_words (
    user_id INT NOT NULL,
    word_id INT NOT NULL,
    control INT,
    count INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (word_id) REFERENCES words(word_id)
);

CREATE TABLE IF NOT EXISTS custom_words (
    word_id SERIAL PRIMARY KEY,
    word VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS sessions (
    session_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    word_id INT NOT NULL,
    start_time VARCHAR(255),
    count INT,
    control INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (word_id) REFERENCES words(word_id)
);

CREATE TABLE IF NOT EXISTS sessions_info (
    session_info_id SERIAL PRIMARY KEY,
    start_time VARCHAR(255),
    user_id INT NOT NULL,
    end_time VARCHAR(255),
    total_time FLOAT,
    count_correct INT,
    count_incorrect INT,
    count_skipped INT,
    count_total INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS users_worst_words (
    user_id INT NOT NULL,
    word_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (word_id) REFERENCES words(word_id)
);

CREATE TABLE IF NOT EXISTS report (
    report_id SERIAL PRIMARY KEY,
    sentence TEXT NOT NULL
);
`

async function createSchema() {
    const client = await main()
    if (!client) {
        throw new Error('Client not found')
    }
    try {
        await client.query(schemas)
        console.log('All tables created successfully')
    } catch (error) {
        console.error('Error creating tables:', error instanceof Error ? error.message : error)
    } finally {
        await client.end()
    }
}

createSchema().catch(console.error)