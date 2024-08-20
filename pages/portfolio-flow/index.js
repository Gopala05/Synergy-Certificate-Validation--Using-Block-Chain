import { useState } from "react";
import DashNav from "../../Components/Nav/DashNav";
import { cn } from "../../utils/utils";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useRouter } from "next/navigation";

const PortfolioFlow = () => {
  const router = useRouter();

  const [showAll, setShowAll] = useState(false);
  const [showDrawer1, setShowDrawer1] = useState(false);
  const [showDrawer2, setShowDrawer2] = useState(false);
  const [showDrawer3, setShowDrawer3] = useState(false);
  const [showDrawer4, setShowDrawer4] = useState(false);
  const [showDrawer5, setShowDrawer5] = useState(false);
  const [showDrawer6, setShowDrawer6] = useState(false);
  const [showDrawer7, setShowDrawer7] = useState(false);
  const [showDrawer8, setShowDrawer8] = useState(false);

  const openDrawers = () => {
    setShowAll(true);

    setTimeout(() => setShowDrawer1(true), 0);
    setTimeout(() => setShowDrawer2(true), 400);
    setTimeout(() => setShowDrawer3(true), 800);
    setTimeout(() => setShowDrawer4(true), 1200);
    setTimeout(() => setShowDrawer5(true), 1600);
    setTimeout(() => setShowDrawer6(true), 2000);
    setTimeout(() => setShowDrawer7(true), 2400);
    setTimeout(() => setShowDrawer8(true), 2800);
  };

  const closeDrawers = () => {
    setShowAll(false);

    setTimeout(() => setShowDrawer8(false), 0);
    setTimeout(() => setShowDrawer7(false), 400);
    setTimeout(() => setShowDrawer6(false), 800);
    setTimeout(() => setShowDrawer5(false), 1200);
    setTimeout(() => setShowDrawer4(false), 1600);
    setTimeout(() => setShowDrawer3(false), 2000);
    setTimeout(() => setShowDrawer2(false), 2400);
    setTimeout(() => setShowDrawer1(false), 2800);
  };

  return (
    <c>
      <DashNav />
      <div className="flex items-center justify-center h-screen pt-[10vh]">
        <img
          className="w-[80vw] h-[85vh] rounded-[3rem]"
          src="/Portfolio_Flow.jpg"
          alt="Portfolio-Flow Image"
        />
        <div className="absolute top-28 left-8 z-30">
          <button
            onClick={() => router.back()}
            type="primary"
            className="btn bg-gradient-to-r from-green-400 to-green-600 text-black font-bold text-lg"
          >
            <RiArrowGoBackFill />
            Back
          </button>
        </div>
        <div className="absolute libre-franklin bottom-14 left-56 z-30 text-[#3d3e42] font-bold uppercase text-[2.5rem]">
          <div className="text-[#144f53] text-2xl tracking-wider font-dubai-medium font-bold">
            SYNERGY
          </div>
          Portfolio Flow
          <div className="text-[#144f53] text-2xl tracking-[0.5rem] ml-1 font-dubai-medium font-bold">
            Infographics
          </div>
        </div>
        <button
          onClick={!showAll ? openDrawers : closeDrawers}
          className="btn absolute top-40 right-60 bg-gradient-to-r from-green-400 to-green-600 text-xl border-0 text-black hover:text-white rounded-2xl font-bold hover:shadow-green-600"
        >
          {!showAll ? "View All" : "Close All"}
        </button>

        {/* Portfolio */}
        <div
          className={cn(
            "dropdown dropdown-hover dropdown-top absolute left-[17.5vw] transition-all",
            showDrawer1 && "dropdown-open"
          )}
        >
          <div
            tabIndex={0}
            role="button"
            className="btn bg-transparent shadow-none rounded-full px-[7.5vw] py-[14.3vh] border-none hover:bg-transparent"
          ></div>
          <ul
            tabIndex={0}
            className="list-decimal dropdown-content mb-7 mt-5 bg-transparent text-black text-sm font-semibold rounded-box z-[1] pl-20 w-72 transform -translate-y-1/4"
          >
            <div className="bg-clip-text text-start text-[#066dc9] font-extrabold uppercase text-xl mb-2">
              Portfolio
            </div>
            <li className="text-left">Navigate to Login as User Page.</li>
            <li className="text-left">Enter the Credentials.</li>
            <li className="text-left">Navigate to Portfolio Page.</li>
          </ul>
        </div>

        {/* General Details */}
        <div
          className={cn(
            "dropdown dropdown-hover dropdown-right absolute left-[41.2vw] top-[21vh] transition-all",
            showDrawer2 && "dropdown-open"
          )}
        >
          <div
            tabIndex={0}
            role="button"
            className="btn bg-transparent shadow-none rounded-full px-[3vw] py-[5.5vh] border-none hover:bg-transparent"
          ></div>
          <ul
            tabIndex={0}
            className="list-decimal dropdown-content ml-11 mt-6 bg-transparent text-black text-sm font-semibold rounded-box z-[1] pl-3 w-72 transform -translate-y-1/4"
          >
            <div className="bg-clip-text text-start text-[#066dc9] font-extrabold uppercase text-xl mb-2">
              General Details
            </div>
            <li className="text-left">Basic Details of the User.</li>
            <li className="text-left">
              GitHub, LinkedIn, Slack, LeetCode profiles.
            </li>
            <li className="text-left">Designation of the User.</li>
          </ul>
        </div>

        {/* Profile Info */}
        <div
          className={cn(
            "dropdown dropdown-hover dropdown-right absolute left-[48.4vw] top-[38.6vh] transition-all",
            showDrawer3 && "dropdown-open"
          )}
        >
          <div
            tabIndex={0}
            role="button"
            className="btn bg-transparent shadow-none rounded-full px-[3vw] py-[5.5vh] border-none hover:bg-transparent"
          ></div>
          <ul
            tabIndex={0}
            className="list-decimal dropdown-content ml-8 mt-6 bg-transparent text-black text-sm font-semibold rounded-box z-[1] pl-3 w-72 transform -translate-y-1/4"
          >
            <div className="bg-clip-text text-start text-[#066dc9] font-extrabold uppercase text-xl mb-2">
              Profile Info
            </div>
            <li className="text-left">User's bio.</li>
            <li className="text-left">User's Career details.</li>
            <li className="text-left">User's Profession.</li>
          </ul>
        </div>

        {/* Education */}
        <div
          className={cn(
            "dropdown dropdown-hover dropdown-right absolute right-[28.4vw] top-[26vh] transition-all",
            showDrawer4 && "dropdown-open"
          )}
        >
          <div
            tabIndex={0}
            role="button"
            className="btn bg-transparent shadow-none rounded-full px-[3vw] py-[5.5vh] border-none hover:bg-transparent"
          ></div>
          <ul
            tabIndex={0}
            className="list-decimal dropdown-content ml-8 mt-6 bg-transparent text-black text-sm font-semibold rounded-box z-[1] pl-3 w-72 transform -translate-y-1/4"
          >
            <div className="text-start text-[#066dc9] font-extrabold uppercase text-xl mb-2">
              Education
            </div>
            <li className="text-left">User's Qualifications.</li>
            <li className="text-left">User's Hobbies.</li>
            <li className="text-left">User's Soft Skills.</li>
          </ul>
        </div>

        {/* Experience */}
        <div
          className={cn(
            "dropdown dropdown-hover dropdown-right absolute right-[23.5vw] top-[48.5vh] transition-all",
            showDrawer5 && "dropdown-open"
          )}
        >
          <div
            tabIndex={0}
            role="button"
            className="btn bg-transparent shadow-none rounded-full px-[3vw] py-[5.5vh] border-none hover:bg-transparent"
          ></div>
          <ul
            tabIndex={0}
            className="list-decimal dropdown-content ml-8 mt-6 bg-transparent text-black text-sm font-semibold rounded-box z-[1] pl-3 w-72 transform -translate-y-1/4"
          >
            <div className="text-start text-[#066dc9] font-extrabold uppercase text-xl mb-2">
              Experience
            </div>
            <li className="text-left">User's Professional Expertice.</li>
            <li className="text-left">User's Work Skills.</li>
            <li className="text-left">User's Projects.</li>
          </ul>
        </div>

        {/* Contact */}
        <div
          className={cn(
            "dropdown dropdown-hover dropdown-right absolute right-[35.8vw] bottom-[26.5vh] transition-all",
            showDrawer6 && "dropdown-open"
          )}
        >
          <div
            tabIndex={0}
            role="button"
            className="btn bg-transparent shadow-none rounded-full px-[3vw] py-[5.5vh] border-none hover:bg-transparent"
          ></div>
          <ul
            tabIndex={0}
            className="list-decimal dropdown-content ml-8 mt-6 bg-transparent text-black text-sm font-semibold rounded-box z-[1] pl-3 w-72 transform -translate-y-1/4"
          >
            <div className="text-start text-[#066dc9] font-extrabold uppercase text-xl mb-2">
              Contact Info
            </div>
            <li className="text-left">User's Contact details.</li>
            <li className="text-left">Sending a mail to the User.</li>
            <li className="text-left">User's Mail details.</li>
          </ul>
        </div>

        {/* Academic Certificate */}
        <div
          className={cn(
            "dropdown dropdown-hover dropdown-right absolute right-[26.5vw] bottom-[13.7vh] transition-all",
            showDrawer7 && "dropdown-open"
          )}
        >
          <div
            tabIndex={0}
            role="button"
            className="btn bg-transparent shadow-none rounded-full px-[3vw] py-[5.5vh] border-none hover:bg-transparent"
          ></div>
          <ul
            tabIndex={0}
            className="list-decimal dropdown-content ml-8 mt-7 bg-transparent text-black text-sm font-semibold rounded-box z-[1] pl-3 w-72 transform -translate-y-1/4"
          >
            <div className="text-start text-[#066dc9] font-extrabold uppercase text-xl mb-2">
              Academic Certificate
            </div>
            <li className="text-left">SSLC Certificate.</li>
            <li className="text-left">PUC Certificate.</li>
            <li className="text-left">Graduation Certificate.</li>
          </ul>
        </div>

        {/* Non Academic Certificate */}
        <div
          className={cn(
            "dropdown dropdown-hover dropdown-bottom absolute left-[35.5vw] bottom-[15.7vh] transition-all",
            showDrawer8 && "dropdown-open"
          )}
        >
          <div
            tabIndex={0}
            role="button"
            className="btn bg-transparent shadow-none rounded-full px-[3vw] py-[5.5vh] border-none hover:bg-transparent"
          ></div>
          <ul
            tabIndex={0}
            className="list-decimal dropdown-content mt-10 bg-transparent text-black text-sm font-semibold rounded-box z-[1] pr-3 w-96 transform -translate-y-1/4"
          >
            <div className="text-start text-[#066dc9] font-extrabold uppercase text-xl mb-1">
              Non - Academic Certificate
            </div>
            <li className="text-left">Courses Certificate.</li>
            <li className="text-left">Skill Certificate.</li>
            <li className="text-left">Achievement Certificate.</li>
          </ul>
        </div>
      </div>
    </c>
  );
};

export default PortfolioFlow;
