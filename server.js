const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const path = require("path");
const connectDb = require("./config/connectDb");

// Load environment variables from .env file
dotenv.config();

// Database call
connectDb();

// Rest object
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Routes
// User routes
app.use("/api/v1/users", require("./routes/userRoute"));
// Transactions routes
app.use("/api/v1/transections", require("./routes/transectionRoutes"));

// Static files
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Port
const PORT = process.env.PORT || 8080;

// Listen server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
