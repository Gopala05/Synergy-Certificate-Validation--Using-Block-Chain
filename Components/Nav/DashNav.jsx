import React, { useEffect } from "react";
import { Dropdown, Menu } from "antd";
import { RiLogoutBoxRLine } from "react-icons/ri";
import Link from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const DashNav = () => {
  const router = useRouter();
  const [auth, setAuth] = React.useState("");
  const [user, setUser] = React.useState("");

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      if (localStorage.getItem("auth-info")) {
        toast.success("Logged out Successfully");
        localStorage.removeItem("Auth-Token");
        localStorage.removeItem("auth-info");
        router.push("/");
      } else if (localStorage.getItem("user-info")) {
        toast.success("Logged out Successfully");
        localStorage.removeItem("User-Token");
        localStorage.removeItem("user-info");
        router.push("/");
      } else if (response.data.status === "Bad Request") {
        toast.error(response.data.message);
      } else {
        toast.error("Unknown response status");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Internal Server Error");
      console.error("Error in Login: ", error);
    }
  };

  useEffect(() => {
    if (router.pathname !== "/valid") {
      if (localStorage.getItem("NFT")) {
        localStorage.removeItem("NFT");
      }
    }
    if (localStorage.getItem("auth-info")) {
      const authData = localStorage.getItem("auth-info");
      setAuth(JSON.parse(authData));
    }
    if (localStorage.getItem("user-info")) {
      const userData = localStorage.getItem("user-info");
      setUser(JSON.parse(userData));
    }
  }, []);

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <button
          onClick={(e) => handleLogout(e)}
          className="bg-[#15C586] border-0 text-black flex font-bold p-3"
        >
          Log Out <RiLogoutBoxRLine className="font-bold text-xl" />
        </button>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="bg-[#02291B] w-full flex px-5 pt-2 pb-2 items-center z-50 fixed border-b-2 border-gray-500">
      <div
        className={`flex ${
          router.pathname == "/user-home" || router.pathname == "/auth-home"
            ? "flex-grow"
            : "flex-grow-0"
        } justify-start items-center font-extrabold text-3xl`}
      >
        <span>
          <img src="./Logo.png" alt="Logo" className="w-24" />
        </span>
        Synergy
      </div>
      {router.pathname == "/user-home" ||
      router.pathname == "/auth-home" ? null : (
        <nav className="flex flex-grow justify-center">
          <div className="flex flex-grow justify-center gap-10 font-bold">
            <Link href={auth ? "/auth-home" : "/user-home"} duration={500}>
              Home
            </Link>
            {auth ? (
              <Link href="/upload" duration={500}>
                Upload
              </Link>
            ) : null}
            <Link href="/validation" duration={500}>
              Validate
            </Link>
            <Link href="/support" duration={500}>
              Support
            </Link>
          </div>
        </nav>
      )}

      <span className="text-white text-2xl font-bold">
        {user?.name} {auth?.firstName}&nbsp;
        <span className="text-[#f6851b]">{auth?.lastName}</span>
      </span>
      <Dropdown
        overlay={menu}
        className="hover:cursor-pointer"
        trigger={["hover"]}
      >
        <a
          className={`flex justify-end font-bold align-middle text-white items-center ant-dropdown-link`}
        >
          <img
            src={auth ? "./Auth_Icon.png" : "./User_Icon.png"}
            alt={auth ? "Auth Icon" : "User Icon"}
            className={`${
              auth ? "w-20" : "w-16"
            } flex justify-end items-center ml-5`}
          />
        </a>
      </Dropdown>
    </div>
  );
};

export default DashNav;
