import { mysqlPool } from "../mysqlPool.js";

export const countProductOwnership = async (productId, customerId) => {
    const [rows] = await mysqlPool.query("SELECT COUNT(*) AS count FROM product_ownership WHERE product_id = ? AND customer_id = ?", [productId, customerId]);
    const { count } = rows[0];
    return count;
};

export const isProductOwnership = async (productId, customerId) => {
    const count = await countProductOwnership(productId, customerId);
    return count > 0;
};

export const notProductOwnership = async (productId, customerId) => {
    const result = await isProductOwnership(productId, customerId);
    return !result;
};

export const listByProductId = async (productId, customerId) => {
    const [rows] = await mysqlPool.query("SELECT * FROM product_ownership WHERE product_id = ? AND customer_id = ?", [productId, customerId]);
    return rows;
};

export const insertProductOwnership = async (productId, customerId) => {
    const [result] = await mysqlPool.query("insert into product_ownership(product_id,customer_id) values (?,?)", [productId, customerId]);
    return result.insertId;
};

export const deleteProducOwnership = async (productId, customerId) => {
    const [result] = await mysqlPool.query("delete from product_ownership where product_id = ? and customer_id = ?", [productId, customerId]);
    return result.affectedRows;
};
