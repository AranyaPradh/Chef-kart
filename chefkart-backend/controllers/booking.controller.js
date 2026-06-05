
const Booking = require("../models/booking.model");
const mongoose = require("mongoose");

// ================= CREATE BOOKING =================

const createBooking = async (req, res) => {
  try {
    // check authenticated user
    if (!req.user || !req.user.userId) {
      return res.status(403).json({
        message: "Unauthorized: Invalid token",
      });
    }

    const { chef, bookingDate, notes } = req.body;

    // validation
    if (!chef || !bookingDate) {
      return res.status(400).json({
        message: "Chef and booking date are required",
      });
    }

    // create booking
    const newBooking = await Booking.create({
      user: req.user.userId,
      chef,
      bookingDate,
      notes,
      status: "pending",
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Booking Error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ================= GET ALL BOOKINGS =================

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user")
      .populate("chef")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      message: "Bookings fetched successfully",
      data: bookings,
    });
  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ================= GET BOOKING BY ID =================

const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    // validate object id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid booking ID",
      });
    }

    const booking = await Booking.findById(id)
      .populate("user")
      .populate("chef");

    // check booking exists
    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.status(200).json({
      message: "Booking fetched successfully",
      data: booking,
    });
  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ================= UPDATE BOOKING =================

const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      chef,
      bookingDate,
      status,
      notes,
    } = req.body;

    // validate object id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid booking ID",
      });
    }

    // check booking exists
    const existingBooking =
      await Booking.findById(id);

    if (!existingBooking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // update booking
    const updatedBooking =
      await Booking.findByIdAndUpdate(
        id,
        {
          chef,
          bookingDate,
          status,
          notes,
        },
        {
          new: true,
        }
      );

    res.status(200).json({
      message: "Booking updated successfully",
      data: updatedBooking,
    });
  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ================= DELETE BOOKING BY ID =================

const deleteBookingById = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    // validate object id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid booking ID",
      });
    }

    // check booking exists
    const existingBooking =
      await Booking.findById(id);

    if (!existingBooking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // delete booking
    await Booking.findByIdAndDelete(id);

    res.status(200).json({
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ================= DELETE ALL BOOKINGS =================

const deleteAllBookings = async (
  req,
  res
) => {
  try {
    await Booking.deleteMany();

    res.status(200).json({
      message:
        "All bookings deleted successfully",
    });
  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBookingById,
  deleteAllBookings,
};