const express = require("express");
const nftController = require("../Controllers/nftController");

const nftRouter = express.Router();

// On "/" route we need Two APIs GET and POST for fetching all the NFTs and Craeting a NFT respectively
nftRouter
  .route("/")
  .get(nftController.getAllNFTs)
  .post(nftController.createNFT);

// On route we need to fetch the NFT
nftRouter.route("/verify").post(nftController.verifyCertificate);
nftRouter.route("/check/:id").get(nftController.checkCertificate);

// Export the nftRouter
module.exports = nftRouter;
