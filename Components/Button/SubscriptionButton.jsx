import { Zap } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useStateContext } from "../../Context/NFTs";
import { useRouter } from "next/navigation";
import { useUpgradeHook } from "../../hooks/upgrade-model";

const SubscriptionButton = ({ subscription, user }) => {
  const { stripeSubscription, setIsLoading } = useStateContext();
  const router = useRouter();
  const plansHook = useUpgradeHook();
  const plan = user?.subscription;

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const stripeURL = await stripeSubscription(user, plan);
      router.push(stripeURL);
    } catch (error) {
      console.log("[Billing Error]:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonClick = () => {
    if (plan == "bronze") {
      plansHook.onOpen();
    } else {
      handleClick();
    }
  };

  return (
    <Button
      variant={subscription?.valid ? "default" : "premium"}
      onClick={handleButtonClick}
      className="uppercase btn text-white rounded-xl text-4xl pb-12"
    >
      {subscription?.valid ? "Manage Subscription" : "Upgrade"}
      {!subscription?.valid && <Zap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  );
};

export default SubscriptionButton;
