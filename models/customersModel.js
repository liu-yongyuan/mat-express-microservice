import { promisePool } from "../dbPool.js";
import logger from "../utils/logger.js";
/**
 * get user by email
 * @returns
 */
export const getByEmail = async (email) => {
    try {
        const [rows] = await promisePool.query(
            "select * from customers where email =?",
            [email],
        );
        return rows.length > 0 ? rows[0] : null;
    } catch (e) {
        return e;
    }
};

export const insert = async (customerData) => {
    const { first_name, last_name, email, password, phone, address, city, postal_code, country } = customerData;
    const [result] = await promisePool.execute(
        `INSERT INTO customers (first_name, last_name, email, password, phone, address, city, postal_code, country)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [first_name, last_name, email, password, phone, address, city, postal_code, country]
    );
    return result.insertId;
}
