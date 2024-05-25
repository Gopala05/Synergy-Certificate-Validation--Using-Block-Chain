const mongoose = require("mongoose");
const next = require("next");
const dotenv = require("dotenv");
const app = require("./app");
const User = require("./Api/Model/userModel"); // Import User model
const NFT = require("./Api/Model/nftModel"); // Import NFT model

// Configuring the env
dotenv.config({ path: "./config.env" });

// Defining the Development or Production Environment
const development = process.env.NODE_ENV !== "production";

// To run both Frontend and Backend on the Same Server we are using next
const nextServer = next({ dev: development });
const handle = nextServer.getRequestHandler();

// Connecting to MongoDB Database
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected Successfully!"))
  .catch((err) => console.log("DB Connection Error: ", err));

const port = process.env.PORT || 3000;

// Test code to create entries
// const createTestEntries = async () => {
//   try {
//     await User.create({
//       name: "Test User",
//       email: "testuser@example.com",
//       password: "password123",
//       confirmPassword: "password123",
//     });

//     await NFT.create({
//       title: "Test NFT",
//       description: "This is a test NFT",
//       category: "Art",
//       email: "testuser@example.com",
//       address: "123 Blockchain St",
//       image: "testimage.png",
//     });

//     console.log("Test entries created!");
//   } catch (err) {
//     console.error("Error creating test entries: ", err);
//   }
// };

// Handle the Requests and Responses
nextServer.prepare().then(() => {
  app.get("*", (req, res) => {
    return handle(req, res);
  });

  app.listen(port, () => {
    console.log("Server is Running on port: ", port);
    // createTestEntries(); // Create test entries on server start
  });
});
