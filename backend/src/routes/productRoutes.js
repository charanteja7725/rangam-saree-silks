import express from "express";
import {
  createProduct,
  getProducts,
  getProductById
} from "../controllers/productController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Public routes
router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin route
router.post("/", protect, adminOnly, upload.single("image"), createProduct);

export default router;