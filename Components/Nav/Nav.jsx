import React, { useState, useEffect, useRef } from "react";
import { Button, Dropdown, Menu } from "antd";
import { RiAdminFill, RiArrowDropDownLine, RiUser3Fill } from "react-icons/ri";
import { Link as ScrollLink, Events } from "react-scroll";
import Link from "next/link";
import Sidebar from "./sideBar";

const Nav = ({ sectionRefs }) => {
  const [activeSection, setActiveSection] = useState("home");

  const handleScroll = () => {
    const offsets = Object.keys(sectionRefs).map((section) => {
      const ref = sectionRefs[section].current;
      return { section, offsetTop: ref ? ref.offsetTop : 0 };
    });

    const scrollPosition = window.scrollY + window.innerHeight / 2;
    const currentSection = offsets.reduce((closest, section) => {
      return Math.abs(section.offsetTop - scrollPosition) <
        Math.abs(closest.offsetTop - scrollPosition)
        ? section
        : closest;
    });

    setActiveSection(currentSection.section);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    Events.scrollEvent.register("begin", function (to) {
      setActiveSection(to);
    });

    Events.scrollEvent.register("end", function (to) {
      setActiveSection(to);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, []);

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
    <>
      <div className="w-full hidden lg:block lg:fixed items-baseline z-50 bg-[#02291B]">
        <div className="bg-[#02291B] w-full flex px-5 xl:px-20 pt-2 pb-0 justify-between items-center z-50">
          <div className="flex flex-grow justify-start items-center font-extrabold text-3xl uppercase">
            <span>
              <img src="./Logo.png" alt="Logo" className="w-24" />
            </span>
            Synergy
          </div>
          <nav className="flex flex-grow justify-center items-center text-xl xl:text-2xl">
            <div className="flex justify-center gap-10 font-bold">
              {["home", "about", "blog", "contact"].map((section) => (
                <ScrollLink
                  key={section}
                  to={section}
                  smooth={true}
                  duration={500}
                  className={`relative cursor-pointer ${
                    activeSection === section
                      ? "text-green-500"
                      : "text-white/80"
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                  <span
                    className={`absolute left-0 bottom-0 w-full h-[2px] bg-green-500 transition-transform duration-300 ease-in-out transform ${
                      activeSection === section ? "scale-x-100" : "scale-x-0"
                    }`}
                  ></span>
                </ScrollLink>
              ))}
            </div>
          </nav>
          <div className="flex flex-grow justify-end items-center">
            <Dropdown
              overlay={menu}
              className="hover:cursor-pointer"
              trigger={["hover"]}
            >
              <a className="flex justify-end mr-10 xl:text-xl items-center font-bold ant-dropdown-link">
                Log In <RiArrowDropDownLine className="text-3xl" />
              </a>
            </Dropdown>
            <Link href="/user-signup" passHref>
              <Button className="border-[#22674E] hover:bg-[#15C586] xl:text-xl btn rounded-md px-6 bg-transparent text-white font-bold border-2 border-solid">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex justify-center flex-grow">
          <hr className="w-full mt-3" />
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
            <Sidebar sectionRefs={sectionRefs} />
          </nav>
        </div>
        <div className="flex justify-center flex-grow">
          <hr className="w-full mt-3" />
        </div>
      </div>
    </>
  );
};

export default Nav;
