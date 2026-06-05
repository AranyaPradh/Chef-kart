const express = require("express");
const router = express.Router();

const {
  createOrder,
  verifyPayment,
  getPaymentDetails,
  getPaymentByBooking,
} = require("../controllers/payment.controller");

const authMiddleware = require("../middlewares/auth.middleware");

// CREATE ORDER
router.post(
  "/create-order",
  authMiddleware,
  createOrder
);

// VERIFY PAYMENT
router.post(
  "/verify-payment",
  authMiddleware,
  verifyPayment
);

// GET PAYMENT DETAILS BY PAYMENT ID
router.get(
  "/:paymentId",
  authMiddleware,
  getPaymentDetails
);

// GET PAYMENT DETAILS BY BOOKING ID
router.get(
  "/booking/:bookingId",
  authMiddleware,
  getPaymentByBooking
);

module.exports = router;