import React from "react";

import style from "./Button.module.css";

const Button = ({ disconnect, connect, address, file }) => {
  return (
    <>
      {address ? (
        <button onClick={() => disconnect()} className={style.button}>
          <span className={style.button_content}>
            {file ? "Upload" : "Disconnect"}
          </span>
        </button>
      ) : (
        <button onClick={() => connect()} className={style.button}>
          <span className={`${style.button_content} lg:text-3xl text-xl`}>Connect Metamask Wallet</span>
        </button>
      )}
    </>
  );
};

export default Button;
