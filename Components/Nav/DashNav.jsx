import React, { useEffect } from "react";
import { Button, Dropdown, Menu } from "antd";
import { RiLogoutBoxRLine } from "react-icons/ri";
import Link from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const DashNav = () => {
  const router = useRouter();
  const [user, setUser] = React.useState("");

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      if (localStorage.getItem("auth-info")) {
        toast.success("Logged out Successfully");
        localStorage.removeItem("NFTApi Token");
        localStorage.removeItem("auth-info");
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
    const userData = localStorage.getItem("auth-info");
    setUser(JSON.parse(userData));
  }, []);

  console.log(user);

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Button
          onClick={(e) => handleLogout(e)}
          className=" bg-[#15C586] border-0 text-black flex flex-grow font-bold p-5"
        >
          Log Out <RiLogoutBoxRLine className="font-bold text-xl" />
        </Button>
      </Menu.Item>
      {/* <Menu.Item key="1">
        <Link href="/auth-login" passHref>
          <Button className=" bg-[#15C586] border-0 text-black font-bold p-5 mt-1">
            Login as Auth <RiAdminFill className="font-bold text-xl" />
          </Button>
        </Link>
      </Menu.Item> */}
    </Menu>
  );

  return (
    <div className="bg-[#02291B] w-full flex px-5 pt-2 pb-2 items-center z-50 fixed border-b-2 border-gray-500">
      <div
        className={`flex ${
          router.pathname == "/user-dashboard" ? "flex-grow" : "flex-grow-0"
        } justify-start items-center font-extrabold text-3xl`}
      >
        <span>
          <img src="./Logo.png" alt="Logo" className="w-24" />
        </span>
        Synergy
      </div>
      {router.pathname !== "/user-dashboard" ? (
        <nav className="flex flex-grow justify-center">
          <div className="flex flex-grow justify-center gap-10 font-bold">
            <Link href="/user-dashboard" duration={500}>
              Home
            </Link>
            <Link href="/about" duration={500}>
              Upload
            </Link>
            <Link href="/validation" duration={500}>
              Validate
            </Link>
          </div>
        </nav>
      ) : null}

      <Dropdown
        overlay={menu}
        className="hover:cursor-pointer"
        trigger={["hover"]}
      >
        <a
          className={`flex justify-end mr-10 font-bold align-middle text-white items-center ant-dropdown-link`}
        >
          {user?.firstName} {user?.lastName}
          <img
            src="./User_Icon.png"
            alt="User Icon"
            className="w-12 flex justify-end items-center ml-2"
          />
        </a>
      </Dropdown>
    </div>
  );
};

export default DashNav;
