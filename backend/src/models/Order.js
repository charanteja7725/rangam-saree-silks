import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  items: [
    {
      name: String,
      price: Number,
      image: String,
      quantity: Number
    }
  ],
  totalPrice: Number,
  address: String,
  city: String,
  pincode: String,
  phone: String
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);