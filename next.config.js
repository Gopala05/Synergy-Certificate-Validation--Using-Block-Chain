const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // output: "export",
  env: {
    THIRDWEB_CLIENT_ID: process.env.THIRDWEB_CLIENT_ID,
    THIRDWEB_SECRET_KEY: process.env.THIRDWEB_SECRET_KEY,
    THIRDWEB_DEPLOYEMENT_ADDRESS: process.env.THIRDWEB_DEPLOYEMENT_ADDRESS,
    METAMASK_PRIVATE_KEY: process.env.METAMASK_PRIVATE_KEY,
    PINATA_API_KEY: process.env.PINATA_API_KEY,
    PINATA_JWT: process.env.PINATA_JWT,
    PINATA_GATEWAY: process.env.PINATA_GATEWAY,
    PINATA_SECRET_API_KEY: process.env.PINATA_SECRET_API_KEY,
    PINATA_GROUP_ID: process.env.PINATA_GROUP_ID,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  },
};

module.exports = nextConfig;
