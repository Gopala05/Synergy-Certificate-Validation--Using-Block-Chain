"use client";

import { useRouter } from "next/navigation";
import DashNav from "../../Components/Nav/DashNav";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

import { Form, Logo, Notification, Profile, Upload } from "../../Components";
import { useStateContext } from "../../Context/NFTs";
import { Button, Card, Input } from "antd";

const ValidationPage = () => {
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
    getAllCertificates,
    getCertificate,

    // APIs
    getAllNFTsAPI,
    getSingleNFTAPI,
  } = useStateContext();

  const navigate = useRouter();
  const [id, setID] = useState("");
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(false);
  const [display, setDisplay] = useState(false);

  const fetchDatabaseData = async (body) => {
    try {
      const data = await getSingleNFTAPI(body);
      return data;
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  };

  const fetchNFT = async (certID) => {
    try {
      const data = await getCertificate(certID);
      return data;
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  };

  const handleVerification = async (id, email) => {
    const body = JSON.stringify({
      certificateID: id,
      userEmail: email,
    });
    const certificateInDB = await fetchDatabaseData(body);
    const certificateOnNet = await fetchNFT(id);

    if (certificateInDB && certificateOnNet) {
      if (
        certificateInDB.data.NFT.certificateID ===
          certificateOnNet.certificateID &&
        certificateInDB.data.NFT.userEmail === certificateOnNet.userEmail
      ) {
        setDisplay(true);
        setValid(true);
        setID("");
        setEmail("");
      } else {
        setDisplay(true);
        setValid(false);
        setID("");
        setEmail("");
      }
    }
  };

  return (
    <div className="h-[100vh] w-full justify-center items-center flex">
      <Card className="flex justify-center items-cente text-center">
        <Input
          onChange={(e) => setID(e.target.value)}
          className="w-full "
          placeholder="Certificate ID"
        />
        <Input onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="mt-5" />
        <div className="flex w-full justify-center">
        <Button onClick={() => handleVerification(id, email)} className="mt-5 flex justify-center">Validate</Button>
        </div>
      </Card>
      {isLoading && (
        <div className="loader">
          <Logo />
        </div>
      )}
      {display && valid && <div>Certificate is valid!</div>}
      {display && !valid && <div>Certificate is not valid.</div>}
    </div>
  );
};

export default ValidationPage;
