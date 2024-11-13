import { mysqlPool } from "../mysqlPool.js";
/**
 * get all product
 * @returns
 */
export const listAllProduct = async () => {
    try {
        const [rows] = await mysqlPool.query("select * from product");
        return rows;
    } catch (e) {
        return e;
    }
};

export const getProductById = async (id) => {
    try {
        const [rows] = await mysqlPool.query(
            "select * from product where product_id = ?",
            id,
        );
        return rows?.[0] ?? null;
    } catch (e) {
        return e;
    }
};

export const insertProduct = async (product) => {
    const { name, description, price, stock_quantity, category_id } = product;
    try {
        const [result] = await mysqlPool.query(
            "INSERT INTO product (name, description, price, stock_quantity, category_id) VALUES (?, ?, ?, ?, ?)",
            [name, description, price, stock_quantity, category_id],
        );
        return result.insertId;
    } catch (e) {
        return e;
    }
};

export const updateProduct = async (product) => {
    const { id, name, description, price, stock_quantity, category_id } =
        product;
    try {
        const [result] = await mysqlPool.query(
            "UPDATE product SET name = ?, description = ?, price = ?, stock_quantity = ?, category_id = ? WHERE product_id = ?",
            [name, description, price, stock_quantity, category_id, id],
        );
        return result.affectedRows;
    } catch (e) {
        return e;
    }
};

export const deleteProductById = async (id) => {
    try {
        const [result] = await mysqlPool.query(
            "DELETE FROM product WHERE product_id = ?",
            [id],
        );
        return result.affectedRows;
    } catch (err) {
        return err;
    }
};
