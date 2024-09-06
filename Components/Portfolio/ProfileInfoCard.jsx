import React from "react";
import { cn } from "../../utils/utils";

const ProfileInfoCard = ({
  image,
  imageWidth,
  title,
  description,
  bgColor,
}) => {
  return (
    <div
      className={cn(
        "shadow-xl shadow-black/20 hover:scale-110 transition-all w-full rounded-2xl px-5 py-4 items-center flex flex-col gap-y-5 text-2xl font-bold",
        bgColor
      )}
    >
      <div className="flex gap-x-5 justify-start w-full items-center">
        <div>
          <img
            src={image}
            alt="Coding Icon"
            className={cn("w-8", imageWidth)}
          />
        </div>
        <div>{title}</div>
      </div>
      <div className="font-fam text-[1.4rem] font-normal normal-case text-justify px-5">
        {`“${description}.”`}
      </div>
    </div>
  );
};

export default ProfileInfoCard;
