import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import style from "./Card.module.css";
import images from "../Image/client/index";
import imageNFT from "../Image/index";

const Card = ({ setNotification, details, index }) => {
  return (
    <div className={style.card}>
      <div className={style.content}>
        {/* <a href={`/image/${details.imageID}`}> */}
        <a href={`/image/1`}>
          <p>
            {/* <img */}
            <Image
              className={style.image}
              // src={details.image}
              src={imageNFT.img1}
              alt="image"
              width={250}
              height={200}
            />
          </p>
        </a>

        <span className={style.para}>
          <Image
            className="avatar_img"
            src={images[`client1`]}
            // src={images[`client${index + 1}`]}
            width={40}
            height={40}
          />
          <small
            className={style.para_small}
            onClick={() => (
              setNotification("Successfully Copied"),
              // navigator.clipboard.writeText(details.owner)
              navigator.clipboard.writeText("Successfully Copied")
            )}
          >
            0xD389eyhgsfyudb
            {/* {details.owner.slice(0, 25)}... */}
          </small>
        </span>

        <span>
          {/* Created At: {new Date(details.createdAt * 1000).toDateString()} */}
          Jun 27 24
          {/* <small className={style.number}>#{details.imageID}</small> */}
          <small>#1</small>
        </span>

        {/* <small className={style.para}>
          {details.description.slice(0, 80)}...
        </small> */}
        <small>Description</small>

        <button
          onClick={() => (
            setNotification("Image URL is Successfully copied"),
            // navigator.clipboard.writeText(details.image)
            navigator.clipboard.writeText("Image URL is Successfully copied")
          )}
          className={style.btn}
        >
          Copy URL
        </button>
      </div>
    </div>
  );
};

export default Card;
