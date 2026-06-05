const { createTestimonial, getAllTestimonials, getTestimonialById, updateTestimonial, deleteTestimonial } = require('../controllers/testimonial.controller');

const router = require('express').Router();
const { upload } = require("../config/cloudinary");

router.post('/createTestimonial',upload.single("profileimage"), createTestimonial)
router.get('/get',   getAllTestimonials)
router.get('/get/:id', getTestimonialById);
router.put('/update/:id',upload.single("profileimage"), updateTestimonial) ;
router.delete('/delete/:id',deleteTestimonial)
module.exports = router;