import { Dropdown, Menu } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { RiSideBarFill } from "react-icons/ri";
import { useUpgradeHook } from "../../hooks/upgrade-model";
import { CreditCard, LogOut, Settings } from "lucide-react";
import { cn } from "../../utils/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/Components/ui/dialog";

const DashSideBar = () => {
  const [auth, setAuth] = React.useState("");
  const [user, setUser] = React.useState("");
  const router = useRouter();
  const [activeSection, setActiveSection] = React.useState(router.pathname);
  const plansHook = useUpgradeHook();

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
    if (
      router.pathname !== "/portfolio-profile" &&
      router.pathname !== "/portfolio-education" &&
      router.pathname !== "/portfolio-experience" &&
      router.pathname !== "/portfolio-academic" &&
      router.pathname !== "/portfolio-non-academic" &&
      router.pathname !== "/portfolio-contact"
    ) {
      if (localStorage.getItem("portfolio-user"))
        localStorage.removeItem("portfolio-user");
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
                    className={`absolute left-0 bottom-0 w-16 h-[2px] bg-green-500 transition-transform duration-300 ease-in-out transform ${
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
                      className={`absolute left-0 bottom-0 w-20 h-[2px] bg-green-500 transition-transform duration-300 ease-in-out transform ${
                        !plansHook.isOpen && activeSection === "/upload"
                          ? "scale-x-100"
                          : "scale-x-0"
                      }`}
                    ></span>
                  </Link>
                ) : null}
                <Link
                  className={`relative cursor-pointer ${
                    (!plansHook.isOpen && activeSection === "/verification") ||
                    (!plansHook.isOpen &&
                      activeSection == "/academic-certificates") ||
                    (!plansHook.isOpen &&
                      activeSection == "/non-academic-certificates")
                      ? "text-green-500"
                      : "text-white/80"
                  }`}
                  href="/verification"
                  duration={500}
                >
                  Verification
                  <span
                    className={`absolute left-1 bottom-0 w-28 h-[2px] bg-green-500 transition-transform duration-300 ease-in-out transform ${
                      (!plansHook.isOpen &&
                        activeSection === "/verification") ||
                      (!plansHook.isOpen &&
                        activeSection == "/academic-certificates") ||
                      (!plansHook.isOpen &&
                        activeSection == "/non-academic-certificates")
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
                    className={`absolute left-0 bottom-0 w-24 h-[2px] bg-green-500 transition-transform duration-300 ease-in-out transform ${
                      !plansHook.isOpen && activeSection === "/support"
                        ? "scale-x-100"
                        : "scale-x-0"
                    }`}
                  ></span>
                </Link>
                <Link
                  className={`relative cursor-pointer ${
                    (!plansHook.isOpen && activeSection === "/guide") ||
                    (!plansHook.isOpen && activeSection === "/upload-flow") ||
                    (!plansHook.isOpen &&
                      activeSection === "/verification-flow") ||
                    (!plansHook.isOpen && activeSection === "/support-flow")
                      ? "text-green-500"
                      : "text-white/80"
                  }`}
                  href="/guide"
                  duration={500}
                >
                  Guide
                  <span
                    className={`absolute left-0 bottom-0 w-16 h-[2px] bg-green-500 transition-transform duration-300 ease-in-out transform ${
                      (!plansHook.isOpen && activeSection === "/guide") ||
                      (!plansHook.isOpen && activeSection === "/upload-flow") ||
                      (!plansHook.isOpen &&
                        activeSection === "/verification-flow") ||
                      (!plansHook.isOpen && activeSection === "/support-flow")
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
            </li>
            <li>
              <Dialog>
                <DialogTrigger className="flex w-full">
                  <div className="flex w-full justify-end items-center">
                    <span className="text-white text-lg font-bold w-full">
                      {user?.name} {auth?.firstName}&nbsp;
                      <span className="text-[#f6851b]">{auth?.lastName}</span>
                    </span>

                    <img
                      src={auth ? "./Admin.png" : "./User_Name.jpg"}
                      alt={auth ? "Auth Icon" : "User Icon"}
                      className={`${
                        auth ? "w-14" : "w-14 rounded-full"
                      } flex justify-end items-center ml-5`}
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="h-fit">
                  <DialogHeader>
                    <DialogDescription>
                      <div className="flex w-full flex-col text-2xl p-5 bg-transparent rounded-md text-white">
                        <div className="flex flex-col gap-y-5 w-full items-center">
                          <div className="flex justify-center items-center w-full">
                            <span className="text-[#f6851b] font-bold tracking-wider">
                              {user?.userName}
                              {auth?.authID}
                            </span>
                          </div>
                          <div className="flex justify-center items-center flex-col gap-y-5 w-full">
                            <div className="flex justify-center w-full">
                              <img
                                src={auth ? "./Admin.png" : "./User_Name.jpg"}
                                alt={auth ? "Auth Icon" : "User Icon"}
                                className={`${
                                  auth ? "w-24" : "w-24 rounded-full"
                                } flex justify-end items-center`}
                              />
                            </div>
                            <div className="text-xl">
                              Hi,&nbsp;
                              <span className="font-bold">
                                {user?.name} {auth?.firstName}
                              </span>
                              !
                            </div>
                            <div className="flex justify-center w-full">
                              <button
                                onClick={(e) => router.push("/profile")}
                                className="rounded-full border-white px-8 border-2 text-xl py-2 hover:scale-105 transition-all"
                              >
                                Manage your Profile
                              </button>
                            </div>
                            <div className="flex w-full flex-col items-center justify-center rounded-xl gap-y-1">
                              {!auth && (
                                <>
                                  <div
                                    onClick={plansHook.onOpen}
                                    className="py-3 hover:scale-110 transition-all flex w-full justify-center items-center gap-x-3 rounded-t-2xl rounded-md text-lg bg-[#1b1b1b]"
                                  >
                                    <CreditCard className="w-5 h-5" />
                                    <span>Billing</span>
                                  </div>
                                  <div
                                    onClick={() => router.push("/settings")}
                                    className="py-3 hover:scale-110 transition-all flex w-full justify-center items-center gap-x-3 text-lg rounded-md bg-[#1b1b1b]"
                                  >
                                    <Settings className="w-5 h-5" />
                                    <span>Settings</span>
                                  </div>
                                </>
                              )}

                              <div
                                onClick={(e) => handleLogout(e)}
                                className={cn(
                                  "py-3 hover:scale-110 transition-all flex w-full justify-center items-center gap-x-3 text-lg rounded-md rounded-b-2xl bg-[#1b1b1b]",
                                  auth && "rounded-2xl"
                                )}
                              >
                                <LogOut className="w-5 h-5" />
                                <span>Log out</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashSideBar;
