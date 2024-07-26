import { Dropdown, Menu } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { RiLogoutBoxRLine, RiSideBarFill } from "react-icons/ri";

const DashSideBar = () => {
  const [auth, setAuth] = React.useState("");
  const [user, setUser] = React.useState("");
  const router = useRouter();
  const [activeSection, setActiveSection] = React.useState(router.pathname);

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
  console.log(activeSection);

  return (
    <div className="drawer flex justify-end pr-5 lg:drawer-open drawer-end z-50">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer-4"
          className="drawer-button btn bg-[#15C586] border-none btn-primary lg:hidden"
        >
          <RiSideBarFill />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu bg-base-200 text-white text-2xl min-h-full w-80 px-4 py-2 gap-y-5">
          <div className="flex items-center w-full justify-start">
            <img src="./Logo.png" alt="Logo" className="w-32" />
            <span className="text-3xl font-extrabold">SYNERGY</span>
          </div>
          <hr className="border-1" />
          <ul className="flex flex-grow min-h-full justify-between items-stretch flex-col">
            <li>
              <div className="flex flex-col justify-center items-start gap-y-10">
                <Link
                  className={`relative cursor-pointer ${
                    activeSection === "/auth-home" ||
                    activeSection === "/user-home"
                      ? "text-green-500"
                      : "text-white/80"
                  }`}
                  href={auth ? "/auth-home" : "/user-home"}
                  duration={500}
                >
                  Home
                  <span
                    className={`absolute left-0 bottom-0 w-16 h-[2px] bg-green-500 transition-transform duration-300 ease-in-out transform ${
                      activeSection === "/auth-home" ||
                      activeSection === "/user-home"
                        ? "scale-x-100"
                        : "scale-x-0"
                    }`}
                  ></span>
                </Link>
                {auth ? (
                  <Link
                    className={`relative cursor-pointer ${
                      activeSection === "/upload"
                        ? "text-green-500"
                        : "text-white/80"
                    }`}
                    href="/upload"
                    duration={500}
                  >
                    Upload
                    <span
                      className={`absolute left-0 bottom-0 w-20 h-[2px] bg-green-500 transition-transform duration-300 ease-in-out transform ${
                        activeSection === "/upload"
                          ? "scale-x-100"
                          : "scale-x-0"
                      }`}
                    ></span>
                  </Link>
                ) : null}
                <Link
                  className={`relative cursor-pointer ${
                    activeSection === "/validation"
                      ? "text-green-500"
                      : "text-white/80"
                  }`}
                  href="/validation"
                  duration={500}
                >
                  Validate
                  <span
                    className={`absolute left-1 bottom-0 w-20 h-[2px] bg-green-500 transition-transform duration-300 ease-in-out transform ${
                      activeSection === "/validation"
                        ? "scale-x-100"
                        : "scale-x-0"
                    }`}
                  ></span>
                </Link>
                <Link
                  className={`relative cursor-pointer ${
                    activeSection === "/support"
                      ? "text-green-500"
                      : "text-white/80"
                  }`}
                  href="/support"
                  duration={500}
                >
                  Support
                  <span
                    className={`absolute left-0 bottom-0 w-24 h-[2px] bg-green-500 transition-transform duration-300 ease-in-out transform ${
                      activeSection === "/support" ? "scale-x-100" : "scale-x-0"
                    }`}
                  ></span>
                </Link>
                <Link
                  className={`relative cursor-pointer ${
                    activeSection === "/guide"
                      ? "text-green-500"
                      : "text-white/80"
                  }`}
                  href="/guide"
                  duration={500}
                >
                  Guide
                  <span
                    className={`absolute left-0 bottom-0 w-16 h-[2px] bg-green-500 transition-transform duration-300 ease-in-out transform ${
                      activeSection === "/guide" ? "scale-x-100" : "scale-x-0"
                    }`}
                  ></span>
                </Link>
              </div>
            </li>
            <li>
              <div className="flex flex-grow justify-end items-center">
                <span className="text-white text-lg font-bold">
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
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashSideBar;
