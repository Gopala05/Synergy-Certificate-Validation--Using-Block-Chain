const RequestModel = require("../Model/requestModal");
const UserModel = require("../Model/userModal");

// Confirming the Request
exports.Confirm = async (req, res, next) => {
  try {
    const ID = req.params.id;

    // Fetch request details from RequestModel based on ID
    const request = await RequestModel.findById(ID);

    if (!request) {
      return res.status(404).json({
        status: "NOT FOUND",
        message: "Request not found",
      });
    }

    // Check if the request status is Pending
    if (request.status !== "Pending") {
      return res.status(400).json({
        status: "BAD REQUEST",
        message: "Request has been closed",
      });
    }

    // Fetch user details from UserModel based on userName
    const user = await UserModel.findOneAndUpdate(
      { userEmails: request.receiverEmail },
      { $push: { userEmails: request.senderEmail } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        status: "NOT FOUND",
        message: "User not found",
      });
    }

    // Update RequestModel to set status to Confirmed
    const updatedRequest = await RequestModel.findByIdAndUpdate(
      ID,
      { $set: { status: "Confirmed" } },
      { new: true }
    );

    res.status(200).json({
      status: "OK",
      message: "Accounts Linked Successfully",
      updatedRequest: updatedRequest,
    });
  } catch (error) {
    console.log("Error in Confirming record in the DB: ", error);
    next(error);
  }
};

// Rejecting the Request
exports.Reject = async (req, res, next) => {
  try {
    const ID = req.params.id;

    // Fetch request details from RequestModel based on ID
    const request = await RequestModel.findById(ID);

    if (!request) {
      return res.status(404).json({
        status: "NOT FOUND",
        message: "Request not found",
      });
    }

    // Check if the request status is Pending
    if (request.status !== "Pending") {
      return res.status(400).json({
        status: "BAD REQUEST",
        message: "Request has been closed",
      });
    }

    // Update RequestModel to set status to true
    const updated = await RequestModel.findByIdAndUpdate(
      ID,
      { $set: { status: "Rejected" } },
      { new: true }
    );

    res.status(200).json({
      status: "OK",
      message: "Rejected the Request Successfully",
      updatedRequest: updated,
    });
  } catch (error) {
    console.log("Error in Rejecting record in the DB: ", error);
    next(error);
  }
};

// Blocking the Request
exports.Block = async (req, res, next) => {
  try {
    const ID = req.params.id;

    // Fetch request details from RequestModel based on ID
    const request = await RequestModel.findById(ID);

    if (!request) {
      return res.status(404).json({
        status: "NOT FOUND",
        message: "Request not found",
      });
    }

    // Check if the request status is Pending
    if (request.status !== "Pending") {
      return res.status(400).json({
        status: "BAD REQUEST",
        message: "Request has been closed",
      });
    }

    // Update RequestModel to set status to true
    const updated = await RequestModel.findByIdAndUpdate(
      ID,
      { $set: { status: "Block" } },
      { new: true }
    );

    res.status(200).json({
      status: "OK",
      message: "Blocked the Request Successfully",
      updatedRequest: updated,
    });
  } catch (error) {
    console.log("Error in Rejecting record in the DB: ", error);
    next(error);
  }
};

// Creating the Request
exports.Create = async (req, res, next) => {
  try {
    const { senderEmail, receiverEmail } = req.body;

    // Check if sender and receiver are the same
    if (senderEmail === receiverEmail) {
      return res.status(400).json({
        status: "Bad Request",
        message: "Sender and receiver emails are the same.",
      });
    }

    // Check if a request already exists with the same sender and receiver
    // const existingRequest = await RequestModel.findOne({
    //   senderEmail: senderEmail,
    //   receiverEmail: receiverEmail,
    // });

    // if (existingRequest) {
    //   return res.status(400).json({
    //     status: "Bad Request",
    //     message: "Request with sender and receiver already exists.",
    //   });
    // }

    // Proceed to create the request
    const request = await RequestModel.create(req.body);

    res.status(201).json({
      status: "Created",
      data: {
        Request: request,
      },
    });
  } catch (error) {
    console.error("Error in creating record in the DB: ", error);
    next(error);
  }
};

// Rejecting the Request
exports.CheckID = async (req, res, next) => {
  try {
    const ID = req.params.id;

    // Fetch request details from RequestModel based on ID
    const request = await RequestModel.findById(ID);

    if (!request) {
      return res.status(404).json({
        status: "NOT FOUND",
        message: "Request not found",
      });
    }

    if (request.status !== "Pending") {
      return res.status(400).json({
        status: "BAD REQUEST",
        message: "Request has been closed",
      });
    }

    res.status(200).json({
      status: "OK",
      message: "Request Exists",
      Request: request,
    });
  } catch (error) {
    console.log("Error in Rejecting record in the DB: ", error);
    next(error);
  }
};
