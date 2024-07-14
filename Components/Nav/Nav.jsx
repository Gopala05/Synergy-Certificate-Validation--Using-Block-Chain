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
          <Button className="bg-[#15C586] hover:bg-[#15C586] btn border-0 text-black font-bold px-5">
            Login as User <RiUser3Fill className="font-bold text-xl" />
          </Button>
        </Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link href="/auth-login" passHref>
          <Button className="bg-[#15C586] hover:bg-[#15C586] btn border-0 text-black font-bold px-5 mt-1">
            Login as Auth <RiAdminFill className="font-bold text-xl" />
          </Button>
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="w-full fixed items-baseline z-50 bg-[#02291B]">
      <div className="bg-[#02291B] w-full flex px-5 pt-2 pb-0 justify-center items-center z-50 ">
        <div className="flex justify-start items-center mr-52 font-extrabold text-3xl">
          <span>
            <img src="./Logo.png" alt="Logo" className="w-24" />
          </span>
          Synergy
        </div>
        <nav className="mr-52 mt-5">
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
          className="hover:cursor-pointer mt-5"
          trigger={["hover"]}
        >
          <a className="flex justify-end mr-10 font-bold align-middle items-center ant-dropdown-link">
            Log In <RiArrowDropDownLine className="text-3xl" />
          </a>
        </Dropdown>
        <Link href="/user-signup" passHref>
          <Button className="border-[#22674E] hover:bg-[#15C586] btn rounded-md px-6 bg-transparent text-white font-bold border-2 border-solid mt-5">
            Sign Up
          </Button>
        </Link>
      </div>
      <div className="flex justify-center">
        <img src="./Nav.svg" alt="svg" className="w-[84vw] ml-10" />
      </div>
    </div>
  );
};

export default Nav;
