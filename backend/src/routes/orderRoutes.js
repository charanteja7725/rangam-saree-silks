import express from "express";
import {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  getAdminStats // ✅ ADD THIS
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Create Order
router.post("/", protect, createOrder);

// ✅ Get logged-in user's orders
router.get("/my", protect, getUserOrders);

// ✅ Admin - Get all orders
router.get("/all", protect, getAllOrders);

// ✅ Update order status (Admin)
router.put("/:id", protect, updateOrderStatus);

// ✅ NEW: Admin Dashboard Stats (Day 14)
router.get("/stats", protect, getAdminStats);

export default router;