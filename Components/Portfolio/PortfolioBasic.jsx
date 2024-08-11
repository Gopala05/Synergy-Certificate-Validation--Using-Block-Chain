import { Download, FileEdit } from "lucide-react";

const PortfolioBasic = ({ user }) => {
  return (
    <div className="flex justify-center items-center pl-10 w-full">
      <div className="bg-white flex justify-center rounded-2xl w-60 absolute z-20 top-10 border-2 border-black">
        <img
          src="./GK.jpg"
          alt="User Image"
          className="w-52 h-48 flex justify-center"
        />
      </div>
      <div className="bg-[#FFFFFF] gap-y-8 text-black flex flex-col w-96 rounded-3xl justify-start items-center mt-44 pt-20 pb-5">
        <div className="flex justify-center flex-col gap-y-2">
          <div className="text-2xl font-bold flex justify-center w-full">
            {user?.name}
          </div>
          <div className="text-gray-600 flex justify-center w-full">
            Full Stack Developer
          </div>
          <div className="flex w-full justify-center gap-x-3">
            <div className="bg-[#F2F7FC] rounded-lg py-2 px-3 flex items-center">
              <img src="./Icons/GitHub.png" alt="GitHub Icon" className="w-8" />
            </div>
            <div className="bg-[#F2F7FC] rounded-lg py-2 px-3 flex items-center">
              <img
                src="./Icons/LinkedIn.png"
                alt="LinkedIn Icon"
                className="w-6"
              />
            </div>
            <div className="bg-[#F2F7FC] rounded-lg py-2 px-3 flex items-center">
              <img src="./Icons/Slack.png" alt="Slack Icon" className="w-6" />
            </div>
            <div className="bg-[#F2F7FC] rounded-lg py-2 px-3 flex items-center">
              <img
                src="./Icons/LeetCode.png"
                alt="LeetCode Icon"
                className="w-6"
              />
            </div>
          </div>
        </div>
        <div className="bg-[#F2F5F9] w-[21rem] rounded-lg py-5 px-10 flex flex-col items-center gap-y-5">
          {/* Phone */}
          <div className="flex flex-row w-full justify-start gap-x-3 items-center">
            <div className="w-8 flex justify-center">
              <img src="./Icons/Phone.png" alt="Phone Icon" className="w-4" />
            </div>
            <div className="flex flex-col justify-center text-start">
              <div className="text-gray-500 flex justify-start w-full font-semibold">
                Phone
              </div>
              <div className="text-black flex justify-start w-full font-semibold">
                +91 6360318731
              </div>
            </div>
          </div>
          <hr className="border border-[#E3E3E3] w-full" />

          {/* Email */}
          <div className="flex flex-row w-full justify-start gap-x-3 items-center">
            <div className="w-8 flex justify-center">
              <img src="./Icons/Email.png" alt="Email Icon" className="w-6" />
            </div>
            <div className="flex flex-col justify-center text-start ">
              <div className="text-gray-500 flex justify-start w-full font-semibold">
                Email
              </div>
              <div className="text-black flex justify-start w-full font-semibold">
                {user?.userEmails[0]}
              </div>
            </div>
          </div>
          <hr className="border border-[#E3E3E3] w-full" />

          {/* Location */}
          <div className="flex flex-row w-full justify-start gap-x-3 items-center">
            <div className="w-8 flex justify-center">
              <img
                src="./Icons/Location.png"
                alt="Location Icon"
                className="w-5"
              />
            </div>
            <div className="flex flex-col justify-center text-start">
              <div className="text-gray-500 flex justify-start w-full font-semibold">
                Location
              </div>
              <div className="text-black flex justify-start w-full font-semibold">
                Bangalore
              </div>
            </div>
          </div>
          <hr className="border border-[#E3E3E3] w-full" />
          <button className="btn hover:scale-110 transition-all w-48 border-none bg-gradient-to-r from-[#FF9C1A] to-[#E80505] rounded-full text-white">
            <Download /> Download Resume
          </button>
          <button className="btn hover:scale-110 transition-all w-48 flex justify-start pr-10 border-none bg-gradient-to-r from-[#FF9C1A] to-[#E80505] rounded-full text-white">
            <FileEdit /> <label className="ml-1">Edit Profile</label>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioBasic;
