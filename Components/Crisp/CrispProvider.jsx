import { useRouter } from "next/router";
import { CrispChat } from "./CrispChat";
import { useUpgradeHook } from "../../hooks/upgrade-model";
import { Col, Row } from "antd";

export const CrispProvider = () => {
  const router = useRouter();
  const { pathname } = router;
  const plansHook = useUpgradeHook();

  const shouldShowChat =
    pathname !== "/" &&
    pathname !== "/user-login" &&
    pathname !== "/auth-login";

  return (
    shouldShowChat &&
    plansHook.subscription === "gold" && (
      <div className="flex w-full justify-end">
        <Row className="hidden lg:flex w-[10vw] bg-white items-center rounded-2xl h-10 absolute z-30 bottom-7 right-[75px]">
          <Col className="flex flex-grow pl-2">
            <div className="border-none bg-white text-black text-xl flex items-center font-bold cursor-pointer">
              24/7 Live Support
            </div>
          </Col>
        </Row>
        <Row className="hidden lg:flex w-[70px] bg-white items-center rounded-full h-[70px] px-1 absolute z-30 bottom-[15px] right-5">
          <Col className="flex flex-grow pl-5">
            <div className="border-none bg-white text-black text-xl flex items-center font-bold cursor-pointer">
              <CrispChat className="w-[100vh]" />
            </div>
          </Col>
        </Row>

        <Row className="fixed lg:hidden w-[65px] bg-white items-center rounded-full h-[65px] px-1 z-30 bottom-[9px] right-[9px]">
          <Col className="flex flex-grow pl-5">
            <div className="border-none bg-white text-black text-xl flex items-center font-bold cursor-pointer">
              <CrispChat className="w-[100vh]" />
            </div>
          </Col>
        </Row>
      </div>
    )
  );
};
