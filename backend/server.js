const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const eventRoutes = require("./routes/eventRoutes");

const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/appointmentapp";

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => {
    console.error("Failed to connect to MongoDB:", err.message || err);
    process.exit(1);
  });

app.use("/api", eventRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
