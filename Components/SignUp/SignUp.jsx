import React, { useState } from "react";
import axios from "axios";

import { FormSVG, Lock } from "../SVG/index";
import style from "./SignUp.module.css";
import { Notification } from "../index";

const SignUp = ({ notification, setNotification, setLogin, setSignup }) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (fieldName, e) => {
    setUserInfo({ ...userInfo, [fieldName]: e.target.value });
  };

  const createAccount = async (e) => {
    e.preventDefault();
    if (!userInfo.name || !userInfo.email || !userInfo.password) {
      return setNotification("Provide all the Details");
    }
    setNotification("Creating an account...");

    try {
      const response = await axios({
        method: "post",
        url: "/api/v1/users/sign-up",
        withCredentials: true,
        data: {
          name: userInfo.name,
          email: userInfo.email,
          password: userInfo.password,
          confirmPassword: userInfo.confirmPassword,
        },
      });

      if (response.data.status == "Success") {
        setNotification("Account Created Successfully");
        localStorage.setItem("NFTApi Token", response.data.token);
        setSignup(false);
        setNotification("");
        window.location.reload();
      } else {
        setNotification(
          "An error occurred while creating your Account. Please Try Again Later."
        );
      }
    } catch (error) {
      console.log("Error in Creating an Account: ", error);
    }
  };
  return (
    <>
      <div className={style.card}>
        <div className={style.card2}>
          <form className={style.form}>
            <p id="heading" className={style.heading}>
              Sign Up
            </p>

            <div className={style.field}>
              <FormSVG styleClass={style.input_icon} />
              <input
                type="text"
                className={style.input_field}
                placeholder="Name"
                autoComplete="off"
                onChange={(e) => handleChange("name", e)}
              />
            </div>

            <div className={style.field}>
              <FormSVG styleClass={style.input_icon} />
              <input
                type="text"
                className={style.input_field}
                placeholder="Email"
                autoComplete="off"
                onChange={(e) => handleChange("email", e)}
              />
            </div>

            <div className={style.field}>
              <Lock styleClass={style.input_icon} />
              <input
                type="text"
                className={style.input_field}
                placeholder="Password"
                autoComplete="off"
                onChange={(e) => handleChange("password", e)}
              />
            </div>

            <div className={style.field}>
              <Lock styleClass={style.input_icon} />
              <input
                type="text"
                className={style.input_field}
                placeholder="Confirm Password"
                autoComplete="off"
                onChange={(e) => handleChange("confirmPassword", e)}
              />
            </div>

            <div className={style.btn}>
              <button
                className={style.button1}
                onClick={() => (setSignup(false), setLogin(true))}
              >
                &nbsp; &nbsp; Login &nbsp; &nbsp;
              </button>

              <button
                className={style.button2}
                onClick={() => setSignup(false)}
              >
                Close
              </button>
            </div>

            <button className={style.button3} onClick={(e) => createAccount(e)}>
              Sign Up
            </button>
          </form>
        </div>
      </div>

      {/* Notification */}
      {notification != "" && (
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      )}
    </>
  );
};

export default SignUp;
