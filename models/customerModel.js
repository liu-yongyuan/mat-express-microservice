import { mysqlPool } from "../mysqlPool.js";
import { redisClient } from "../redisClient.js";

export const getCustomerByEmail = async (email) => {
    try {
        const redisKey = `r_customer_email_${email}`;
        const data = await redisClient.get(redisKey);
        if (data) {
            return JSON.parse(data);
        }
        const [rows] = await mysqlPool.query("select * from customer where email =?", [email]);
        if (rows.length <= 0) {
            return null;
        }
        const customer = rows[0];
        await redisClient.set(redisKey, JSON.stringify(customer));
        return rows[0];
    } catch (e) {
        return e;
    }
};

export const insertCustomer = async (customerData) => {
    const { first_name, last_name, email, password, phone, address, city, postal_code, country } = customerData;
    const [result] = await mysqlPool.execute(
        `INSERT INTO customer (first_name, last_name, email, password, phone, address, city, postal_code, country)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [first_name, last_name, email, password, phone, address, city, postal_code, country],
    );
    return result.insertId;
};
