// routes/chef.routes.js

const express = require("express");

const router = express.Router();

const {
  createChef,
  getAllChef,
  getById,
  updateChef,
  deleteChefById,
  deleteAllChef,
} = require("../controllers/chefs.controller");

const { upload } = require("../config/cloudinary");

// ================= CREATE CHEF =================

router.post(
  "/create",
  upload.single("profilePic"),
  createChef
);

// ================= GET ALL CHEFS =================

router.get("/", getAllChef);

// ================= GET CHEF BY ID =================

router.get("/:id", getById);

// ================= UPDATE CHEF =================

router.put(
  "/:id",
  upload.single("profilepic"),
  updateChef
);

// ================= DELETE CHEF BY ID =================

router.delete("/:id", deleteChefById);

// ================= DELETE ALL CHEFS =================

router.delete("/", deleteAllChef);

module.exports = router;