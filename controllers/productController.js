import { listAll, getById, addProduct, updateProductById, deleteProduct } from "../services/productService.js";
import { schemas, validate } from "../utils/validator.js";
import logger from "../utils/logger.js";

export const listAllProduct = async (req, res) => {
    try {
        const rows = await listAll();
        res.json(rows);
    } catch (e) {
        logger.error(e);
        res.sendStatus(500).json({ error: "Database query failed" });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await getById(id);
        if (Object.is(data, null)) {
            return res.sendStatus(404).json({ error: "Product not found" });
        }
        res.json(data);
    } catch (e) {
        logger.error(e);
        res.sendStatus(500).json({ error: "Database query failed" });
    }
};

export const insert = async (req, res) => {
    try {
        const errors = validate(req.body, schemas.products);
        if (errors) {
            return res.status(400).json({ errors }); // Send validation errors as response
        }
        const productId = await addProduct(req.body, req.user.customer_id);
        res.status(201).json({
            message: "Product added successfully",
            productId,
        });
    } catch (e) {
        logger.error(e);
        res.sendStatus(500).json({ error: "Database query failed" });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const products = Object.assign({ product_id: id }, req.body);
        await updateProductById(products);
        res.json({ message: "Product updated successfully" });
    } catch (e) {
        logger.error(e);
        res.status(500).json({ error: "Database query failed" });
    }
};

export const deleteProductById = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteProduct(id, req.user.customer_id);
        res.json({ message: "Product deleted successfully" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Database query failed" });
    }
};
