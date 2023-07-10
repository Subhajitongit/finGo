// Import required modules and models
const transactionModel = require("../models/transactionModel");
const userModel = require("../models/userModel");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const { mccCategories } = require("../mccConfig");

// Handle user creation
module.exports.createTransaction = async function createTransaction(req, res) {
  try {
    // Destructure the request body to get the name, password, and email
    let { mcc, amount, email, phone, name, note } = req.body;
    // Create a new user in the database with the provided information
    const headers = {
      "Content-Type": "application/json",
      "x-client-id": process.env.APP_ID,
      "x-client-secret": process.env.APP_SECRET,
      "x-api-version": "2022-09-01",
    };

    const uuid = uuidv4();
    const orderId = `fingo_${uuid}`;

    const user = await userModel.findOne({ email: email });

    const data = {
      order_amount: amount,
      order_id: orderId,
      order_currency: "INR",
      customer_details: {
        customer_id: user.id,
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
      },
      order_meta: {
        notify_url: "https://test.cashfree.com",
      },
      order_note: note,
    };

    const response = await axios.post(
      "https://sandbox.cashfree.com/pg/orders",
      data,
      { headers }
    );

    if (response.status != 200) {
      return res.status(404).json({
        message: "Can not make payment",
      });
    }

    const transaction = await transactionModel.create({
      userId: user.id,
      category: mccCategories[mcc.toString()] || "miscleneous",
      amount: amount,
    });

    // Send a JSON response with a success message, the new user data
    res.status(200).json({
      message: "Succesfully transaction made",
      data: transaction,
      cfData: response.data,
    });
  } catch (err) {
    // If an error occurs, send a JSON response with the error message
    res.status(400).json({
      message: err.message,
    });
  }
};

// Handle get friends
module.exports.getTransactions = async function getTransactions(req, res) {
  try {
    // Destructure the request body to get the name, password, and email
    let { userId } = req.body;
    let transaction = await transactionModel
      .find({ userId: userId })
      .sort({ createdAt: 1 });
    // Send a JSON response with a success message, the new user data, and the token
    res.status(200).json({
      message: "Succesfully fetched transactions",
      data: transaction,
    });
  } catch (err) {
    // If an error occurs, send a JSON response with the error message
    res.status(400).json({
      message: err.message,
    });
  }
};

// Handle category amounts
module.exports.getCategoryAmounts = async function getCategoryAmounts(
  req,
  res
) {
  try {
    let { email } = req.body;
    const user = await userModel.findOne({
      email: email,
    });
    const transactions = await transactionModel.find({
      userId: user.id,
    });

    const categoryAmounts = [];
    transactions.forEach((transaction) => {
      const { category, amount } = transaction;
      const existingCategory = categoryAmounts.find(
        (item) => item.category === category
      );
      if (existingCategory) {
        existingCategory.amount += parseFloat(amount);
      } else {
        categoryAmounts.push({ category, amount: parseFloat(amount) });
      }
    });

    // Send a JSON response with a success message, the new user data, and the token
    res.status(200).json({
      message: "Succesfully fetched transactions",
      data: categoryAmounts,
    });
  } catch (err) {
    // If an error occurs, send a JSON response with the error message
    res.status(400).json({
      message: err.message,
    });
  }
};
