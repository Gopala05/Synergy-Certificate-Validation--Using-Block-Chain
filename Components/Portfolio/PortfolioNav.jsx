import { useRouter } from "next/router";
import { File, UserCircle2Icon } from "lucide-react";
import { cn } from "../../utils/utils";
import { usePortfolio } from "@/hooks/usePortfolio";
import { useStateContext } from "../../Context/NFTs";

const PortfolioNav = () => {
  const router = useRouter();
  const portfolioHook = usePortfolio();
  const { setIsLoading } = useStateContext();

  const handleRouting = (page, route) => {
    if (page && route) {
      setIsLoading(true);
      portfolioHook.setPage(page);
      router.push(route);
    }
  };

  console.log(portfolioHook.page);
  return (
    <div className="flex text-lg flex-col bg-[#FFFFFF] rounded-xl px-4 py-10 gap-y-8 text-black">
      {/* Profile */}
      <button
        onClick={() => handleRouting("Profile", "/portfolio-profile")}
        className={cn(
          "btn hover:bg-gradient-to-r hover:from-[#FF9C1A] hover:to-[#E80505] hover:scale-110 transition-all px-0 h-20 border-none bg-[#E1E8EF] rounded-xl text-black",
          portfolioHook.page == "Profile" &&
            "bg-gradient-to-r from-[#FF9C1A] to-[#E80505] text-white"
        )}
      >
        <div className="flex flex-col gap-y-2 justify-center items-center">
          <div>
            <UserCircle2Icon
              className={cn(
                "text-gray-500",
                portfolioHook.page == "Profile" && "text-white"
              )}
            />
          </div>
          <div>Profile</div>
        </div>
      </button>

      {/* Education */}
      <button
        onClick={() => handleRouting("Education", "/portfolio-education")}
        className={cn(
          "btn hover:bg-gradient-to-r hover:from-[#FF9C1A] hover:to-[#E80505] hover:scale-110 transition-all px-0 h-20 border-none bg-[#E1E8EF] rounded-xl text-black",
          portfolioHook.page == "Education" &&
            "bg-gradient-to-r from-[#FF9C1A] to-[#E80505] text-white"
        )}
      >
        <div className="flex flex-col gap-y-2 justify-center items-center">
          <div>
            <File
              className={cn(
                "text-gray-500",
                portfolioHook.page == "Education" && "text-white"
              )}
            />
          </div>
          <div>Education</div>
        </div>
      </button>

      {/* Experience */}
      <button
        onClick={() => handleRouting("Experience", "/portfolio-experience")}
        className={cn(
          "btn hover:bg-gradient-to-r hover:from-[#FF9C1A] hover:to-[#E80505] hover:scale-110 transition-all px-0 h-20 border-none bg-[#E1E8EF] rounded-xl text-black",
          portfolioHook.page == "Experience" &&
            "bg-gradient-to-r from-[#FF9C1A] to-[#E80505] text-white"
        )}
      >
        <div className="flex flex-col gap-y-2 justify-center items-center">
          <div>
            <File
              className={cn(
                "text-gray-500",
                portfolioHook.page == "Experience" && "text-white"
              )}
            />
          </div>
          <div>Experience</div>
        </div>
      </button>

      {/* Academic */}
      <button
        onClick={() => handleRouting("Academic", "/portfolio-academic")}
        className={cn(
          "btn hover:bg-gradient-to-r hover:from-[#FF9C1A] hover:to-[#E80505] hover:scale-110 transition-all px-0 h-20 border-none bg-[#E1E8EF] rounded-xl text-black",
          portfolioHook.page == "Academic" &&
            "bg-gradient-to-r from-[#FF9C1A] to-[#E80505] text-white"
        )}
      >
        <div className="flex flex-col gap-y-2 justify-center items-center">
          <div>
            <File
              className={cn(
                "text-gray-500",
                portfolioHook.page == "Academic" && "text-white"
              )}
            />
          </div>
          <div>Academic</div>
        </div>
      </button>

      {/* Non Academic */}
      <button
        onClick={() => handleRouting("Non-Acad", "/portfolio-non-academic")}
        className={cn(
          "btn px-2 hover:bg-gradient-to-r hover:from-[#FF9C1A] hover:to-[#E80505] hover:scale-110 transition-all h-20 border-none bg-[#E1E8EF] rounded-xl text-black",
          portfolioHook.page == "Non-Acad" &&
            "bg-gradient-to-r from-[#FF9C1A] to-[#E80505] text-white"
        )}
      >
        <div className="flex flex-col gap-y-2 justify-center items-center">
          <div>
            <UserCircle2Icon
              className={cn(
                "text-gray-500",
                portfolioHook.page == "Non-Acad" && "text-white"
              )}
            />
          </div>
          <div>Non-Acad</div>
        </div>
      </button>

      {/* Contact */}
      <button
        onClick={() => handleRouting("Contact", "/portfolio-contact")}
        className={cn(
          "btn hover:bg-gradient-to-r hover:from-[#FF9C1A] hover:to-[#E80505] hover:scale-110 transition-all px-0 h-20 border-none bg-[#E1E8EF] rounded-xl text-black",
          portfolioHook.page == "Contact" &&
            "bg-gradient-to-r from-[#FF9C1A] to-[#E80505] text-white"
        )}
      >
        <div className="flex flex-col gap-y-2 justify-center items-center">
          <div>
            <UserCircle2Icon
              className={cn(
                "text-gray-500",
                portfolioHook.page == "Contact" && "text-white"
              )}
            />
          </div>
          <div>Contact</div>
        </div>
      </button>
    </div>
  );
};

export default PortfolioNav;
