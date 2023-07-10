// Import necessary modules
const mongoose = require("mongoose");

// Define a regular expression to validate email addresses
const validateEmail = function (email) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

// Define a schema for the user collection in the database
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validateEmail, "Please enter a valid email"],
    },
    imageUrl: {
      type: String,
      required: true,
    },
    friends: {
      type: [],
    },
    categories_spent: {
      type: [],
    },
    questionare: {
      type: {},
    },
    phone: {
      type: String,
    },
    age: {
      type: Number,
    },
    isAnswered: {
      type: Boolean,
    },
    income: {
      type: String,
    },
    totalSpending: {
      type: String,
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields to documents
);

// Define a model for the user collection using the schema
const userModel = mongoose.model("users", userSchema);

// Export the model for use in other modules
module.exports = userModel;
