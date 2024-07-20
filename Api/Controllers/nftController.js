const NFTModal = require("../Model/nftModal");

// Creating the getAllNFTs method
exports.getAllNFTs = async (req, res, next) => {
  try {
    const { emails } = req.body;

    // Validate input
    if (!Array.isArray(emails) || emails.length === 0) {
      return res.status(400).json({
        status: "Error",
        message: "Please provide a valid array of emails.",
      });
    }

    // Find NFTs associated with the provided emails
    const nftsByEmails = [];
    for (const email of emails) {
      const nfts = await NFTModal.find({ userEmail: email });
      nftsByEmails.push({ [email]: nfts }); 
    }

    // Prepare response
    res.status(200).json({
      status: "Success",
      data: {
        nftsByEmails,
      },
    });
  } catch (error) {
    console.log("Error in fetching NFTs by emails: ", error);
    next(error);
  }
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
    console.log("Error In Check Certificate: ", error);
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
    console.log("Error In Certificate VErification: ", error);
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
    next(error);
  }
};
