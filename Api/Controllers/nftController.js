const NFTModel = require("../Model/nftModel");

// Creating the getAllNFTs method
exports.getAllNFTs = async (req, res, next) => {
  const NFTs = await NFTModel.find();

  // Send Response
  res.staus(200).json({
    status: "Success",
    results: NFTs.length,
    data: {
      NFTs,
    },
  });
};

// Creating the getNFT method
exports.getNFT = async (req, res, next) => {
  const NFT = await NFTModel.findById(req.params.id);

  res.status(200).json({
    status: "Success",
    data: {
      NFT,
    },
  });
};

// Creating the createNFT method
exports.createNFT = async (req, res, next) => {
  console.log(req.body);
  const newNFT = await NFTModel.create(req.body);

  res.status(201).json({
    status: "Created",
    data: {
      NFT: newNFT,
    },
  });
};
