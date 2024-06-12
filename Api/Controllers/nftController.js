const NFTModal = require("../Model/nftModal");

// Creating the getAllNFTs method
exports.getAllNFTs = async (req, res, next) => {
  const NFTs = await NFTModal.find();

  // Send Response
  res.status(200).json({
    status: "Success",
    results: NFTs.length,
    data: {
      NFTs,
    },
  });
};

// Creating the getNFT method, Update the GetNFT by Certificate ID
exports.getNFT = async (req, res, next) => {
  const NFT = await NFTModal.findById(req.params.id);

  res.status(200).json({
    status: "Success",
    data: {
      NFT,
    },
  });
};

exports.verifyCertificate = async (req, res, next) => {
  const ID = req.params.id;
  const NFT = await NFTModal.findOne({ certificateID: ID });

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
  const newNFT = await NFTModal.create(req.body);

  res.status(201).json({
    status: "Created",
    data: {
      NFT: newNFT,
    },
  });
};
