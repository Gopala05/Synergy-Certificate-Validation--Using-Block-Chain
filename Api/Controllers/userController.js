const jwt = require("jsonwebtoken");
const UserModal = require("../Model/userModal");

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
  const { name, userName, userEmails, password, confirmPassword } = req.body;

  // Check if any user already exists with the provided email or userName
  const existingUser = await UserModal.findOne({
    $or: [{ userName: userName }, { userEmails: userEmails }],
  });

  if (existingUser) {
    // Determine if it's the email or userName that already exists
    let errorField = "";
    if (existingUser.userName === userName) {
      errorField = "UserName";
    } else if (existingUser.userEmails.includes(userEmails)) {
      errorField = "Email";
    }

    return res.status(400).json({ message: `${errorField} already exists` });
  }

  // Create new user if email and userName are not already in use
  const newUser = await UserModal.create({
    name,
    userName,
    userEmails: [userEmails], // Store as an array with a single email
    password,
    confirmPassword,
  });

  createToken(newUser, 201, req, res);
};

exports.SignIn = async (req, res, next) => {
  const { userName, password } = req.body;

  // Check if userName and password are passed from user
  if (!userName || !password) {
    res.status(400).json({
      status: "Bad Request",
      message: "Pleasen provide the email and password!",
    });
  }

  // Checking if the user exists or not
  let user = await UserModal.findOne({ userName: userName }).select(
    "+password"
  );

  // Check if user exists and Password and user.password are valid
  if (!user || !(await user.validatePassword(password, user.password))) {
    return res.status(401).json({
      status: "Unauthorized",
      message: "Invalid Username or Password.",
    });
  }

  // Check if everything is OK, send Token to the Client
  createToken(user, 200, req, res);
};

// Get the User
exports.getUser = async (req, res, next) => {
  const { email } = req.params; 

  try {
    // Check if user exists with the given email
    const user = await UserModal.findOne({ userEmails: email });

    if (!user) {
      return res.status(404).json({
        status: "NOT FOUND",
        message: "Invalid User Email",
      });
    }

    // If user is found, return user details
    res.status(200).json({
      status: "OK",
      message: "User Details",
      user: user,
    });
  } catch (error) {
    console.log("Error in fetching user:", error);
    next(error);
  }
};
