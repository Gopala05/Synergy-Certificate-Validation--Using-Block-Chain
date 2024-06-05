"use client";

import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import {
  useAddress,
  useContract,
  useMetamask,
  useDisconnect,
  useSigner,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { readContract, resolveMethod } from "thirdweb";
import { prepareContractCall, sendTransaction } from "thirdweb";
import { prepareEvent, getContractEvents } from "thirdweb";
import { createWallet } from "thirdweb/wallets";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {

  // Create the client with your clientId or secretKey if in a server environment
  const client = createThirdwebClient({
    clientId: "8002c45f6d7a966cd8c620311d57f4f6",
    secretKey:
      "Ojx1OoeewFSm0-EZKCiV6gCa2TwF5q1W1Bw088fvzvrMouPn83EveDiTg3tlC49ZjhqdkLNkJaLXxMDzKFsPag",
  });

  // Connect to your contract
  const contract = getContract({
    client,
    chain: defineChain(84532),
    address: "0x0502Bf2C8eB0CcbBA49cc2648C345388eAf736eF",
  });

  // initialize the wallet, you can pick any of the 300+ wallet connectors supported
// wallet ids are typed, let your TS editor autocomplete them for you
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
  const UploadImage = async (imageInfo) => {

    const { title, description, email, category, image } = imageInfo;

      // connect the wallet, this returns a promise that resolves to the connected account
const account = await wallet.connect({
  // pass the client you created with `createThirdwebClient()`
  client,
});
console.log(account, imageInfo)
    if (!address) {
      console.log("User is not connected");
      return;
    }
    console.log("User Address:", address);

    try {
      // Initialize provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      console.log({ signer });
      console.log(provider.getCode(address));

      const code = await provider.getCode(contract.address);
      console.log("Contract Code:", code);
      if (code === "0x") {
        throw new Error("Contract code not found on chain.");
      }

      const price = await readContract({
        contract,
        method: resolveMethod("listingPrice"),
        params: [],
      });
      console.log("Listing Price (wei):", price.toString());

      // const preparedEvent = prepareEvent({
      //   contract,
      //   signature: "UploadAttempt",
      // });
      // const events = await getContractEvents({
      //   contract,
      //   events: [preparedEvent],
      // });

      // console.log(events)

      const transaction = await prepareContractCall({
        contract,
        method: resolveMethod("uploadIPFS"),
        params: [address, image, title, description, email, category],
        overrides: {
          value: price.toString(),
          gasLimit: ethers.utils.hexlify(217138), // Gas limit set here
        },
      });

      const { transactionHash } = await sendTransaction({
        // assuming you have called `prepareTransaction()` or `prepareContractCall()` before which returns the prepared transaction to send
        transaction,
        // Pass the account to sign the transaction with
        account,
      });

      console.log(transactionHash)
      console.log("Prepared Transaction:", transaction);

      const gasPrice = await provider.getGasPrice();
      const tx = {
        to: transaction.to,
        data: transaction.data,
        value: transaction.overrides.value,
        gasLimit: transaction.overrides.gasLimit,
        gasPrice: gasPrice, // Set gas price here
      };

      console.log(tx);

      // const response = await signer.sendTransaction(tx);
      // console.log("Transaction Response:", response);

      // const receipt = await response.wait();
      // console.log("Transaction Receipt:", receipt);
      // console.log("Transaction Receipt:", receipt.status);

      // if (receipt.status === 0) {
      //   console.log("Transaction Receipt:", receipt);
      // }

      // if (receipt.status === 0) {
      //   throw new Error("Transaction failed");
      // }

      const apiResponse = await axios.post("/api/v1/nfts", {
        title: title,
        description: description,
        category: category,
        image: image,
        address: address,
        email: email,
      });
      console.log("API Response:", apiResponse);
      console.log(`Contract Call Successful: ${transaction}`);

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
  const getAllImages = async () => {
    // All Images by call "getAllNFTs" defined in Solidity Code
    const images = await readContract({
      contract,
      method: resolveMethod("getAllNFTs"),
      params: [],
    });

    // Upload Count
    const uploadCount = await readContract({
      contract,
      method: resolveMethod("imagesCount"),
      params: [],
    });
    // Price
    const price = await readContract({
      contract,
      method: resolveMethod("listingPrice"),
      params: [],
    });

    const allImages = images.map((image, index) => ({
      id: index + 1,
      owner: image.creator,
      title: image.title,
      description: image.description,
      category: image.category,
      fundraised: image.fundraised,
      image: image.image,
      imageID: image.id,
      createdAt: image.timestamp,
      listedAmount: ethers.utils.formatEther(price.toString()),
      totalUploads: uploadCount,
    }));
    return allImages;
  };

  // Fetch Single Image
  const singleImage = async (id) => {
    try {
      const data = await readContract({
        contract,
        method: resolveMethod("listingPrice"),
        params: [id],
      });

      const image = {
        title: data[0],
        description: data[1],
        email: data[2],
        category: data[3],
        fundRaised: ethers.utils.formatEther(data[4].toString()),
        creator: data[5],
        imageURL: data[6],
        createdAt: data[7].toNumber(),
        imageID: data[8].toNumber(),
      };
      return image;
    } catch (error) {
      console.log(`Error in Fetching Image: ${error}`);
    }
  };

  // Donate Function
  const donation = async ({ id, amount }) => {
    try {
      // const transaction = await contract.call("donateToImage", [id], {
      //   value: amount.toString(),
      // });
      const transaction = await prepareContractCall({
        contract,
        method: resolveMethod("donateToImage"),
        params: [id],
      });
      console.log(transaction);
      window.location.reload();
    } catch (error) {
      console.log(`Error in Donation: ${error}`);
    }
  };

  // Interaction with Contract
  // All NFTs API
  const getAllNFTsAPI = async () => {
    const response = await axios({
      method: "GET",
      url: "/api/v1/nfts",
    });
  };

  // Single NFT API
  const getSingleNFTAPI = async (id) => {
    const res = await axios({
      method: "get",
      url: `/api/v1/nfts/${id}`,
    });
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
        UploadImage,
        getAllImages,
        singleImage,
        donation,

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
