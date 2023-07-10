// Import necessary modules
const mongoose = require("mongoose");

// Define a schema for the transaction collection in the database
const transactionSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields to documents
);

// Define a model for the user collection using the schema
const transactionModel = mongoose.model("transactions", transactionSchema);

// Export the model for use in other modules
module.exports = transactionModel;
