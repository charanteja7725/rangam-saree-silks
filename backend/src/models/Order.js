import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    items: [
      {
        name: String,
        price: Number,
        image: String,
        quantity: Number
      }
    ],

    totalAmount: {
      type: Number,
      required: true
    },

    address: {
      type: String,
      required: true
    },

    city: {
      type: String,
      required: true
    },

    pincode: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    // ✅ FIXED STATUS
    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered"],
      default: "Pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);