// routes/carousel.routes.js

const express = require("express");

const router = express.Router();

const {
  createCarousel,
  getAllCarousel,
  getCarouselById,
  updateCarousel,
  deleteCarouselById,
  deleteAllCarousel,
} = require("../controllers/carousel.controller");

const upload = require("../middlewares/multer");

// ================= CREATE CAROUSEL =================

router.post(
  "/create",
  upload.single("image"),
  createCarousel
);

// ================= GET ALL CAROUSELS =================

router.get("/", getAllCarousel);

// ================= GET SINGLE CAROUSEL =================

router.get("/:id", getCarouselById);

router.put(
  "/:id",
  upload.single("image"),
  updateCarousel
);


router.delete("/:id", deleteCarouselById);

router.delete("/", deleteAllCarousel);

module.exports = router;