import { pool } from "../config/pgdb.js";

export const orderModel = async () => {
    try {
        
        const query = `
        CREATE TABLE IF NOT EXISTS orders (
            uuid UUID PRIMARY KEY,
            user_id UUID NOT NULL,
            items JSONB NOT NULL,
            total_price DECIMAL(10, 2) NOT NULL,
            status VARCHAR(20) CHECK (status IN ('pending', 'completed', 'canceled')) DEFAULT 'pending',
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
        );
        `;

        await pool.query(query);
        console.log('Order table yaratildi...');

    } catch (e) {
        throw e;
    }
}