require("dotenv").config();
const express = require("express");

const UserRoutes = require("./routes/user.routes");
const BlogRoutes = require("./routes/blog.routes");
const TestimonialRoutes = require("./routes/testimonial.routes");
const galleryRoutes = require("./routes/gallery.routes");
const bookingRoutes = require("./routes/booking.routes");
const chefRoutes = require('./routes/chef.routes');
const paymentRoutes= require('./routes/payment.routes');

const http = require("http");

const app = express();
const server = http.createServer(app);

const connectToDatabase = require("./config/db");

const PORT = 8000;

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.use("/api/auth", UserRoutes);
app.use("/api/blog", BlogRoutes);
app.use("/api/testimonial", TestimonialRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/chef", chefRoutes);
app.use("/api/payment/", paymentRoutes)
const startServer = async () => {
  try {
    await connectToDatabase();

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();