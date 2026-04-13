import express from "express"; // ✅ ADD THIS

import {
  createProduct,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct
} from "../controllers/productController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Public routes
router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin routes
router.post("/", protect, adminOnly, upload.single("image"), createProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);
router.put("/:id", protect, adminOnly, upload.single("image"), updateProduct);

export default router;