const mongoose = require("mongoose");
const next = require("next");
const dotenv = require("dotenv");
const app = require("./app");

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
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected Successfully!"))
  .catch((err) => console.log("DB Connection Error: ", err));

const port = process.env.PORT || 3000;

nextServer.prepare().then(() => {
  // Handle all other requests with Next.js
  app.all("*", (req, res) => {
    return handle(req, res);
  });

  app.listen(port, () => {
    console.log("Server is Running on port: ", port);
  });
});
