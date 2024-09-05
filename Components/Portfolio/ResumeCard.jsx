import React from "react";
import { cn } from "../../utils/utils";

const ResumeCard = ({ bgColor, year, title, subtitle }) => {
  return (
    <div
      className={cn(
        "shadow-xl shadow-black/20 hover:scale-110 transition-all w-full rounded-2xl px-5 py-6 items-start flex flex-col gap-y-2 text-sm font-bold",
        bgColor
      )}
    >
      <div className="flex justify-start w-full items-center text-gray-500">
        <div>{year}</div>
      </div>
      <div className="text-lg normal-case text-start font-bold">{title}</div>
      <div className="text-base font-semibold normal-case text-start">
        {subtitle}
      </div>
    </div>
  );
};

export default ResumeCard;
