// pages/_error.js
import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";

const Error = () => {
  const router = useRouter();
  return (
    <div className="h-[100vh] flex flex-col bg-white text-[#073E2A]">
      <div className="w-full fixed items-baseline z-50 bg-[#02291B]">
        <div className="bg-white w-full flex pr-3 lg:px-5 pt-2 pb-0 justify-start items-center z-50">
          <div className="flex justify-start items-center font-bold text-2xl md:text-3xl">
            <span>
              <img src="./Logo.png" alt="Logo" className="lg:w-24 w-40" />
            </span>
            Synergy
          </div>
        </div>
      </div>
      <div className="flex-grow flex flex-col justify-center  gap-y-4 items-center">
        <div className="text-3xl lg:text-5xl font-sans font-bold">
          Something went wrong. Please try again later.
        </div>
        <Link href="/">
          <p className="tex-lg md:text-xl underline font-sans font-bold hover:italic">
            Go to Home
          </p>
        </Link>
        <img
          src="/Error_Metamask.png"
          alt="Error Image"
          className="w-96 md:w-96 lg:w-auto"
        />
        <button
          onClick={() => router.back()}
          className="btn hover:scale-110 transition-all bg-gradient-to-r w-96 md:w-96 lg:w-[30vw] from-green-400 to-green-600 text-base md:text-xl border-0 text-black hover:text-white rounded-full font-bold hover:shadow-green-600"
        >
          <ArrowLeft />
          Click here to return to the previous page
        </button>
      </div>
      <div className="flex justify-center">
        <hr className="border-black border-1 w-[90vw]" />
      </div>
      <footer className="bg-white p-3 relative text-center cursor-pointer">
        <p className="font-semibold m-1 text-sm md:text-xl flex items-center justify-center lg:tracking-wide">
          <span className="flex items-start text-sm m-0 p-0">©&nbsp;</span>{" "}
          Copyright 2024 |<span className="ml-1">All Rights Reserved</span>
          &nbsp;| SYNERGY
        </p>
      </footer>
    </div>
  );
};

export default Error;
