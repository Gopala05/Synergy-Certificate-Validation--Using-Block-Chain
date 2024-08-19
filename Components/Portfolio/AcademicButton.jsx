import React from "react";

const AcademicButton = ({ title, board, verified }) => {
  return (
    <div className="flex w-full">
    <button class="btn flex w-full bg-gradient-to-r from-[#FF9C1A] to-[#E80505] text-white font-mediium rounded-3xl p-1">
      <div class="flex w-full px-6 pl-16 justify-start bg-[#EBB9F8] text-black rounded-3xl py-2 text-4xl">
        <div className="flex w-full justify-start gap-x-12">
          <div className="p-2 px-0">{title}</div>
          <div>
            <div className="bg-gradient-to-r h-full rounded-full py-6 from-[#FF9C1A] to-[#E80505] px-[2px]"></div>
          </div>
          <div className="p-2 px-0">{board}</div>
        </div>
        <div className="p-2 px-0">
          {verified && (
            <img
              src="/Icons/Verified.png"
              alt="Verified Icon"
              className="w-10"
            />
          )}
        </div>
      </div>
    </button>
    </div>
  );
};

export default AcademicButton;
