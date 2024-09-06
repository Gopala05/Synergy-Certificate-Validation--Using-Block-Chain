import { useState } from "react";
import DashNav from "../../Components/Nav/DashNav";
import { cn } from "../../utils/utils";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useRouter } from "next/navigation";

const SupportFlow = () => {
  const router = useRouter();

  const [showAll, setShowAll] = useState(false);
  const [showDrawer1, setShowDrawer1] = useState(false);
  const [showDrawer2, setShowDrawer2] = useState(false);
  const [showDrawer3, setShowDrawer3] = useState(false);
  const [showDrawer4, setShowDrawer4] = useState(false);
  const [showDrawer5, setShowDrawer5] = useState(false);

  const openDrawers = () => {
    setShowAll(true);

    setTimeout(() => setShowDrawer1(true), 0);
    setTimeout(() => setShowDrawer2(true), 400);
    setTimeout(() => setShowDrawer3(true), 800);
    setTimeout(() => setShowDrawer4(true), 1200);
    setTimeout(() => setShowDrawer5(true), 1600);
  };

  const closeDrawers = () => {
    setShowAll(false);

    setTimeout(() => setShowDrawer5(false), 0);
    setTimeout(() => setShowDrawer4(false), 400);
    setTimeout(() => setShowDrawer3(false), 800);
    setTimeout(() => setShowDrawer2(false), 1200);
    setTimeout(() => setShowDrawer1(false), 1600);
  };

  return (
    <>
      <DashNav />
      <div className="flex items-center justify-center h-screen pt-[10vh]">
        <img
          className="w-[80vw] h-[85vh] rounded-[3rem]"
          src="/Support_Flow.jpg"
          alt="Support-Flow Image"
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
        <div className="absolute top-40 left-64 z-30 text-[#3d3e42] font-bold uppercase text-5xl">
          <div className="text-[#144f53] text-2xl tracking-wider font-dubai-medium font-bold">
            SYNERGY
          </div>
          Customer Support Flow Infographics
        </div>
        <button
          onClick={!showAll ? openDrawers : closeDrawers}
          className="btn absolute top-40 right-60 bg-gradient-to-r from-green-400 to-green-600 text-xl border-0 text-black hover:text-white rounded-2xl font-bold hover:shadow-green-600"
        >
          {!showAll ? "View All" : "Close All"}
        </button>

        {/* Navigation */}
        <div
          className={cn(
            "dropdown dropdown-hover dropdown-botom absolute left-[17.2vw] top-[52vh] transition-all",
            showDrawer1 && "dropdown-open"
          )}
        >
          <div
            tabIndex={0}
            role="button"
            className="btn bg-transparent shadow-none rounded-full px-[4vw] z-30 py-[8vh] border-none hover:bg-transparent"
          ></div>
          <ul
            tabIndex={0}
            className="list-decimal dropdown-content mt-16 bg-transparent text-black text-sm font-semibold rounded-box z-[1] pl-3 w-72 transform -translate-y-1/4"
          >
            <div className="bg-clip-text text-start pl-2 text-transparent bg-gradient-to-r from-[#1d7b87] via-[#1a7f89] to-[#1c6f81] font-extrabold uppercase text-xl mb-3">
              Navigation
            </div>
            <li className="text-left">Navigate to Login Page.</li>
            <li className="text-left">Enter the Credentials.</li>
            <li className="text-left">Click on the Login Button.</li>
          </ul>
        </div>

        {/* Query */}
        <div
          className={cn(
            "dropdown dropdown-hover dropdown-top absolute left-[31.7vw] top-[52vh] transition-all",
            showDrawer2 && "dropdown-open"
          )}
        >
          <div
            tabIndex={0}
            role="button"
            className="btn bg-transparent shadow-none rounded-full px-[4vw] py-[8vh] border-none hover:bg-transparent"
          ></div>
          <ul
            tabIndex={0}
            className="list-decimal dropdown-content mb-5 bg-transparent text-black text-sm font-semibold rounded-box z-[1] pl-3 w-72 transform -translate-y-1/4"
          >
            <div className="bg-clip-text text-start pl-7 text-transparent bg-gradient-to-r from-[#678d8b] via-[#3fa492] to-[#339d99] font-extrabold uppercase text-xl mb-3">
              Query
            </div>
            <li className="text-left">Navigate to Support Page.</li>
            <li className="text-left">Enter the Query.</li>
            <li className="text-left">Click on Submit Button.</li>
          </ul>
        </div>

        {/* Submission */}
        <div
          className={cn(
            "dropdown dropdown-hover dropdown-botom absolute left-[46.3vw] top-[52vh] transition-all",
            showDrawer3 && "dropdown-open"
          )}
        >
          <div
            tabIndex={0}
            role="button"
            className="btn bg-transparent shadow-none rounded-full px-[4vw] py-[8vh] border-none hover:bg-transparent"
          ></div>
          <ul
            tabIndex={0}
            className="list-decimal dropdown-content mt-16 bg-transparent text-black text-sm font-semibold rounded-box z-[1] pl-3 w-72 transform -translate-y-1/4"
          >
            <div className="bg-clip-text text-start pl-2 text-transparent bg-gradient-to-r from-[#e3a430] via-[#e39833] to-[#e57f34] font-extrabold uppercase text-xl mb-3">
              Submission
            </div>
            <li className="text-left">Upon clicking Submit.</li>
            <li className="text-left">A Confirmation Dialogue is shown.</li>
            <li className="text-left">A mail is sent to SYNERGY.</li>
          </ul>
        </div>

        {/* Resolve */}
        <div
          className={cn(
            "dropdown dropdown-hover dropdown-top absolute left-[60.8vw] top-[52vh] transition-all",
            showDrawer4 && "dropdown-open"
          )}
        >
          <div
            tabIndex={0}
            role="button"
            className="btn bg-transparent shadow-none rounded-full px-[4vw] py-[8vh] border-none hover:bg-transparent"
          ></div>
          <ul
            tabIndex={0}
            className="list-decimal dropdown-content mb-5 bg-transparent text-black text-sm font-semibold rounded-box z-[1] w-72 transform -translate-y-1/4"
          >
            <div className="bg-clip-text text-start pl-8 text-transparent bg-gradient-to-r from-[#e15f45] via-[#d54d4d] to-[#cf4b56] font-extrabold uppercase text-xl mb-3">
              Resolve
            </div>
            <li className="text-left">SYNERGY will check the mail.</li>
            <li className="text-left">Resolve the Issue.</li>
            <li className="text-left">Send a Reply to the users mail.</li>
          </ul>
        </div>

        {/* Satisfaction */}
        <div
          className={cn(
            "dropdown dropdown-hover dropdown-botom absolute right-[16.8vw] top-[52vh] transition-all",
            showDrawer5 && "dropdown-open"
          )}
        >
          <div
            tabIndex={0}
            role="button"
            className="btn bg-transparent shadow-none rounded-full px-[4vw] py-[8vh] border-none hover:bg-transparent"
          ></div>
          <ul
            tabIndex={0}
            className="list-decimal dropdown-content mt-16 bg-transparent text-black text-sm font-semibold rounded-box z-[1] pl-3 w-72 transform -translate-y-1/4"
          >
            <div className="bg-clip-text text-start pl-2 text-transparent bg-gradient-to-r from-[#af4367] via-[#b23763] to-[#a32f6c] font-extrabold uppercase text-xl mb-3">
              Satisfaction
            </div>
            <li className="text-left">User gets the Issue resolved.</li>
            <li className="text-left">
              Issues query, if user is dissatisfied.
            </li>
            <li className="text-left">User Satisfied.</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SupportFlow;
