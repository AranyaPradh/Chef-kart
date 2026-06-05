// controllers/chef.controller.js

const cloudinary = require("../config/cloudinary");
const mongoose = require("mongoose");

const ChefModel = require("../models/Chef.model");

// ================= CREATE CHEF =================

const createChef = async (req, res) => {
  try {
    const {
      name,
      address,
      city,
      state,
      area,
      country,
      pincode,
      email,
      phone,
      experience,
      price,
    } = req.body;

    // validation
    if (
      !name ||
      !address ||
      !price||
      !city ||
      !state ||
      !area ||
      !country ||
      !pincode ||
      !email ||
      !phone ||
      !experience ||
      !req.file
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // check existing chef
    const existingChef = await ChefModel.findOne({
      email,
    });

    if (existingChef) {
      return res.status(400).json({
        message: "Chef already exists",
      });
    }

    // create chef
    const newChef = await ChefModel.create({
      name,
      address,
      city,
      state,
      area,
      country,
      pincode,
      email,
      phone,
      experience,
      price,
      profilePic: req.file.path,
      public_id: req.file.filename,
    });

    res.status(201).json({
      message: "Chef created successfully",
      data: newChef,
    });
  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ================= GET ALL CHEFS =================

const getAllChef = async (req, res) => {
  try {
    const chefs = await ChefModel.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      message: "Chefs fetched successfully",
      data: chefs,
    });
  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ================= GET CHEF BY ID =================

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    // validate object id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid chef ID",
      });
    }

    const chef = await ChefModel.findById(id);

    if (!chef) {
      return res.status(404).json({
        message: "Chef not found",
      });
    }

    res.status(200).json({
      message: "Chef fetched successfully",
      data: chef,
    });
  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ================= UPDATE CHEF =================

const updateChef = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      Address,
      city,
      state,
      area,
      country,
      pincode,
      email,
      phone,
      price,
      experience,
    } = req.body;

    // validate object id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid chef ID",
      });
    }

    // find chef
    const existingChef = await ChefModel.findById(id);

    if (!existingChef) {
      return res.status(404).json({
        message: "Chef not found",
      });
    }

    let imageUrl = existingChef.profilepic;
    let public_id = existingChef.public_id;

    // if new image uploaded
    if (req.file) {
      // delete old cloudinary image
      if (existingChef.public_id) {
        await cloudinary.uploader.destroy(
          existingChef.public_id
        );
      }

      imageUrl = req.file.path;
      public_id = req.file.filename;
    }

    // update chef
    const updatedChef = await ChefModel.findByIdAndUpdate(
      id,
      {
        name,
        Address,
        city,
        state,
        area,
        country,
        pincode,
        email,
        phone,
        price,
        experience,
        profilepic: imageUrl,
        public_id,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Chef updated successfully",
      data: updatedChef,
    });
  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ================= DELETE CHEF BY ID =================

const deleteChefById = async (req, res) => {
  try {
    const { id } = req.params;

    // validate object id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid chef ID",
      });
    }

    // find chef
    const existingChef = await ChefModel.findById(id);

    if (!existingChef) {
      return res.status(404).json({
        message: "Chef not found",
      });
    }

    // delete cloudinary image
    if (existingChef.public_id) {
      await cloudinary.uploader.destroy(
        existingChef.public_id
      );
    }

    // delete chef from mongodb
    await ChefModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "Chef deleted successfully",
    });
  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ================= DELETE ALL CHEFS =================

const deleteAllChef = async (req, res) => {
  try {
    const chefs = await ChefModel.find();

    // delete all cloudinary images
    for (const chef of chefs) {
      if (chef.public_id) {
        await cloudinary.uploader.destroy(
          chef.public_id
        );
      }
    }

    // delete all chefs
    await ChefModel.deleteMany();

    res.status(200).json({
      message: "All chefs deleted successfully",
    });
  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  createChef,
  getAllChef,
  getById,
  updateChef,
  deleteChefById,
  deleteAllChef,
};