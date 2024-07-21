const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  senderEmail: {
    type: String,
    required: [true, "Sender Email is Required!"],
  },
  receiverEmail: {
    type: String,
    required: [true, "Receiver Email is Required!"],
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Rejected", "Block"],
    default: "Pending",
  },
});

// Creating the model
const RequestModal = mongoose.model("request", RequestSchema);

//Export the Created Model
module.exports = RequestModal;
