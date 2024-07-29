const express = require("express");
const nftController = require("../Controllers/nftController");

const nftRouter = express.Router();

// On "/" route we need POST for Craeting a NFT
nftRouter.route("/").post(nftController.createNFT);

// Fetch all the NFTs
nftRouter.route("/fetchAll").post(nftController.getAllNFTs);

// We need to fetch the NFT
nftRouter.route("/verify").post(nftController.verifyCertificate);
nftRouter.route("/check/:id").get(nftController.checkCertificate);

// Export the nftRouter
module.exports = nftRouter;
