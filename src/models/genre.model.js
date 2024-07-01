import { pool } from "../config/pgdb.js"



export const genreModel = async () => {
    try {
        
        const query = `
        CREATE TABLE IF NOT EXISTS genres (
            uuid UUID PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            description VARCHAR(255),
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
        );
        `

        await pool.query(query);
        console.log('Genre table yaratildi...')

    } catch (e) {
        throw e
    }
}