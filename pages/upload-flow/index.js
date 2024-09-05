import { useState } from "react";
import DashNav from "../../Components/Nav/DashNav";
import { cn } from "../../utils/utils";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useRouter } from "next/navigation";

const UploadFlow = () => {
  const router = useRouter();

  const [showAll, setShowAll] = useState(false);
  const [showDrawer1, setShowDrawer1] = useState(false);
  const [showDrawer2, setShowDrawer2] = useState(false);
  const [showDrawer3, setShowDrawer3] = useState(false);
  const [showDrawer4, setShowDrawer4] = useState(false);

  const openDrawers = () => {
    setShowAll(true);

    setTimeout(() => setShowDrawer1(true), 0);
    setTimeout(() => setShowDrawer2(true), 400);
    setTimeout(() => setShowDrawer3(true), 800);
    setTimeout(() => setShowDrawer4(true), 1200);
  };

  const closeDrawers = () => {
    setShowAll(false);

    setTimeout(() => setShowDrawer4(false), 0);
    setTimeout(() => setShowDrawer3(false), 400);
    setTimeout(() => setShowDrawer2(false), 800);
    setTimeout(() => setShowDrawer1(false), 1200);
  };

  return (
    <>
      <DashNav />
      <div className="flex items-center justify-center h-screen pt-[10vh]">
        <img
          className="w-[80vw] h-[85vh] rounded-[3rem]"
          src="/Upload_Flow.jpg"
          alt="Upload-Flow Image"
        />
        <div className="absolute top-28 left-8 lg:top-28 z-30">
          <button
            onClick={() => router.back()}
            type="primary"
            className="btn bg-gradient-to-r from-green-400 to-green-600 text-black font-bold text-lg"
          >
            <RiArrowGoBackFill />
            Back
          </button>
        </div>
        <div className="absolute libre-franklin top-40 left-64 z-30 text-[#3d3e42] font-bold uppercase text-5xl">
          <div className="text-[#144f53] text-2xl tracking-wider font-dubai-medium font-bold">
            SYNERGY
          </div>
          Upload Flow
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

        {/* Auth Login */}
        <div
          className={cn(
            "dropdown dropdown-hover dropdown-right absolute top-[280px] transition-all",
            showDrawer1 && "dropdown-open"
          )}
        >
          <div
            tabIndex={0}
            role="button"
            className={cn(
              "btn hover:scale-110 transition-all px-0 bg-transparent border-none text-5xl hover:text-[#ef5823] hover:bg-transparent",
              showDrawer1 && "text-[#ef5823]"
            )}
          >
            01
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content ml-5 menu bg-transparent text-black pl-5 text-sm text-left font-semibold rounded-box z-[1] w-96 transform -translate-y-1/4"
          >
            <li className="text-[#ef5823] font-bold uppercase text-lg">
              Description
            </li>
            <li>Navigate to Login as Auth Page.</li>
            <li>Enter the Auth Credentials.</li>
            <li>Click on Login.</li>
          </ul>
        </div>

        {/* Metamask */}
        <div
          className={cn(
            "dropdown dropdown-hover dropdown-left absolute left-[35.5vw] transition-all",
            showDrawer2 && "dropdown-open"
          )}
        >
          <div
            tabIndex={0}
            role="button"
            className={cn(
              "btn hover:scale-110 transition-all px-0 bg-transparent border-none text-5xl hover:text-[#00abb9] hover:bg-transparent",
              showDrawer2 && "text-[#00abb9]"
            )}
          >
            02
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content mr-8 menu bg-transparent text-black pl-5 text-sm text-right font-semibold rounded-box z-[1] w-96 transform -translate-y-1/4"
          >
            <li className="text-[#00abb9] font-bold uppercase text-lg">
              Description
            </li>
            <li>Click on Connect Metamask.</li>
            <li>Confirm the Connect request.</li>
            <li>Metamask will be Connected</li>
          </ul>
        </div>

        {/* Upload */}
        <div
          className={cn(
            "dropdown dropdown-hover dropdown-right absolute right-[35.5vw] transition-all",
            showDrawer3 && "dropdown-open"
          )}
        >
          <div
            tabIndex={0}
            role="button"
            className={cn(
              "btn hover:scale-110 transition-all px-0 bg-transparent border-none text-5xl hover:text-[#faaf3a] hover:bg-transparent",
              showDrawer3 && "text-[#faaf3a]"
            )}
          >
            03
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content ml-5 menu bg-transparent text-black pl-5 text-sm text-left font-semibold rounded-box z-[1] w-96 transform -translate-y-1/4"
          >
            <li className="text-[#faaf3a] font-bold uppercase text-lg">
              Description
            </li>
            <li>Upload the Certificate.</li>
            <li>Fill all the Fields in the Populated Form, Click on Create.</li>
            <li>Confirm/Sign the transaction.</li>
          </ul>
        </div>

        {/* Acknowledgement */}
        <div
          className={cn(
            "dropdown dropdown-hover dropdown-left absolute bottom-[19.5vh] transition-all",
            showDrawer4 && "dropdown-open"
          )}
        >
          <div
            tabIndex={0}
            role="button"
            className={cn(
              "btn hover:scale-110 transition-all px-0 bg-transparent border-none text-5xl hover:text-[#9e0059] hover:bg-transparent",
              showDrawer4 && "text-[#9e0059]"
            )}
          >
            04
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content mr-8 menu bg-transparent text-black pl-5 text-sm text-right font-semibold rounded-box z-[1] w-96 transform -translate-y-1/4"
          >
            <li className="text-[#9e0059] font-bold uppercase text-lg">
              Description
            </li>
            <li>Wait for the Transaction to Complete.</li>
            <li>A Pop up regrading the Confirmation is seen.</li>
            <li>Mail is sent to the User.</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default UploadFlow;
