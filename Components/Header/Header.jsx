import React, { useEffect, useState } from "react";
import Link from "next/link";

import style from "./Header.module.css";
import { Logo, Login, SignUp } from "../index";

const Header = ({ notification, setNotification }) => {
  const menuList = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About Us",
      link: "#",
    },
    {
      name: "API",
      link: "/nfts-api",
    },
  ];

  const [signup, setSignup] = useState(false);
  const [login, setLogin] = useState(false);
  const [token, setToken] = useState("");

  const openModel = (element) => {
    if (element == "Login") {
      setLogin(true);
      setSignup(false);
    } else if (element == "SignUp") {
      setSignup(true);
      setLogin(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("NFTApi Token");
    setToken(token);
  }, []);

  const logout = () => {
    localStorage.removeItem("NFTApi Token");
    window.location.reload();
  };

  return (
    <>
      <div className={style.Header}>
        <Logo />

        <div className={style.menu}>
          {menuList.map((menu, index) => (
            <Link className={style.link} href={menu.link} key={index + 1}>
              <p>{menu.name}</p>
            </Link>
          ))}

          {token ? (
            <p onClick={() => logout()}>Logout</p>
          ) : (
            <>
              <p onClick={() => openModel("Login")}>Login</p>
              <p onClick={() => openModel("SignUp")}>SignUp</p>
            </>
          )}
        </div>
      </div>

      {/* Sign Up */}
      {signup && (
        <div className={style.form}>
          <div className={style.form_inner}>
            <SignUp
              setLogin={setLogin}
              setSignup={setSignup}
              notification={notification}
              setNotification={setNotification}
            />
          </div>
        </div>
      )}

      {/* Sign In */}
      {login && (
        <div className={style.form}>
          <div className={style.form_inner}>
            <Login
              setLogin={setLogin}
              setSignup={setSignup}
              notification={notification}
              setNotification={setNotification}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
