import { promisePool } from "../dbPool.js";
import { redisClient } from "../redisPool.js";
import logger from "../utils/logger.js";
/**
 * get all products
 * @returns
 */
export const getProducts = async () => {
    try {
        const products = await redisClient.get("products");
        if (products) {
            logger.info("products from redis");
            return JSON.parse(products);
        }
        const [rows] = await promisePool.query("select * from products");
        redisClient.set("products", JSON.stringify(rows), {
            expiration: {
                type: "EX",
                value: 60,
            },
        });
        return rows;
    } catch (e) {
        return e;
    }
};

export const get = async (id) => {
    try {
        const [rows] = await promisePool.query("select * from products where product_id = ?", id);
        return rows?.[0] ?? null;
    } catch (e) {
        return e;
    }
};

export const insert = async (products) => {
    const { name, description, price, stock_quantity, category_id } = products;
    try {
        const [result] = await promisePool.query("INSERT INTO products (name, description, price, stock_quantity, category_id) VALUES (?, ?, ?, ?, ?)", [name, description, price, stock_quantity, category_id]);
        return result.insertId;
    } catch (e) {
        return e;
    }
};

export const update = async (products) => {
    const { id, name, description, price, stock_quantity, category_id } = products;
    try {
        const [result] = await promisePool.query("UPDATE products SET name = ?, description = ?, price = ?, stock_quantity = ?, category_id = ? WHERE product_id = ?", [name, description, price, stock_quantity, category_id, id]);
        return result.affectedRows;
    } catch (e) {
        return e;
    }
};

export const deleteById = async (id) => {
    try {
        const [result] = await promisePool.query("DELETE FROM products WHERE product_id = ?", [id]);
        return result.affectedRows;
    } catch (err) {
        return err;
    }
};
