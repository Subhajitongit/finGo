// Import necessary modules
const express = require("express");

const {
  creation,
  addFriends,
  searchFriends,
  getFriends,
  getUser,
} = require("../controllers/userController");

// Create a new router instance
const userRouter = express.Router();

userRouter.route("/create-user").post(creation);
userRouter.route("/add-friend").post(addFriends);
userRouter.route("/search-friend").post(searchFriends);
userRouter.route("/friend-list").post(getFriends);
userRouter.route("/user").post(getUser);

// Export the router instance for use in other modules
module.exports = userRouter;
