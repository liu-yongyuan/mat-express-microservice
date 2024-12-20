import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
    listAllProduct,
    getProductById,
    insert,
    updateProduct,
    deleteProductById,
    search,
    rebuildIndex,
} from "../controllers/productController.js";
import { productOwnershipCheckMiddleware } from "../middleware/productMiddleware.js";

const router = express.Router();

const baseUrl = process.env.API_BASEURL;

// Route to get all products
router.get(`${baseUrl}/product`, listAllProduct);

// Route to get a single product by ID
router.get(`${baseUrl}/product/:id`, getProductById);

// search by keywords
router.get(`${baseUrl}/products`, search);

// Route to insert an product
router.post(`${baseUrl}/product`, authMiddleware, insert);

// Route to update an existing product
router.put(`${baseUrl}/product/:id`, authMiddleware, productOwnershipCheckMiddleware, updateProduct);

// Route to delete a product
router.delete(`${baseUrl}/product/:id`, authMiddleware, productOwnershipCheckMiddleware, deleteProductById);

router.post(`${baseUrl}/post/rebuildIndex`, rebuildIndex);

export default router;
