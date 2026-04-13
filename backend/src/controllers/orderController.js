import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const order = await Order.create({
      ...req.body,
      user: req.user._id   // 👈 important
    });

    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};