// controllers/carousel.controller.js

const Carousel = require("../models/Carousel.Model");
const cloudinary = require("../config/cloudinary");
const mongoose = require("mongoose");

// ================= CREATE CAROUSEL =================

const createCarousel = async (req, res) => {
  try {
    const { title, content, action } = req.body;

    // validation
    if (!title || !content || !action || !req.file) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    const newCarousel = await Carousel.create({
      title,
      content,
      action,
      image: req.file.path,
      public_id: req.file.filename,
    });

    res.status(201).json({
      message: "Carousel created successfully",
      data: newCarousel,
    });
  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ================= GET ALL CAROUSEL =================

const getAllCarousel = async (req, res) => {
  try {
    const carousels = await Carousel.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      message: "Carousel fetched successfully",
      data: carousels,
    });
  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ================= GET SINGLE CAROUSEL =================

const getCarouselById = async (req, res) => {
  try {
    const { id } = req.params;

    // validate mongo id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid carousel ID",
      });
    }

    const carousel = await Carousel.findById(id);

    if (!carousel) {
      return res.status(404).json({
        message: "Carousel not found",
      });
    }

    res.status(200).json({
      message: "Carousel fetched successfully",
      data: carousel,
    });
  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ================= UPDATE CAROUSEL =================

const updateCarousel = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, content, action } = req.body;

    // validate mongo id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid carousel ID",
      });
    }

    // find existing carousel
    const existingCarousel = await Carousel.findById(id);

    if (!existingCarousel) {
      return res.status(404).json({
        message: "Carousel not found",
      });
    }

    let imageUrl = existingCarousel.image;
    let public_id = existingCarousel.public_id;

    // if new image uploaded
    if (req.file) {
      // delete old cloudinary image
      if (existingCarousel.public_id) {
        await cloudinary.uploader.destroy(
          existingCarousel.public_id
        );
      }

      imageUrl = req.file.path;
      public_id = req.file.filename;
    }

    // update data
    const updatedCarousel = await Carousel.findByIdAndUpdate(
      id,
      {
        title,
        content,
        action,
        image: imageUrl,
        public_id,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Carousel updated successfully",
      data: updatedCarousel,
    });
  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ================= DELETE SINGLE CAROUSEL =================

const deleteCarouselById = async (req, res) => {
  try {
    const { id } = req.params;

    // validate mongo id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid carousel ID",
      });
    }

    const existingCarousel = await Carousel.findById(id);

    if (!existingCarousel) {
      return res.status(404).json({
        message: "Carousel not found",
      });
    }

    // delete image from cloudinary
    if (existingCarousel.public_id) {
      await cloudinary.uploader.destroy(
        existingCarousel.public_id
      );
    }

    // delete from mongodb
    await Carousel.findByIdAndDelete(id);

    res.status(200).json({
      message: "Carousel deleted successfully",
    });
  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ================= DELETE ALL CAROUSELS =================

const deleteAllCarousel = async (req, res) => {
  try {
    const carousels = await Carousel.find();

    // delete all cloudinary images
    for (const carousel of carousels) {
      if (carousel.public_id) {
        await cloudinary.uploader.destroy(
          carousel.public_id
        );
      }
    }

    // delete all mongodb documents
    await Carousel.deleteMany();

    res.status(200).json({
      message: "All carousels deleted successfully",
    });
  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  createCarousel,
  getAllCarousel,
  getCarouselById,
  updateCarousel,
  deleteCarouselById,
  deleteAllCarousel,
};