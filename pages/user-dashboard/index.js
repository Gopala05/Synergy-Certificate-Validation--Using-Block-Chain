"use client";

import { useRouter } from "next/navigation";
import DashNav from "../../Components/Nav/DashNav";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

import {
  Button,
  Form,
  Logo,
  Notification,
  Profile,
  Upload,
} from "../../Components";
import { useStateContext } from "../../Context/NFTs";

const DashboardPage = () => {
  const {
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
    singleImage,
    checkCertIDPresent,

    // APIs
    getAllNFTsAPI,
    getSingleNFTAPI,
  } = useStateContext();

  const [openProfile, setOpenProfile] = useState(false);
  const [closeForm, setCloseForm] = useState(true);
  const [file, setFile] = useState(null);
  const [display, setDisplay] = useState(null);
  const [notification, setNotification] = useState("");

  const [imageInfo, setImageInfo] = useState({
    title: "",
    description: "",
    certificateID: "",
    userEmail: "",
    organisation: "",
  });

  const handleFormChange = (fieldName, e) => {
    setImageInfo({ ...imageInfo, [fieldName]: e.target.value });
  };

  // Upload
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setCloseForm(false);
    setIsLoading(true);
    if (imageInfo.certificateID) {
      try {
        const isPresent = checkCertIDPresent(imageInfo.certificateID);

        if (!isPresent && file) {
          try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await axios({
              method: "post",
              url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
              data: formData,
              headers: {
                pinata_api_key: process.env.PINATA_API_KEY,
                pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
                "Content-Type": "multipart/form-data",
              },
            });

            const image = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

            await UploadCertificate({
              ...imageInfo,
              certificate: image,
            });

            setFile(null);
          } catch (error) {
            console.log("Error in Uploading Image: ", error);
          }
        }
        setFile(null);
      } catch (error) {
        console.log(`Error in Checking Certificate ID Presence: ${error}`);
      }
    }
  };

  // Retrive Image
  const retrieveFile = (e) => {
    const data = e.target.files[0];

    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    e.preventDefault();
  };

  // Take Image
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setDisplay(URL.createObjectURL(event.target.files[0]));
    }
  };
  const navigate = useRouter();
  return (
    <div className="h-[100vh]">
      <DashNav />
      <div>Dashboard</div>
      <div className="upload">
        <Upload
          onImageChange={onImageChange}
          display={display}
          address={address}
          retrieveFile={retrieveFile}
        />

        <div className="upload-info">
          <h1>Welcome to Certificate Validation System</h1>
          <p>
            Upload your image file here and validate a unique digital
            certificate.
          </p>

          <div className="avatar">
            <Button
              address={address}
              connect={connect}
              disconnect={disconnect}
              file={file}
            />

            {address && (
              <p>
                <Image
                  className="avatar_img"
                  src="/Metamask.png"
                  alt="Image"
                  width={40}
                  height={40}
                  onClick={() => setOpenProfile(true)}
                />
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification !== "" && (
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      )}

      {/* Profile */}
      {openProfile && (
        <div className="profile">
          <Profile
            setOpenProfile={setOpenProfile}
            userBalance={userBalance}
            address={address}
          />
        </div>
      )}

      {/* Loader */}
      {isLoading && (
        <div className="loader">
          <Logo />
        </div>
      )}

      {/* Form */}
      {file && closeForm && (
        <div className="form">
          <div className="form_inner">
            <Form
              setFile={setFile}
              setDisplay={setDisplay}
              handleFormFieldChange={handleFormChange}
              handleSubmit={onSubmitHandler}
              // setCategory={setCategory}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
