import { pool } from "../config/pgdb.js";


export const authorModel = async () => {
    try {
        
        const query = `
        CREATE TABLE IF NOT EXISTS authors (
            uuid UUID PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            bio VARCHAR(200),
            birthdate DATE,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
        );
        `

        await pool.query(query);
        console.log('Author table yaratildi...');

    } catch (e) {
        throw e
    }
}