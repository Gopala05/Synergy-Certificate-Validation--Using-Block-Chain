const mongoose = require("mongoose");
const next = require("next");
const dotenv = require("dotenv");
const app = require("./app");
const User = require("./Api/Model/userModal"); // Import User model
const NFT = require("./Api/Model/nftModal"); // Import NFT model
const Auth = require("./Api/Model/authModal"); // Import Auth model
const Request = require("./Api/Model/requestModal"); // Import Request model

// Configuring the env
dotenv.config({ path: "./.env" });

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
