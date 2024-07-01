import { pool } from "../config/pgdb.js";


export const bookModel = async () => {
    try {
        
        const query = `
        CREATE TABLE IF NOT EXISTS books (
            uuid UUID PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            author_id UUID,
            FOREIGN KEY (author_id) REFERENCES authors(uuid) ON DELETE SET NULL,
            genre_id UUID,
            FOREIGN KEY (genre_id) REFERENCES genres(uuid) ON DELETE SET NULL,
            price DECIMAL(10, 2) NOT NULL,
            stock INTEGER NOT NULL,
            published_date DATE,
            status VARCHAR(20) CHECK (status IN ('available', 'out of stock', 'discontinued')),
            image_urls TEXT[],
            description TEXT,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
        );
        `

        await pool.query(query);
        console.log('Book table yaratildi...')

    } catch (e) {
        throw e
    }
}