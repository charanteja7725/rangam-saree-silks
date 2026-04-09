import express from "express";
import {
  createProduct,
  getProducts,
  getProductById
} from "../controllers/productController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", protect, adminOnly, createProduct);

export default router;