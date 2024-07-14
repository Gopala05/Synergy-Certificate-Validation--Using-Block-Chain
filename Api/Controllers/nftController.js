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

// Checking the Presence of Certificate ID
exports.checkCertificate = async (req, res, next) => {
  try {
    const ID = req.params.id;
    const NFT = await NFTModal.findOne({ certificateID: ID });
    if (!NFT) {
      return res.json({ exists: false });
    }

    return res.status(200).json({ exists: true });
  } catch (error) {
    next(error);
  }
};

// Verifying the Presense of Certificate on DB
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

// Creating NFT entry in the DB
exports.createNFT = async (req, res, next) => {
  try {
    const newNFT = await NFTModal.create(req.body);

    res.status(201).json({
      status: "Created",
      data: {
        NFT: newNFT,
      },
    });
  } catch (error) {
    console.log("Error In Creating record in the DB: ", error);
  }
};
