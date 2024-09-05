import { useState } from "react";
import DashNav from "../../Components/Nav/DashNav";
import { cn } from "../../utils/utils";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useRouter } from "next/navigation";

const VerificationFlow = () => {
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
          src="/Verification_Flow.png"
          alt="Verification-Flow Image"
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
        <div className="absolute libre-franklin top-36 left-64 z-30 text-[#3d3e42] font-bold uppercase text-[2.8rem]">
          <div className="text-[#144f53] text-2xl tracking-wider font-dubai-medium font-bold">
            SYNERGY
          </div>
          Certificate Verification Flow Infographics
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
            "dropdown dropdown-hover dropdown-left absolute top-[31.3vh] left-[30vw] transition-all",
            showDrawer1 && "dropdown-open"
          )}
        >
          <div
            tabIndex={0}
            role="button"
            className="btn bg-transparent border-none shadow-none rounded-3xl px-[8.1vw] z-30 py-[11.4vh] hover:bg-transparent"
          ></div>
          <ul
            tabIndex={0}
            className="list-decimal dropdown-content mt-20 mr-5 bg-transparent text-black text-lg font-semibold rounded-box z-[1] w-72 transform -translate-y-1/4"
          >
            <div className="bg-clip-text text-start text-transparent bg-gradient-to-r from-[#1d7b87] via-[#1a7f89] to-[#1c6f81] font-extrabold uppercase text-2xl mb-3">
              Navigate
            </div>
            <li className="text-left">Navigate to Login Page.</li>
            <li className="text-left">Enter the Credentials.</li>
            <li className="text-left">Navigate to Verification Page.</li>
          </ul>
        </div>

        {/* Search */}
        <div
          className={cn(
            "dropdown dropdown-hover dropdown-left absolute bottom-[11.3vh] left-[30vw] transition-all",
            showDrawer2 && "dropdown-open"
          )}
        >
          <div
            tabIndex={0}
            role="button"
            className="btn bg-transparent border-none shadow-none rounded-3xl px-[8.1vw] z-30 py-[11.4vh] hover:bg-transparent"
          ></div>
          <ul
            tabIndex={0}
            className="list-decimal dropdown-content mt-20 mr-5 bg-transparent text-black text-lg font-semibold rounded-box z-[1] w-72 transform -translate-y-1/4"
          >
            <div className="bg-clip-text text-start text-transparent bg-gradient-to-r from-[#1d7b87] via-[#1a7f89] to-[#1c6f81] font-extrabold uppercase text-2xl mb-3">
              Search
            </div>
            <li className="text-left">Choose the Certificate type.</li>
            <li className="text-left">Academic Certuificates.</li>
            <li className="text-left">Non-Academic Certificates.</li>
          </ul>
        </div>

        {/* Credentials */}
        <div
          className={cn(
            "dropdown dropdown-hover dropdown-right absolute bottom-[11.3vh] right-[30vw] transition-all",
            showDrawer3 && "dropdown-open"
          )}
        >
          <div
            tabIndex={0}
            role="button"
            className="btn bg-transparent border-none shadow-none rounded-3xl px-[8.1vw] z-30 py-[11.4vh] hover:bg-transparent"
          ></div>
          <ul
            tabIndex={0}
            className="list-decimal dropdown-content mt-20 ml-24 bg-transparent text-black text-lg font-semibold rounded-box z-[1] w-72 transform -translate-y-1/4"
          >
            <div className="bg-clip-text text-start text-transparent bg-gradient-to-r from-[#1d7b87] via-[#1a7f89] to-[#1c6f81] font-extrabold uppercase text-2xl mb-3">
              Credentials
            </div>
            <li className="text-left">Choose the Option.</li>
            <li className="text-left">Provide the Credentials.</li>
            <li className="text-left">Click on Verify Button.</li>
          </ul>
        </div>

        {/* Validation */}
        <div
          className={cn(
            "dropdown dropdown-hover dropdown-right absolute top-[31.3vh] right-[30vw] transition-all",
            showDrawer4 && "dropdown-open"
          )}
        >
          <div
            tabIndex={0}
            role="button"
            className="btn bg-transparent border-none shadow-none rounded-3xl px-[8.1vw] z-30 py-[11.4vh] hover:bg-transparent"
          ></div>
          <ul
            tabIndex={0}
            className="list-decimal dropdown-content mt-20 ml-24 bg-transparent text-black text-lg font-semibold rounded-box z-[1] w-72 transform -translate-y-1/4"
          >
            <div className="bg-clip-text text-start text-transparent bg-gradient-to-r from-[#1d7b87] via-[#1a7f89] to-[#1c6f81] font-extrabold uppercase text-2xl mb-3">
              Validation
            </div>
            <li className="text-left">Validation Based on Block Chain.</li>
            <li className="text-left">Validated Certifcate display.</li>
            <li className="text-left">If not Valid Error Display.</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default VerificationFlow;
