import React from "react";
import { Button, Dropdown, Menu } from "antd";
import { RiAdminFill, RiArrowDropDownLine, RiUser3Fill } from "react-icons/ri";
import { Link as ScrollLink } from "react-scroll";

import Link from "next/link";

const Nav = () => {
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
          <ScrollLink to="home" smooth={true} duration={500}>
            Home
          </ScrollLink>
          <ScrollLink to="about" smooth={true} duration={500}>
            About
          </ScrollLink>
          <ScrollLink to="blog" smooth={true} duration={500}>
            Blog
          </ScrollLink>
          <ScrollLink to="contact" smooth={true} duration={500}>
            Contact Us
          </ScrollLink>
        </div>
      </nav>

      <Dropdown
        overlay={menu}
        className="hover:cursor-pointer "
        trigger={["hover"]}
      >
        <a className="flex justify-end mr-10 font-bold align-middle items-center ant-dropdown-link">
          Log In <RiArrowDropDownLine className="text-3xl" />
        </a>
      </Dropdown>

      <Button className="border-[#22674E] rounded-md p-6 bg-transparent text-white font-bold border-2 border-solid">
        Sign Up
      </Button>
    </div>
  );
};

export default Nav;
