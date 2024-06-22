import React from "react";
import { Button, Dropdown, Menu } from "antd";
import { RiAdminFill, RiArrowDropDownLine, RiUser3Fill } from "react-icons/ri";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

const DashNav = () => {
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link href="/user-login" passHref>
          <Button className=" bg-[#15C586] border-0 text-black font-bold p-5">
            Login as User <RiUser3Fill className="font-bold text-xl" />
          </Button>
        </Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link href="/auth-login" passHref>
          <Button className=" bg-[#15C586] border-0 text-black font-bold p-5 mt-1">
            Login as Auth <RiAdminFill className="font-bold text-xl" />
          </Button>
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="bg-[#02291B] w-full flex px-5 pt-2 pb-2 justify-center items-center z-50 fixed border-b-2 border-gray-500">
      <div className="flex justify-start items-center mr-52 font-extrabold text-3xl">
        <span>
          <img src="./Logo.png" alt="Logo" className="w-24" />
        </span>
        Synergy
      </div>
      <nav className="mr-52">
        <div className="flex justify-center gap-10 font-bold">
          <Link href="/home" duration={500}>
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

      <UserButton afterSignOutUrl="/" className="w-full h-full" />
    </div>
  );
};

export default DashNav;
