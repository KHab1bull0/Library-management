import { pool } from "../config/pgdb.js"




export const getOne = async (table, column, columnElem) => {
    try {

        const query = `SELECT * FROM ${table} WHERE ${column} = $1;`
        const res = await pool.query(query, [columnElem]);
        return res.rows

    } catch (err) {
        throw err
    }
}




export const getAll = async (table) => {
    try {

        const query = `SELECT * FROM ${table}`
        const res = await pool.query(query);
        return res.rows

    } catch (err) {
        throw err
    }
}



export const putOne = async (table, putTable, newelem, column, columnElem) => {
    try {

        const query = `UPDATE ${table} SET ${putTable} = ${newelem} WHERE ${column} = '${columnElem}';`
        const res = await pool.query(query);
        return res.rows

    } catch (err) {
        throw err
    }
}

export const putMany = async (table, columns, newValue, where, whereElem) => {
    try {

        const filterData = function (arr) {
            const clearData = []
            for (let i = 0; i < arr.length; i++) {
                let str = ''
                let type = typeof arr[i];
                if (type == 'string') {

                    for (let j = 0; j < arr[i].length; j++) {
                        if (arr[i][j] !== ';') {
                            str += arr[i][j];
                        }
                    }
                    clearData.push(str)
                } else if (typeof arr[i] == 'number' || typeof arr[i] == 'boolean' || typeof arr[i] == 'object') {
                    clearData.push(arr[i]);
                };
            }

            return clearData
        }

        const generat = (columns, values) => {
            let str = ''
            if (columns.length != values.length) throw new Error("Column and values length not equal");

            str += columns[0] + " = " + "$1";

            for (let i = 0; i < columns.length; i++) {
                if (i > 0) {
                    str += ', ' + columns[i] + " = " + `$${i + 1}`;
                }
            }
            return str;
        };


        const cleardata = filterData(newValue)
        const gencolumn = generat(columns, cleardata);

        if (typeof whereElem == 'string') {
            const filterwhere = filterData([whereElem])
            whereElem = `'${filterwhere}'`
        }

        const query = `UPDATE ${table} SET ${gencolumn}  WHERE ${where} = ${whereElem} RETURNING *;`
        const res = await pool.query(query, cleardata);
        return res.rows

    } catch (err) {
        throw err
    }
}


export const insertMany = async (table, columnArr, valueArr) => {
    try {

        const replace = (arr) => {
            let str = arr[0];
            for (let i = 1; i < arr.length; i++) {
                if (i > 0) {
                    str += ", " + arr[i];
                };
            };

            return str
        };

        const genValue = (valueArr) => {

            const len = valueArr.length;
            let str = '$1'
            for (let i = 2; i <= len; i++) {
                str += ', ' + `$${i}`;
            }
            return str
        }

        const column = replace(columnArr);
        const value = genValue(valueArr);

        const query = `INSERT INTO ${table} (${column}) values (${value}) RETURNING *;`
        const res = await pool.query(query, valueArr);
        return res.rows;

    } catch (err) {
        throw err
    }
}

export const dropTable = async (table) => {
    try {

        const query = `
        DROP TABLE ${table};
        `

        const result = await pool.query(query);
        return result;

    } catch (e) {
        throw e
    }
}


export const deleteOneVarchar = async (table, column, columnElem) => {
    try {

        const query = `DELETE FROM ${table} WHERE ${column} = '${columnElem}' RETURNING *;`
        const res = await pool.query(query);
        return res.rows

    } catch (err) {
        throw err
    }
}

export const deleteOneInt = async (table, column, columnElem) => {
    try {

        const query = `DELETE FROM ${table} WHERE ${column} = ${columnElem} RETURNING *;`
        const res = await pool.query(query);
        return res.rows

    } catch (err) {
        throw err
    }
}