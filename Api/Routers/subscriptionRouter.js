const express = require("express");
const subscriptionController = require("../Controllers/subscriptionController");

const subscriptionRouter = express.Router();

// Subscription on route "/subscription" with POST method
subscriptionRouter.post("/subscription", subscriptionController.subscription);

// Check Subscription on route "/checksubscription" with POST method
subscriptionRouter.post("/checksubscription", subscriptionController.checkSubscription);

// Check Subscription on route "/checksubscription" with POST method
subscriptionRouter.get("/plan/:userName", subscriptionController.getPlan);

// Export the subscriptionRouter
module.exports = subscriptionRouter;
