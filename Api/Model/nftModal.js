const mongoose = require("mongoose");

//NFT Model Schema
const nftSchema = new mongoose.Schema({
  title: {
    type: String, // Type of the attribute "title"
    trim: true, // For Trimming the Spaces in the "title"
  },
  description: {
    type: String,
    trim: true,
  },
  certificateID: {
    type: String,
    required: [true, "Please provide unique Certificate ID"],
    unique: true,
    lowercase: true,
  },
  userEmail: {
    type: String,
    required: [true, "Please provide email to whom this Certificate is issued"],
    unique: true, // Unique value in database
    lowercase: true, // Transform to LowerCase
  },
  organisation: String,
  creatorID: String,
  creatorEmail: {
    type: String,
    required: [true, "Please provide Creator Email"],
    unique: true,
    lowercase: true,
  },
  address: String,
  transactionHash: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  certificate: String,
});

// Creating the model as "NFT" with nftSchema
const NFTModal = mongoose.model("nft", nftSchema);

//Export the Created Model
module.exports = NFTModal;
