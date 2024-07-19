const express = require("express");
const userController = require("../Controllers/userController");

const userRouter = express.Router();

// Sign Up on route "/sign-up" with POST method
userRouter.post("/sign-up", userController.SignUp);

// Sign In on route "/sign-in" with POST method
userRouter.post("/sign-in", userController.SignIn);

// Export the userRouter
module.exports = userRouter;
