// routes/booking.routes.js

const express = require("express");

const router = express.Router();

const {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBookingById,
  deleteAllBookings,
} = require("../controllers/booking.controller");

// auth middleware
const verifyToken = require("../middlewares/auth.middleware");

// ================= CREATE BOOKING =================

router.post(
  "/create",
  verifyToken,
  createBooking
);

// ================= GET ALL BOOKINGS =================

router.get("/", getBookings);

// ================= GET BOOKING BY ID =================

router.get("/:id", getBookingById);

// ================= UPDATE BOOKING =================

router.put(
  "/:id",
  verifyToken,
  updateBooking
);

// ================= DELETE BOOKING BY ID =================

router.delete(
  "/:id",
  verifyToken,
  deleteBookingById
);

// ================= DELETE ALL BOOKINGS =================

router.delete(
  "/",
  verifyToken,
  deleteAllBookings
);

module.exports = router;