const Testimonial = require("../models/Testimonial.Model");
const { cloudinary } = require("../config/cloudinary");


// Create Testimonial
const createTestimonial = async (req, res) => {
  try {
    const { name, content } = req.body;

    if (!name || !content) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    const newTestimonial = new Testimonial({
      name,
      content,
      profileImage: req.file ? req.file.path : "",
    });

    await newTestimonial.save();

    res.status(201).json({
      message: "Testimonial created successfully",
      data: newTestimonial,
    });
  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};


// Get All Testimonials
const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find()
      .sort({ createdAt: -1 });

    if (!testimonials.length) {
      return res.status(404).json({
        message: "No testimonials found",
      });
    }

    res.status(200).json({
      message: "Testimonials fetched successfully",
      data: testimonials,
    });
  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};


// Get Single Testimonial
const getTestimonialById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        message: "Invalid testimonial ID format",
      });
    }

    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return res.status(404).json({
        message: "Testimonial not found",
      });
    }

    res.status(200).json({
      message: "Testimonial fetched successfully",
      data: testimonial,
    });
  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};


// Update Testimonial
const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, content } = req.body;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        message: "Invalid testimonial ID format",
      });
    }

    const existingTestimonial = await Testimonial.findById(id);

    if (!existingTestimonial) {
      return res.status(404).json({
        message: "Testimonial not found",
      });
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      id,
      {
        name,
        content,
        profileimage: req.file
          ? req.file.path
          : existingTestimonial.profileimage,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Testimonial updated successfully",
      data: updatedTestimonial,
    });
  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};


// Delete Testimonial
const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        message: "Invalid testimonial ID format",
      });
    }

    const existingTestimonial = await Testimonial.findById(id);

    if (!existingTestimonial) {
      return res.status(404).json({
        message: "Testimonial not found",
      });
    }

    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

    res.status(200).json({
      message: "Testimonial deleted successfully",
      data: deletedTestimonial,
    });
  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};


module.exports = {
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
};

