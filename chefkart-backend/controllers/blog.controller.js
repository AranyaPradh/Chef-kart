const { cloudinary } = require("../config/cloudinary");
const Blog = require("../models/Blog.Model");


const createBlog = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;

    const image = req.file ? req.file.path : "";

    if (!title || !content || !category || !image) {
      return res.status(400).json({
        message: "Please fill in all fields",
      });
    }

    const newBlog = await Blog.create({
      title,
      content,
      category,
      tags: tags ? tags.split(",") : [],
      image,
    });

    res.status(201).json({
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// get all blogs
const getallBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    res.status(200).json({
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// get single blog
const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// update blog
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category, image, tags } = req.body;

    const updateData = {
      title,
      content,
      category,
      tags,
    };

    if (image) {
      const result = await cloudinary.uploader.upload(image, {
        folder: "blogs",
      });

      updateData.image = result.secure_url;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.status(200).json({
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// delete blog
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.status(200).json({
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  createBlog,
  getallBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};