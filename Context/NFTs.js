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

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    process.env.THIRDWEB_GENERATED_KEY 
  );

  // Get the user address by using "useAddress" hook
  const address = useAddress();

  // Connect to Metamask
  const connect = useMetamask();

  // Frontend
  const disconnect = useDisconnect();
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
    data();
  }, []);

  // Contract Functions
  // Upload
  const UploadImage = async (imageInfo) => {
    const { title, description, email, category, image } = imageInfo;
    try {
      // Price
      const price = await contract.call("listingPrice");

      // Call the "uploadIPFS" defined in the Solidity code
      const createNFTs = await contract.call(
        "uploadIPFS",
        [address, image, title, description, email, category],
        {
          value: price.toString(),
        }
      );

      // Store the data in API
      const response = await axios({
        method: "POST",
        url: "/api/v1/nfts",
        data: {
          title,
          description,
          category,
          image,
          address,
          email,
        },
      });

      console.log(response);
      console.log(`Contract Call Successful: ${createNFTs}`);

      setIsLoading(false);
      window.location.reload();
    } catch (error) {
      console.log(`Error in Uploading Image: ${error}`);
    }
  };

  // Get Contracts
  const getAllImages = async () => {
    // All Images by call "getAllNFTs" defined in Solidity Code
    const images = await contract.call("getAllNFTs");

    // Upload Count
    const uploadCount = await contract.call("imagesCount");

    // Price
    const price = await contract.call("listingPrice");

    const allImages = images.map((image, index) => ({
      id: index + 1,
      owner: image.creator,
      title: image.title,
      description: image.description,
      category: image.category,
      fundraised: image.fundraised,
      image: image.image,
      imageID: image.id.toNumber(),
      createdAt: image.timestamp.toNumber(),
      listedAmount: ethers.utils.formatEther(price.toString()),
      totalUploads: uploadCount.toNumber(),
    }));
    return allImages;
  };

  // Fetch Single Image
  const singleImage = async (id) => {
    try {
      const data = await contract.call("getImage", [id]);

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
      const transaction = await contract.call("donateToImage", [id], {
        value: amount.toString(),
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
