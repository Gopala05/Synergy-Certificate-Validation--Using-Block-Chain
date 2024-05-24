const jwt = require("jsonwebtoken");
const UserModal = require("../Model/userModel");

const signInToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN, // Token Expires in
  });
};

// Creating a function to generate a Token
const createToken = (user, status, req, res) => {
  const token = signInToken(user._id);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000 // Cookie expires in milli seconds
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  // Remove password from output
  user.password = undefined;

  res.status(status).json({
    status: "Success",
    token,
    data: {
      user,
    },
  });
};

// Create the "SignUp" method
exports.SignUp = async (req, res, next) => {
  const newUser = await UserModal.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });

  createToken(newUser, 201, req, res);
};

exports.SignIn = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are passed from user
  if (!email || !password) {
    res.status(400).json({
      status: "Bad Request",
      message: "Pleasen provide the email and password!",
    });
  }
  // Checking if the user exists or not
  let user = await UserModal.findOne({ email: email }).select("+password");

  // Check if user exists and Password and user.password are valid
  if (!user || !(await user.validatePassword(password, user.password))) {
    return res.status(401).json({
      status: "Unauthorized",
      message: "Invalid Email or Password.",
    });
  }

  // Check if everything is OK, send Token to the Client
  createToken(user, 200, req, res);
};
