import React from "react";
import Image from "next/image";

import { Delete, UploadIcon, File } from "../SVG/index";
import style from "./Upload.module.css";

const Upload = ({ display, retrieveFile, onImageChange }) => {
  return (
    <div className={style.container}>
      <div className={style.header}>
        {display == null ? (
          <>
            <UploadIcon />
            <p>Browse File to Upload!</p>
          </>
        ) : (
          <p>
            <Image
              className={style.image}
              src={display}
              alt="Image"
              width={200}
              height={200}
            />
          </p>
        )}
      </div>

      <label htmlFor="file" className={style.footer}>
        <File />
        <p>Not Selected a File</p>
        <Delete />
      </label>

      <input
        id="file"
        type="file"
        className={style.file}
        onChange={(e) => (onImageChange(e), retrieveFile(e))}
      />
    </div>
  );
};

export default Upload;
