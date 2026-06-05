const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "INR",
    },

    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },

    gateway: {
      type: String,
      enum: ["razorpay", "cashfree", "stripe"],
      required: true,
    },

    gatewayOrderId: {
      type: String,
    },

    gatewayPaymentId: {
      type: String,
    },

    transactionId: {
      type: String,
      unique: true,
      sparse: true,
    },

    paymentMethod: {
      type: String,
      enum: ["card", "upi", "netbanking", "wallet", "cash"],
    },

    failureReason: {
      type: String,
    },

    paidAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", PaymentSchema);