const router = require('express').Router();
const { upload } = require("../config/cloudinary");
const { createBlog, getallBlogs, getBlogById, updateBlog, deleteBlog } = require('../controllers/blog.controller');



router.post('/create', upload.single("image"), createBlog)
router.get('/getAll', getallBlogs);
router.get('/get/:id', getBlogById);
router.put('/update/:id',updateBlog) ;
router.put('/delete/:id', deleteBlog)
 


module.exports = router;