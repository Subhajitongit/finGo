// Import required modules and models
const userModel = require("../models/userModel");

// Handle user creation
module.exports.creation = async function creation(req, res) {
  try {
    // Destructure the request body to get the name, password, and email
    let { name, email, questionare, age, income, imageUrl } = req.body;
    // Create a new user in the database with the provided information
    let user = await userModel.create({
      name: name,
      email: email,
      questionare: questionare,
      age: age,
      imageUrl: imageUrl,
      isAnswered: true,
      income: income,
    });

    // Send a JSON response with a success message, the new user data
    res.status(200).json({
      message: "Succesfully user created",
      data: user,
    });
  } catch (err) {
    // If an error occurs, send a JSON response with the error message
    res.status(400).json({
      message: err.message,
    });
  }
};

// Handle add friends
module.exports.addFriends = async function addFriends(req, res) {
  try {
    // Destructure the request body to get the name, password, and email
    let { friend_uid, uid } = req.body;
    let updatedUser = await userModel.findOneAndUpdate(
      { uid: uid },
      { $push: { friends: friend_uid } },
      { new: true }
    );
    // Send a JSON response with a success message, the new user data, and the token
    res.status(200).json({
      message: "Succesfully added friend",
      data: updatedUser,
    });
  } catch (err) {
    // If an error occurs, send a JSON response with the error message
    res.status(400).json({
      message: err.message,
    });
  }
};

// Handle search friends
module.exports.searchFriends = async function searchFriends(req, res) {
  try {
    // Destructure the request body to get the name, password, and email
    let { phone } = req.body;
    let friend = await userModel.findOne({ phone: phone });
    // Send a JSON response with a success message, the new user data, and the token
    res.status(200).json({
      message: "Succesfully found friend",
      data: friend,
    });
  } catch (err) {
    // If an error occurs, send a JSON response with the error message
    res.status(400).json({
      message: err.message,
    });
  }
};

module.exports.searchFriendsEmail = async function searchFriendsEmail(
  req,
  res
) {
  try {
    // Destructure the request body to get the name, password, and email
    let { email } = req.body;
    let friend = await userModel.findOne({ email: email });
    // Send a JSON response with a success message, the new user data, and the token
    res.status(200).json({
      message: "Succesfully found friend",
      data: friend,
    });
  } catch (err) {
    // If an error occurs, send a JSON response with the error message
    res.status(400).json({
      message: err.message,
    });
  }
};

// Handle get friends
module.exports.getFriends = async function getFriends(req, res) {
  try {
    // Destructure the request body to get the name, password, and email
    let { id } = req.body;
    let user = await userModel.findOne({ id: id });
    // Send a JSON response with a success message, the new user data, and the token
    res.status(200).json({
      message: "Succesfully found friend",
      data: user.friends,
    });
  } catch (err) {
    // If an error occurs, send a JSON response with the error message
    res.status(400).json({
      message: err.message,
    });
  }
};

// Handle get user
module.exports.getUser = async function getUser(req, res) {
  try {
    // Destructure the request body to get the name, password, and email
    let { id } = req.body;
    let user = await userModel.findOne({ id: id });
    // Send a JSON response with a success message, the new user data, and the token
    res.status(200).json({
      message: "Succesfully found friend",
      data: user,
    });
  } catch (err) {
    // If an error occurs, send a JSON response with the error message
    res.status(400).json({
      message: err.message,
    });
  }
};
