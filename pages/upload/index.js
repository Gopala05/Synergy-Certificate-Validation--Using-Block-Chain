"use client";
import { useState, useEffect, useRef } from "react";
import { Col, Row } from "antd";
import axios from "axios";
import DashNav from "../../Components/Nav/DashNav";
import { Button, Form, Logo, Upload, Footer } from "../../Components";
import { useStateContext } from "../../Context/NFTs";
import generateCertificateID from "../../utils/IDGenerator";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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

  const [closeForm, setCloseForm] = useState(true);
  const [file, setFile] = useState(null);
  const [display, setDisplay] = useState(null);
  const [auth, setAuth] = useState(null);
  const toastShownRef = useRef(false);

  const router = useRouter();

  const [imageInfo, setImageInfo] = useState({
    title: "",
    description: "",
    userEmail: "",
    organisation: "",
  });

  useEffect(() => {
    const authData = localStorage.getItem("auth-info");
    if (!authData) {
      router.replace("/auth-login");
      if (!toastShownRef.current) {
        toast("Please Login First", {
          icon: "🚫",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        toastShownRef.current = true;
      }
    } else {
      setAuth(JSON.parse(authData));
    }
  }, [router]);

  if (!auth) {
    return (
      <div className="loader">
        <Logo />
      </div>
    );
  }

  const handleFormChange = (fieldName, e) => {
    setImageInfo({ ...imageInfo, [fieldName]: e.target.value });
  };

  // Upload
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setCloseForm(false);
    let certificateID = generateCertificateID();
    let isPresent = await checkCertIDPresent(certificateID);

    while (isPresent) {
      certificateID = generateCertificateID();
      isPresent = await checkCertIDPresent(certificateID);
    }

    try {
      if (file && certificateID) {
        setIsLoading(true);
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
            certificateID: certificateID,
          });

          setFile(null);
        } catch (error) {
          setIsLoading(false);
          toast.error(error.response?.data?.message || "Internal Server Error");
          console.log("Error in Uploading Image: ", error);
        }
      } else {
        setIsLoading(false);
        setFile(null);
        toast.error("Certificate file Not found");
      }
      setFile(null);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response?.data?.message || "Internal Server Error");
      console.log(`Error in Checking Certificate ID Presence: ${error}`);
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
  return (
    <>
      <DashNav />
      <Row className="flex w-full h-full items-center">
        <Col
          lg={11}
          className="flex items-center h-full lg:h-[93vh] justify-center flex-col gap-y-10 lg:pl-16"
        >
          <img
            src="/Upload_Metamask.png"
            alt="Upload Image"
            className=" lg:w-[35vw] pt-20"
          />
        </Col>
        <Col
          lg={13}
          className="flex flex-col gap-y-10 justify-center items-center pt-16"
        >
          <div className="flex justify-center items-center">
            <Row className="flex justify-center items-center gap-10">
              {address ? (
                <img className="w-24" src="/Metamask.png" alt="Image" />
              ) : (
                <img className="w-24" src="/Metamask-BW.png" alt="Image" />
              )}

              <Button
                address={address}
                connect={connect}
                disconnect={disconnect}
                file={file}
              />
            </Row>
          </div>
          <Upload
            onImageChange={onImageChange}
            display={display}
            address={address}
            retrieveFile={retrieveFile}
          />
        </Col>
        <Row className="flex w-full">
          <Col lg={24}>
            <Footer />
          </Col>
        </Row>
      </Row>

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
    </>
  );
};

export default DashboardPage;
