import React, { useEffect } from "react";
import { Dropdown, Menu } from "antd";
import { RiLogoutBoxRLine } from "react-icons/ri";
import Link from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import DashSideBar from "./DashSideBar";
import { upgradeHook } from "../../hooks/upgrade-model";

const DashNav = () => {
  const router = useRouter();
  const [auth, setAuth] = React.useState("");
  const [user, setUser] = React.useState("");
  const [activeSection, setActiveSection] = React.useState(router.pathname);
  const plansHook = upgradeHook();

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
    if (router.pathname !== "/valid" && router.pathname !== "/evault") {
      if (localStorage.getItem("cert-user"))
        localStorage.removeItem("cert-user");
      if (localStorage.getItem("NFT")) localStorage.removeItem("NFT");
      if (localStorage.getItem("NFTs")) localStorage.removeItem("NFTs");
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

  useEffect(() => {
    setActiveSection(router.pathname);
  }, [router]);

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <button
          onClick={(e) => handleLogout(e)}
          className="bg-gradient-to-r from-green-400 to-green-600 hover:bg-[#15C586] border-none btn flex items-center text-black font-bold text-lg px-5"
        >
          Log Out <RiLogoutBoxRLine className="font-bold text-xl" />
        </button>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className="bg-[#02291B] w-full hidden lg:flex px-5 pt-2 pb-2 items-center z-50 fixed border-b-2 border-gray-500">
        <div
          className={`flex flex-grow justify-start items-center font-extrabold text-3xl`}
        >
          <span>
            <img src="./Logo.png" alt="Logo" className="w-24" />
          </span>
          Synergy
        </div>

        {router.pathname == "/user-home" ||
        router.pathname == "/auth-home" ? null : (
          <nav className="flex flex-grow text-md xl:text-xl justify-center">
            <div className="flex justify-center gap-10 font-bold">
              <Link
                className={`relative cursor-pointer ${
                  (!plansHook.isOpen && activeSection === "/auth-home") ||
                  (!plansHook.isOpen && activeSection === "/user-home")
                    ? "text-green-500"
                    : "text-white/80"
                }`}
                href={auth ? "/auth-home" : "/user-home"}
                duration={500}
              >
                Home
                <span
                  className={`absolute left-0 bottom-0 w-full h-[2px] bg-green-500 transition-transform duration-300 ease-in-out transform ${
                    (!plansHook.isOpen && activeSection === "/auth-home") ||
                    (!plansHook.isOpen && activeSection === "/user-home")
                      ? "scale-x-100"
                      : "scale-x-0"
                  }`}
                ></span>
              </Link>
              {auth ? (
                <Link
                  className={`relative cursor-pointer ${
                    !plansHook.isOpen && activeSection === "/upload"
                      ? "text-green-500"
                      : "text-white/80"
                  }`}
                  href="/upload"
                  duration={500}
                >
                  Upload
                  <span
                    className={`absolute left-0 bottom-0 w-full h-[2px] bg-green-500 transition-transform duration-300 ease-in-out transform ${
                      !plansHook.isOpen && activeSection === "/upload"
                        ? "scale-x-100"
                        : "scale-x-0"
                    }`}
                  ></span>
                </Link>
              ) : null}
              <Link
                className={`relative cursor-pointer ${
                  !plansHook.isOpen && activeSection === "/validation"
                    ? "text-green-500"
                    : "text-white/80"
                }`}
                href="/validation"
                duration={500}
              >
                Validate
                <span
                  className={`absolute left-0 bottom-0 w-full h-[2px] bg-green-500 transition-transform duration-300 ease-in-out transform ${
                    !plansHook.isOpen && activeSection === "/validation"
                      ? "scale-x-100"
                      : "scale-x-0"
                  }`}
                ></span>
              </Link>

              <Link
                className={`relative cursor-pointer ${
                  !plansHook.isOpen && activeSection === "/support"
                    ? "text-green-500"
                    : "text-white/80"
                }`}
                href="/support"
                duration={500}
              >
                Support
                <span
                  className={`absolute left-0 bottom-0 w-full h-[2px] bg-green-500 transition-transform duration-300 ease-in-out transform ${
                    !plansHook.isOpen && activeSection === "/support"
                      ? "scale-x-100"
                      : "scale-x-0"
                  }`}
                ></span>
              </Link>
              <Link
                className={`relative cursor-pointer ${
                  !plansHook.isOpen && activeSection === "/guide"
                    ? "text-green-500"
                    : "text-white/80"
                }`}
                href="/guide"
                duration={500}
              >
                Guide
                <span
                  className={`absolute left-0 bottom-0 w-full h-[2px] bg-green-500 transition-transform duration-300 ease-in-out transform ${
                    !plansHook.isOpen && activeSection === "/guide"
                      ? "scale-x-100"
                      : "scale-x-0"
                  }`}
                ></span>
              </Link>
              {auth ? null : (
                <div
                  className={`relative cursor-pointer ${
                    plansHook.isOpen ? "text-green-500" : "text-white/80"
                  }`}
                  onClick={plansHook.onOpen}
                  duration={500}
                >
                  Pricing
                  <span
                    className={`absolute left-0 bottom-0 w-full h-[2px] bg-green-500 transition-transform duration-300 ease-in-out transform ${
                      plansHook.isOpen ? "scale-x-100" : "scale-x-0"
                    }`}
                  ></span>
                </div>
              )}
            </div>
          </nav>
        )}

        <div className="flex flex-grow justify-end items-center">
          <span className="text-white text-xl xl:text-3xl font-bold">
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
                src={auth ? "./Admin.png" : "./User_Name.jpg"}
                alt={auth ? "Auth Icon" : "User Icon"}
                className={`${
                  auth ? "w-14" : "w-14 rounded-full"
                } flex justify-end items-center ml-5`}
              />
            </a>
          </Dropdown>
        </div>
      </div>
      <div className="w-full block lg:hidden fixed items-baseline z-50 bg-[#02291B]">
        <div className="bg-[#02291B] w-full flex p-2 pb-0 justify-between items-center z-50">
          <div className="flex flex-grow justify-start items-center font-extrabold text-2xl">
            <span>
              <img src="./Logo.png" alt="Logo" className="w-20" />
            </span>
            Synergy
          </div>
          <nav className="flex flex-grow justify-end items-center text-xl">
            <DashSideBar />
          </nav>
        </div>
        <div className="flex justify-center flex-grow">
          <hr className="w-full mt-3" />
        </div>
      </div>
    </>
  );
};

export default DashNav;
