const express = require("express");
const cors = require("cors");

const nftRouter = require("./Api/Routers/nftRouter");
const userRouter = require("./Api/Routers/userRouter");
const authRouter = require("./Api/Routers/authRouter");

//Middleware
const app = express();
app.use(express.json({ limit: "500kb" })); // To Store the data with limit of 500Kb

//Cross-Origin Resource Sharing (CORS)
app.use(cors());
app.options("*", cors());

//Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/nfts", nftRouter);

module.exports = app;
