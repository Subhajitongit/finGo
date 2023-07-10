// Import required modules and dependencies
const express = require("express");
const userRouter = require("./routes/userRoute");
const transactionRouter = require("./routes/transactionRoute");
const { connectToMongoDB } = require("./dbconfig");
require("dotenv").config();

// Create an instance of the express application
const app = express();

// Connect to MongoDB
connectToMongoDB(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connection successful!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Set the port number
const PORT = process.env.PORT || 8080;

// Use JSON and URL-encoded bodies for incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.json({ message: "Hello! Welcome to FinGo Server" });
});

// Define routes for auth and URL APIs
app.use("/api/user", userRouter);
app.use("/api/transaction", transactionRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}.`);
});
