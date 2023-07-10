// Import necessary modules
const express = require("express");

const {
  createTransaction,
  getTransactions,
  getCategoryAmounts,
} = require("../controllers/transactionController");

// Create a new router instance
const transactioRouter = express.Router();

transactioRouter.route("/create-transaction").post(createTransaction);
transactioRouter.route("/get-transaction").post(getTransactions);
transactioRouter.route("/get-category-amounts").post(getCategoryAmounts);

// Export the router instance for use in other modules
module.exports = transactioRouter;
