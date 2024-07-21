const express = require("express");
const requestController = require("../Controllers/requestController");

const requestRouter = express.Router();

// Route "/create" with POST method
requestRouter.post("/create", requestController.Create);

// Route "/confirm/:id" with POST method
requestRouter.put("/confirm/:id", requestController.Confirm);

// Route "/reject/:id" with POST method
requestRouter.put("/reject/:id", requestController.Reject);

// Route "/block/:id" with POST method
requestRouter.put("/block/:id", requestController.Block);

// Route "/check/:id" with POST method
requestRouter.get("/check/:id", requestController.CheckID);

// Export the requestRouter
module.exports = requestRouter;
