// routes/gallery.routes.js

const express = require("express");

const router = express.Router();
const { upload } = require("../config/cloudinary");

const {
  createGallery,
  getAllGallery,
  deleteGallery,
} = require("../controllers/gallery.controller");


// create gallery
router.post(
  "/create",
  upload.single("galleryImage"),
  createGallery
);

router.get("/", getAllGallery);
router.delete("/:id", deleteGallery);

module.exports = router;