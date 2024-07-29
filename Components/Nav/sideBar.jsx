import { Button, Dropdown, Menu } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import {
  RiAdminFill,
  RiArrowDropDownLine,
  RiSideBarFill,
  RiUser3Fill,
} from "react-icons/ri";
import { Link as ScrollLink, Events } from "react-scroll";

const Sidebar = ({ sectionRefs }) => {
  const [activePath, setActivePath] = React.useState("");
  const router = useRouter();
  const [activeSection, setActiveSection] = React.useState("home");

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

  React.useEffect(() => {
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

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setActivePath(window.location.pathname);
    }
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
          <ul className="flex flex-grow min-h-full justify-between items-stretch flex-col gap-y-5">
            <div className="flex flex-col gap-y-5 justify-center font-bold">
              {["home", "about", "blog", "contact"].map((section) => (
                <ScrollLink
                  key={section}
                  to={section}
                  smooth={true}
                  duration={500}
                  className={`relative cursor-pointer ${
                    activeSection === section
                      ? "text-green-500 underline"
                      : "text-white/80"
                  }`}
                >
                  <li className="relative">
                    <div>
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </div>
                  </li>
                </ScrollLink>
              ))}
            </div>
            <li>
              <div className="flex flex-grow justify-center items-center">
                <Dropdown
                  overlay={menu}
                  className="hover:cursor-pointer"
                  trigger={["hover"]}
                >
                  <a className="flex justify-end mr-10 items-center font-bold ant-dropdown-link">
                    Log In <RiArrowDropDownLine className="text-3xl" />
                  </a>
                </Dropdown>
                <Link href="/user-signup" passHref>
                  <Button className="border-[#22674E] hover:bg-[#15C586] btn rounded-md px-6 bg-transparent text-white font-bold border-2 border-solid">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
