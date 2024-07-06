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

exports.checkCertificate = async (req, res, next) => {
  try {
    const ID = req.params.id;
    const NFT = await NFTModal.findOne({ certificateID: ID });
    if (!NFT) {
      return res.json({ exists: false });
    }

    return res.json({ exists: true });
  } catch (error) {
    next(error);
  }
};

exports.verifyCertificate = async (req, res, next) => {
  try {
    const ID = req.body.certificateID;
    const Email = req.body.userEmail;
    const NFT = await NFTModal.findOne({ certificateID: ID, userEmail: Email });

    if (!NFT) {
      return res.status(404).json({
        status: "NOT FOUND",
        message: "Certificate not found",
      });
    }

    res.status(200).json({
      status: "OK",
      data: {
        NFT,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Creating the createNFT method
exports.createNFT = async (req, res, next) => {
  const newNFT = await NFTModal.create(req.body);

  res.status(201).json({
    status: "Created",
    data: {
      NFT: newNFT,
    },
  });
};
