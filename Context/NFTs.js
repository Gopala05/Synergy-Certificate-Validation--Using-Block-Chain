"use client";

import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import {
  useAddress,
  useMetamask,
  useDisconnect,
  useSigner,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { readContract, resolveMethod } from "thirdweb";
import { prepareContractCall, sendTransaction } from "thirdweb";
import { createWallet } from "thirdweb/wallets";
import toast from "react-hot-toast";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  // Create the client with your clientId or secretKey if in a server environment
  const client = createThirdwebClient({
    clientId: process.env.THIRDWEB_CLIENT_ID,
    secretKey: process.env.THIRDWEB_SECRET_KEY,
  });

  // Connect to your contractTHIRDWEB_DEPLOYEMENT_ADDRESS
  const contract = getContract({
    client,
    chain: defineChain(84532),
    address: process.env.THIRDWEB_DEPLOYEMENT_ADDRESS,
  });

  // initialize the wallet, you can pick any of the 300+ wallet connectors supported
  // ex: "io.metamask", "com.coinbase.wallet", "me.rainbow", etc...
  const wallet = createWallet("io.metamask");

  // Get the user address by using "useAddress" hook
  const address = useAddress();

  // Connect to Metamask
  const connect = useMetamask();

  // Disconnect from Metamask
  const disconnect = useDisconnect();

  // Get the signer object
  const signer = useSigner();

  const [userBalance, setUserBalance] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // User data fetching function
  const data = async () => {
    try {
      // Check Balance
      const balance = await signer?.getBalance();
      const userBalance = address
        ? ethers.utils.formatEther(balance?.toString())
        : "";
      setUserBalance(userBalance);
    } catch (error) {
      console.log(`Error in fetching User Data: ${error}`);
    }
  };

  useEffect(() => {
    if (signer) {
      data();
    }
  }, [signer]);

  // Upload image function
  const UploadCertificate = async (imageInfo) => {
    const AuthInfo = JSON.parse(localStorage.getItem("auth-info"));

    const {
      title,
      description,
      certificateID,
      userEmail,
      organisation,
      certificate,
    } = imageInfo;

    // console.log(imageInfo)

    // connect the wallet, this returns a promise that resolves to the connected account
    const account = await wallet.connect({
      // pass the client you created with `createThirdwebClient()`
      client,
    });

    if (!address) {
      console.log("User is not connected");
      return;
    }
    // console.log("User Address:", address);

    try {
      // Initialize provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const code = await provider.getCode(contract.address);
      // console.log("Contract Code:", code);
      if (code === "0x") {
        throw new Error("Contract code not found on chain.");
      }

      const price = await readContract({
        contract,
        method: resolveMethod("listingPrice"),
        params: [],
      });
      // console.log("Listing Price (wei):", price.toString());

      const transaction = await prepareContractCall({
        contract,
        method: resolveMethod("uploadCertificate"),
        params: [
          title,
          certificateID,
          userEmail,
          organisation,
          "gk",
          address,
          certificate,
        ],
        overrides: {
          value: price.toString(),
          gasLimit: ethers.utils.hexlify(300000), // Gas limit set here
        },
      });

      // console.log("Prepared Transaction:", transaction);
      // console.log("Account:", account);

      const { transactionHash } = await sendTransaction({
        // assuming you have called `prepareTransaction()` or `prepareContractCall()` before which returns the prepared transaction to send
        transaction,
        // Pass the account to sign the transaction with
        account,
      });

      // console.log(transactionHash);

      // console.log(title, description, certificateID, userEmail, organisation, AuthInfo.authID, AuthInfo.authEmail, address, transactionHash, certificate )

      const apiResponse = await axios.post("/api/v1/nfts", {
        title: title,
        description: description,
        certificateID: certificateID,
        userEmail: userEmail,
        organisation: organisation,
        creatorID: "gk",
        creatorEmail: "gk@gmail.com",
        address: address,
        transactionHash: transactionHash,
        certificate: certificate,
      });

      console.log(apiResponse);

      setIsLoading(false);
      window.location.reload();
    } catch (error) {
      setIsLoading(false);
      console.error("Error in Uploading Image:", error);
      if (error.data && error.data.message) {
        console.error("Smart Contract Error:", error.data.message);
      }
      if (error.error && error.error.message) {
        console.error("Transaction Error:", error.error.message);
      }
    }
  };

  // Get Contracts
  const getAllCertificates = async () => {
    // All Images by call "getAllNFTs" defined in Solidity Code
    try {
      const data = await readContract({
        contract,
        method: resolveMethod("getAllCertificates"),
        params: [],
      });
      return { "No. of Certificates": data.length, certificates: data };
    } catch (error) {
      console.log(`Error in Fetching all Certificates: ${error}`);
    }
  };

  // Fetch Single Image
  const getCertificate = async (certificateID) => {
    try {
      const data = await readContract({
        contract,
        method: resolveMethod("fetchNFTByCertificateID"),
        params: [certificateID],
      });

      return data;
    } catch (error) {
      console.log(`Error in Fetching Image: ${error}`);
    }
  };

  // All NFTs API
  const getAllNFTsAPI = async () => {
    const response = await axios({
      method: "GET",
      url: "/api/v1/nfts",
    });
  };

  // Single NFT API
  const getSingleNFTAPI = async (req) => {
    try {
      const data = JSON.parse(req);
      const response = await axios.post("/api/v1/nfts/verify", {
        certificateID: data.certificateID,
        userEmail: data.userEmail,
      });
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || "Internal Server Error")
      console.log(`Error in Fetching the Specific Certificate: ${error}`);
    }
  };

  const checkCertIDPresent = async (certID) => {
    try {
      const response = await axios({
        method: "GET",
        url: `/api/v1/nfts/check/${certID}`,
      });
      return response.data.exists;
    } catch (error) {
      console.log(`Error in Checking Certificate ID: ${error}`);
    }
  };

  return (
    <StateContext.Provider
      value={{
        // Contracts
        address,
        contract,
        connect,
        disconnect,
        userBalance,
        setUserBalance,
        isLoading,
        setIsLoading,

        // Functions
        UploadCertificate,
        getAllCertificates,
        getCertificate,
        checkCertIDPresent,

        // APIs
        getAllNFTsAPI,
        getSingleNFTAPI,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
