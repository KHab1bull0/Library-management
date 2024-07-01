import { pool } from "../config/pgdb.js"


export const otpmodel = async (body) => {
    try{
        const query = `
        CREATE TABLE IF NOT EXISTS userotps(
            uuid VARCHAR(100) NOT NULL, 
            otp VARCHAR(6) NOT NULL
        );
        `

        await pool.query(query);

        console.log("Otp table yaratildi...");

    } catch(e){
        throw e
    }
}