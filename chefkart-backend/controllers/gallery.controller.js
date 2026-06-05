
const Gallery = require("../models/Gallery.Model");
const cloudinary = require("../config/cloudinary");

// ================= CREATE GALLERY =================

const createGallery = async (req, res) => {
  try {
    const { name, content } = req.body;

    // validation
    if (!name || !content || !req.file) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newGallery = await Gallery.create({
      name,
      content,
      galleryImage: req.file.path,
      public_id: req.file.filename,
    });

    res.status(201).json({
      message: "Gallery created successfully",
      gallery: newGallery,
    });
  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ================= GET ALL GALLERY =================

const getAllGallery = async (req, res) => {
  try {
    const galleries = await Gallery.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      message: "Gallery fetched successfully",
      data: galleries,
    });
  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ================= DELETE GALLERY =================

const deleteGallery = async (req, res) => {
  try {
    const { id } = req.params;

    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return res.status(404).json({
        message: "Gallery not found",
      });
    }

    // delete image from cloudinary
    if (gallery.public_id) {
      await cloudinary.uploader.destroy(gallery.public_id);
    }

    // delete from mongodb
    await Gallery.findByIdAndDelete(id);

    res.status(200).json({
      message: "Gallery deleted successfully",
    });
  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  createGallery,
  getAllGallery,
  deleteGallery,
};