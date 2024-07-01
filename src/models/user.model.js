import { pool } from "../config/pgdb.js";


export const userTable = async () => {
    try {

        const query = `
        CREATE TABLE IF NOT EXISTS users(
            uuid UUID PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(30) CHECK (role IN ('user', 'admin', 'superadmin')) DEFAULT 'user',
            status VARCHAR(40) CHECK (status IN ('active', 'inactive')) DEFAULT 'inactive',
            createdAt TIMESTAMPTZ DEFAULT NOW(),
            updatedAt TIMESTAMPTZ DEFAULT NOW()
        );
        `;

        const res = await pool.query(query);
        console.log("User table created...");

    } catch (e) {
        throw e;
    };
}