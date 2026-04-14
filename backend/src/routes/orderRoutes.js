import express from "express";
import {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus   // ✅ ADD THIS
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Create Order
router.post("/", protect, createOrder);

// ✅ Get logged-in user's orders
router.get("/my", protect, getUserOrders);

// ✅ Admin - Get all orders
router.get("/all", protect, getAllOrders);

// ✅ NEW: Update order status
router.put("/:id", protect, updateOrderStatus);

export default router;