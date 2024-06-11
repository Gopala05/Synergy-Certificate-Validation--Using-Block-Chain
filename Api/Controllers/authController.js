const jwt = require("jsonwebtoken");
const authModal = require("../Model/authModal");

const signInToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN, // Token Expires in
  });
};

// Creating a function to generate a Token
const createToken = (auth, status, req, res) => {
  const token = signInToken(auth._id);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000 // Cookie expires in milli seconds
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  // Remove password from output
  auth.password = undefined;

  res.status(status).json({
    status: "Success",
    token,
    data: {
      auth,
    },
  });
};

// Create the "SignUp" method
exports.SignUp = async (req, res, next) => {
  const newAuth = await authModal.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    authID: req.body.authID,
    authEmail: req.body.authEmail,
    role: req.body.role,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });

  createToken(newAuth, 201, req, res);
};

exports.SignIn = async (req, res, next) => {
  const { authID, password } = req.body;

  // Check if authID and password are passed from auth
  if (!authID || !password) {
    res.status(400).json({
      status: "Bad Request",
      message: "Pleasen provide the user ID and password!",
    });
  }
  // Checking if the auth exists or not
  let auth = await authModal.findOne({ authID: authID }).select("+password");

  // Check if auth exists and Password and auth.password are valid
  if (!auth || !(await auth.validatePassword(password, auth.password))) {
    return res.status(401).json({
      status: "Unauthorized",
      message: "Invalid user ID or Password.",
    });
  }

  // Check if everything is OK, send Token to the Client
  createToken(auth, 200, req, res);
};
