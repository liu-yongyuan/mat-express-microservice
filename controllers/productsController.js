import { deleteProducOwnership, insertProductOwnership } from "../models/productOwnershipModel.js";
import {
    deleteById,
    get,
    getProducts,
    insert,
    update,
} from "../models/productsModel.js";
import { schemas, validate } from "../utils/validator.js";

export const getAllProducts = async (req, res) => {
    try {
        const rows = await getProducts();
        res.json(rows);
    } catch (e) {
        console.error(e);
        res.sendStatus(500).json({ error: "Database query failed" });
    }
};

export const getProductsById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await get(id);
        if (Object.is(data, null)) {
            return res.sendStatus(404).json({ error: "Product not found" });
        }
        res.json(data);
    } catch (e) {
        console.error(e);
        res.sendStatus(500).json({ error: "Database query failed" });
    }
};

export const insertProductsAndGetId = async (req, res) => {
    try {
        const errors = validate(req.body, schemas.products);
        if (errors) {
            return res.status(400).json({ errors }); // Send validation errors as response
        }

        const productId = await insert(req.body);
        await insertProductOwnership(productId, req.user.customer_id)
        res.status(201).json({
            message: "Product added successfully",
            productId,
        });
    } catch (e) {
        console.error(e);
        res.sendStatus(500).json({ error: "Database query failed" });
    }
};

export const updateProductsById = async (req, res) => {
    try {
        const { id } = req.params;
        const products = Object.assign({ product_id:id }, req.body);
        await update(products);
        res.json({ message: "Product updated successfully" });
    } catch (e) {
        console.error(err);
        res.status(500).json({ error: "Database query failed" });
    }
};

export const deleteProducstById = async (req, res) => {
    try {
        const { id } = req.params;

        const count = await deleteById(id);
        if (Object.is(count, 0)) {
            return res.status(404).json({ error: "Product not found" });
        }
        await deleteProducOwnership(id, req.user.customer_id);
        res.json({ message: "Product deleted successfully" });
    } catch (e) {
        console.error(err);
        res.status(500).json({ error: "Database query failed" });
    }
};
