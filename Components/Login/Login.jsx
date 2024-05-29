import React, { useState } from "react";
import axios from "axios";

import { FormSVG, Lock } from "../SVG/index";
import style from "./Login.module.css";
import { Notification } from "../index";

const Login = ({ notification, setLogin, setSignup, setNotification }) => {
  // API Login
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setUser({ ...user, [fieldName]: e.target.value });
  };

  const apiLogin = async (e) => {
    e.preventDefault();

    if (user.email == "" || user.password == "") {
      return setNotification("Please fill out all fields");
    }

    try {
      const response = await axios({
        method: "POST",
        url: "/api/v1/users/sign-in",
        withCredentials: true,
        data: {
          email: user.email,
          password: user.password,
        },
      });
      console.log(response.data)

      if (response.data.status == "Success") {
        setNotification("Signed in Successfully");
        localStorage.setItem("NFTApi Token", response.data.token);
        setLogin(false);
        setNotification("");
        window.location.reload();
      } else if (response.data.status == "Bad Request") {
        setNotification(response.data.message);
      }
    } catch (error) {
      console.log("Error in Login: ", error);
    }
  };
  return (
    <>
      <div className={style.card}>
        <div className={style.card2}>
          <form className={style.form}>
            <p id="heading" className={style.heading}>
              Login
            </p>

            <div className={style.field}>
              <FormSVG styleClass={style.input_icon} />
              <input
                type="text"
                className={style.input_field}
                placeholder="Email"
                autoComplete="off"
                onChange={(e) => handleFormFieldChange("email", e)}
              />
            </div>

            <div className={style.field}>
              <Lock styleClass={style.input_icon} />
              <input
                type="text"
                className={style.input_field}
                placeholder="Password"
                onChange={(e) => handleFormFieldChange("password", e)}
              />
            </div>

            <div className={style.btn}>
              <button className={style.button1} onClick={() => setLogin(false)}>
                Close
              </button>
            </div>

            <button className={style.button3} onClick={(e) => apiLogin(e)}>
              Login
            </button>
          </form>
        </div>
      </div>

      {/* Notification */}
      {notification !== "" && (
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      )}
    </>
  );
};

export default Login;
