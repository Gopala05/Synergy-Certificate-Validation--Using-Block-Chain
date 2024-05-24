const Mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const authSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your Name!"], // Required, If not given trow the message
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true, // Unique value in database
    lowercase: true, // Transform to LowerCase
  },
  role: {
    type: String,
    enum: ["user", "admin"], // Enum is a list of values that can be used
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please provide your Password!"],
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    required: [true, "Confirm your Password"],
    validate: {
      validator: function (pass) {
        return pass === this.password;
      },
      message: "Passwords do not match",
    },
  },
});

authSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) {
    return next();
  }

  // Hash the password with cost 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete the confirmPassword since we dont want to store that in the database
  this.confirmPassword = undefined;
  next();
});

// Method to compare a plain text password against the hashed one stored in the database
authSchema.pre("save", function (next) {
  if (!this.isModified("passowrd") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

authSchema.pre(/^find/, function (next) {
  // This points the current query
  this.find({ active: { $ne: false } });
  next();
});

authSchema.methods.validatePassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

authSchema.methods.passwordChangesAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const TimeStanpChanged = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimeStamp < TimeStanpChanged;
  }

  // False means Not Changed
  return false;
};

const userModal = Mongoose.model("User", authSchema);

module.exports = userModal;
