const mongoose = require("mongoose");

const db_url = process.env.MONGO_URI;

const connectToDatabase = async () => {
  try {

    if (!db_url) {
      console.error(" MONGO_URI is missing");
      process.exit(1);
    }

    const conn = await mongoose.connect(db_url);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

  } catch (error) {

    console.error(" Database connection failed:", error.message);

    process.exit(1);
  }
};

module.exports = connectToDatabase;