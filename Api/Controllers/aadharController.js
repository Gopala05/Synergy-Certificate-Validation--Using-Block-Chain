const AadharModel = require("../Model/aadharModal");
const userModal = require("../Model/userModal");

exports.CheckAadhar = async (req, res, next) => {
  const { aadhar } = req.body;

  try {
    if (!aadhar) {
      return res.status(400).json({ message: "Aadhar is required." });
    }

    const aadharExists = await AadharModel.findOne({ aadhar });

    if (!aadharExists) {
      return res.status(404).json({ message: "Invalid Aadhar." });
    }

    const existingUser = await userModal.findOne({ aadhar });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with the Aadhar already exists." });
    }

    return res.status(200).json({ message: "Aadhar does not exist." });
  } catch (error) {
    console.error("Error in Checking Aadhar:", error);
    next(error);
  }
};

exports.CheckAadharOTP = async (req, res, next) => {
  const { aadhar, otp } = req.body;

  try {
    if (!aadhar || !otp) {
      return res.status(400).json({ message: "Aadhar and OTP are required." });
    }

    const aadharUser = await AadharModel.findOne({ aadhar });

    if (!aadharUser) {
      return res.status(404).json({ message: "Invalid Aadhar." });
    }

    const existingUser = await userModal.findOne({ aadhar });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this Aadhar already exists." });
    }

    if (otp !== "123456") {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    return res
      .status(200)
      .json({ message: "Aadhar does not exist.", user: aadharUser });
  } catch (error) {
    console.error("Error in Checking Aadhar:", error);
    next(error);
  }
};

exports.CreateAadhar = async (req, res, next) => {
  const data = req.body;

  try {
    if (!data?.aadhar) {
      return res.status(400).json({ message: "Aadhar is required." });
    }

    const existingAadhar = await AadharModel.findOne({ aadhar: data.aadhar });

    if (existingAadhar) {
      return res.status(400).json({ message: "Aadhar already exists." });
    }

    const aadharUser = await AadharModel.create(data);

    if (!aadharUser) {
      return res.status(400).json({ message: "Error creating Aadhar record." });
    }

    return res
      .status(200)
      .json({ message: "Aadhar created successfully.", user: aadharUser });
  } catch (error) {
    console.error("Error in Inserting Aadhar:", error);
    next(error);
  }
};
