const Mongoose = require("mongoose");

const aadharSchema = new Mongoose.Schema({
  aadhar: {
    type: Number,
    require: [true, "Please Provide Aadhar Number!"],
  },
  first_name: {
    type: String,
  },
  middle_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  gender: {
    type: String,
  },
  dob: {
    type: String,
  },
  mobile: {
    type: Number,
  },
  address: {
    type: String,
  },
});

const AadharModel = Mongoose.model("aadhar", aadharSchema);

module.exports = AadharModel;
