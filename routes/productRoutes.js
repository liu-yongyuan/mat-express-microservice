import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { deleteProduct, getById, insert, listAll, updateProductById } from "../controllers/productController.js";
import { productOwnershipCheckMiddleware } from "../middleware/productMiddleware.js";

const router = express.Router();

const baseUrl = process.env.API_BASEURL;

// Route to get all products
router.get(`${baseUrl}/product`, listAll);

// Route to get a single product by ID
router.get(`${baseUrl}/product/:id`, getById);

// Route to insert an product
router.post(`${baseUrl}/product`, authMiddleware, insert);

// Route to update an existing product
router.put(`${baseUrl}/product/:id`, authMiddleware, productOwnershipCheckMiddleware, updateProductById);

// Route to delete a product
router.delete(`${baseUrl}/product/:id`, authMiddleware, productOwnershipCheckMiddleware, deleteProduct);

export default router;
