const express = require("express");
const nftController = require("../Controllers/nftController");

const nftRouter = express.Router();

// On "/" route we need Two APIs GET and POST for fetching all the NFTs and Craeting a NFT respectively
nftRouter
  .route("/")
  .get(nftController.getAllNFTs)
  .post(nftController.createNFT);

// On "/:id" route we need to fetch the Specfic NFT based on id
nftRouter.route("/:id").get(nftController.getNFT);

// Export the nftRouter
module.exports = nftRouter;
