import { useRouter } from 'next/router';
import Link from "next/link";
import { Footer } from "../Components";

export default function Custom404() {
  const router = useRouter();
  const { message, state } = router.query; // Get message from query parameters

  return (
    <div className="h-[100vh] flex flex-col bg-white text-[#073E2A]">
      <div className="w-full fixed items-baseline z-50 bg-[#02291B]">
        <div className="bg-white w-full flex px-5 pt-2 pb-0 justify-start items-center z-50">
          <div className="flex justify-start items-center font-bold text-3xl">
            <span>
              <img src="./Logo.png" alt="Logo" className="w-24" />
            </span>
            Synergy
          </div>
        </div>
      </div>
      <div className="flex-grow flex flex-col justify-center gap-y-2 items-center">
        <div className="text-5xl font-sans font-bold">
          404 - {state || 'PAGE NOT FOUND'}
        </div>
        <p className="text-xl font-sans font-bold">
          {message || "The requested URL was not found"}
        </p>
        <img src="./404_Metamask.png" alt="404 Image" />
      </div>
      <div className="flex justify-center">
        <hr className="border-black border-1 w-[90vw]" />
      </div>
      <footer className="bg-white p-3 relative text-center cursor-pointer">
        <p className="font-semibold m-1 text-xl flex items-center justify-center lg:tracking-wide">
          <span className="flex items-start text-sm m-0 p-0">©&nbsp;</span>{" "}
          Copyright 2024 |<span className="ml-1">All Rights Reserved</span>
          &nbsp;| SYNERGY
        </p>
      </footer>
    </div>
  );
}
