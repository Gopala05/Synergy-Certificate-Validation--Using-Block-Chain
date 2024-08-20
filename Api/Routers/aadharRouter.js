const express = require("express");
const aadharController = require("../Controllers/aadharController");

const aadharRouter = express.Router();

// Check Aadhar on route "/check-aadhar" with POST method
aadharRouter.post("/check-aadhar", aadharController.CheckAadhar);

// Check Aadhar and OTP on route "/check-aadhar-otp" with POST method
aadharRouter.post("/check-aadhar-otp", aadharController.CheckAadharOTP);

// Create Aadhar on route "/craete" with POST method
aadharRouter.post("/create", aadharController.CreateAadhar);

// Export the aadharRouter
module.exports = aadharRouter;
