import React from "react";
import Image from "next/image";

import { YouTube, Twitter, Instagram, GitHub, FormSVG } from "../SVG";
import style from "./Profile.module.css";
import images from "../Image/client/index";

const Profile = ({ userBalance, setOpenProfile, address }) => {
  return (
    <>
      <div className={style.card}>
        <div className={style.img}>
          <Image
            className="avatar_img"
            src={images.client1}
            width={80}
            height={80}
            onClick={() => setOpenProfile(true)}
          />
        </div>

        {/* <span>{address.slice(0, 25)}</span> */}
        <span>dssDw34</span>

        <p className={style.info}>
          {userBalance} Welcome to NFTs IPFS upload Certificate for Validation.
        </p>

        <div className={style.share}>
          <a href="">
            <GitHub />
          </a>
          <a href="">
            <Twitter />
          </a>
          <a href="">
            <Instagram />
          </a>
          <a href="">
            <YouTube />
          </a>
        </div>

        <button onClick={() => setOpenProfile(false)}>Close</button>
      </div>
    </>
  );
};

export default Profile;
