const express = require("express");
const userDetailsController = require("../Controllers/userDetailsController");

const userDetailsRouter = express.Router();

// User Details creation on route "/create" with POST method
userDetailsRouter.post("/create", userDetailsController.CreateUserDetails);

// User Details update on route "/update" with PUT method
userDetailsRouter.put("/update", userDetailsController.UpdateUserDetails);

// User Details Fetching on route "/getdetails" with PUT method
userDetailsRouter.get("/getdetails/:userName", userDetailsController.getUserDetails);

module.exports = userDetailsRouter;
