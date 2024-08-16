const userDetailsModal = require("../Model/userDetailsModal");
const userModal = require("../Model/userModal");

exports.CreateUserDetails = async (req, res, next) => {
  const data = req.body;

  try {
    if (!data.userName) {
      return res.status(400).json({ message: "User name is required." });
    }

    const user = await userModal.findOne({ userName: data.userName });

    if (!user) {
      return res.status(404).json({ message: "User Not Found." });
    }

    const userDetail = await userDetailsModal.create(data);

    return res
      .status(201)
      .json({ message: "User Details Created.", userDetails: userDetail });
  } catch (error) {
    console.error("Error in Creating User Details: ", error);
    next(error);
  }
};

exports.UpdateUserDetails = async (req, res, next) => {
  const updateData = req.body;
  const userName = req.body.userName;

  try {
    if (!userName) {
      return res.status(400).json({ message: "User name is required." });
    }

    const user = await userModal.findOne({ userName });

    if (!user) {
      return res.status(404).json({ message: "User Not Found." });
    }

    const updatedUserDetails = await userDetailsModal.findOneAndUpdate(
      { userName },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedUserDetails) {
      return res.status(404).json({ message: "User Details Not Found." });
    }

    return res.status(200).json({
      message: "User Details Updated.",
      userDetails: updatedUserDetails,
    });
  } catch (error) {
    console.error("Error in Updating User Details: ", error);
    next(error);
  }
};

exports.getUserDetails = async (req, res, next) => {
  const { userName } = req.params;
  try {
    if (!userName) {
      return res.status(404).json({ message: "UserName is required." });
    }

    const userDetails = await userDetailsModal.findOne({ userName });

    if (!userDetails) {
      return res.status(404).json({ message: "User Details Not Found." });
    }

    return res.status(200).json({
      message: "User Details Found.",
      userDetails: userDetails,
    });
  } catch (error) {
    console.log("Error in Fetching User Details: ", error);
    next(error);
  }
};
