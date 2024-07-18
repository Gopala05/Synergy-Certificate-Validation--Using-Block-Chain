const express = require("express");
const authController = require("../Controllers/authController");

const authRouter = express.Router();

// Sign Up on route "/sign-up" with POST method
authRouter.post("/sign-up", authController.SignUp);

// Sign In on route "/sign-in" with POST method
authRouter.post("/sign-in", authController.SignIn);

// Export the authRouter
module.exports = authRouter;
