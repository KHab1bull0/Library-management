import { pool } from "../config/pgdb.js";


export const refreshModel = async () => {
    try{
        const query = `
        CREATE TABLE IF NOT EXISTS refreshtoken(
            uuid VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL,
            token VARCHAR(255) NOT NULL
        );
        `

        await pool.query(query);

        console.log("Refreshtoken table yaratildi...");

    } catch(e){
        throw e
    }
}