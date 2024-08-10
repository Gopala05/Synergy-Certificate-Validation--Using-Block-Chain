import { useRouter } from "next/router";
import { CrispChat } from "./CrispChat";
import { useUpgradeHook } from "../../hooks/upgrade-model";

export const CrispProvider = () => {
  const router = useRouter();
  const { pathname } = router;
  const plansHook = useUpgradeHook();

  const shouldShowChat =
    pathname !== "/" &&
    pathname !== "/user-login" &&
    pathname !== "/auth-login";

  return shouldShowChat && plansHook.subscription === "gold" && <CrispChat />;
};
