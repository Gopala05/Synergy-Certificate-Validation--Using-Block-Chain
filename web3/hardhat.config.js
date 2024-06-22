/** @type import('hardhat/config').HardhatUserConfig */
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

const PRIVATE_KEY = process.env.METAMASK_PRIVATE_KEY;
const SEPOLIA_RPC_URL = "https://sepolia.infura.io/v3/40498f6eb1ba48a1a24c7051c0115af5"; // Replace with your Sepolia RPC URL

module.exports = {
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {
      chainId: 1, // Standard local development chain ID
    },
    polygon_mumbai: {
      url: "https://rpc.ankr.com/polygon_mumbai",
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 80001,
    },
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 11155111,
    },
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
