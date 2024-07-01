import { pool } from "../config/pgdb.js";
import { sendOtptoEmail } from "../utils/email.js";
import { hashPassword } from "../utils/hash.js";
import { getOne, insertMany } from "./universal.service.js";
import otpgen from 'otp-generator';
import { v4 as uuidv4 } from 'uuid'




export const userRegister = async (body) => {
    try {

        let result = {}
        const { email, username, password, role } = body;

        // Option 1
        // const query0 = await getOne('users', 'email', email);
        // if (query0.length) {
        //     return result = {
        //         user: "User already exists"
        //     }
        // };  


        // Option 2
        const query1 = 'SELECT * FROM users WHERE email = $1;';
        const existsEmail = await pool.query(query1, [email]);
        if (existsEmail.rows.length) {
            return result = {
                user: "Email already exists"
            }
        };  
        
        const query2 = 'SELECT * FROM users WHERE username = $1;'
        const existsUsername = await pool.query(query2, [username]);
        if(existsUsername.rows.length){
            return result = {
                user: "Username already exists"
            }
        }

        const hashedpassword = await hashPassword(password);
        const uuid = uuidv4();
        const otp = otpgen.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
        
        await insertMany('userotps', ['uuid','otp'], [uuid, otp]);
        
        
        if (!role) {
            const result = await insertMany('users', ['uuid', 'email', 'username', 'password'], [uuid, email, username, hashedpassword]);
        } else {
            const result = await insertMany('users', ['uuid', 'email', 'username', 'password', 'role'], [uuid, email, username, hashedpassword, role]);
        }
        
        const emailres = await sendOtptoEmail(otp, email);
        return result = {
            uuid: uuid,
            emailres: true
        }

    } catch (e) {
        throw e
    }
}