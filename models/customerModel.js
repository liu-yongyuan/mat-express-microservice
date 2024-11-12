import { mysqlPool } from "../mysqlPool.js";

export const getCustomerByEmail = async (email) => {
    try {
        const [rows] = await mysqlPool.query(
            "select * from customer where email =?",
            [email],
        );
        return rows.length > 0 ? rows[0] : null;
    } catch (e) {
        return e;
    }
};

export const insertCustomer = async (customerData) => {
    const { first_name, last_name, email, password, phone, address, city, postal_code, country } = customerData;
    const [result] = await mysqlPool.execute(
        `INSERT INTO customer (first_name, last_name, email, password, phone, address, city, postal_code, country)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [first_name, last_name, email, password, phone, address, city, postal_code, country]
    );
    return result.insertId;
}
