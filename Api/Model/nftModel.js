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
  category: String,
  email: String,
  address: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  image: String,
});

// Creating the model as "NFT" with nftSchema
const NFTModel = mongoose.model("nft", nftSchema);

//Export the Created Model
module.exports = NFTModel;
