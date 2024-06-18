const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    THIRDWEB_CLIENT_ID: process.env.THIRDWEB_CLIENT_ID,
    THIRDWEB_SECRET_KEY: process.env.THIRDWEB_SECRET_KEY,
    THIRDWEB_DEPLOYEMENT_ADDRESS: process.env.THIRDWEB_DEPLOYEMENT_ADDRESS,
    METAMASK_PRIVATE_KEY: process.env.METAMASK_PRIVATE_KEY,
  },
};

module.exports = nextConfig;
