import React, { useEffect, useState, useRef } from "react";
import DashNav from "../../Components/Nav/DashNav";
import { cn } from "../../utils/utils";
import { Settings } from "lucide-react";
import { useStateContext } from "../../Context/NFTs";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import SubscriptionButton from "../../Components/Button/SubscriptionButton";
import { useUpgradeHook } from "@/hooks/upgrade-model";
import Logo from "../../Components/Logo/Logo";

const SettingsPage = () => {
  const router = useRouter();
  const toastShownRef = useRef(false);

  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const { checkSubscription, getUser, setIsLoading, isLoading } =
    useStateContext();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const userData = localStorage.getItem("user-info");
      const authData = localStorage.getItem("auth-info");

      if (!userData && !authData) {
        router.replace("/user-login");
        if (!toastShownRef.current) {
          toast("Please Login First", {
            icon: "🚫",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
          toastShownRef.current = true;
        }
      } else if (userData) {
        try {
          const resp = await getUser(email);
          if (resp.data.status == "OK") {
            localStorage.setItem("user-info", resp.data.user);
            useUpgradeHook.getState().setSubscription(resp.data.user.subscription);
            setUser(resp.data.user);
          }
        } catch (error) {
          console.log("[Error in Fetching user in Settings]: ", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setAuth(JSON.parse(authData));
      }
    };

    fetchData();
  }, [router]);

  useEffect(() => {
    const fetchSubscription = async () => {
      if (user) {
        const subscriptionData = await checkSubscription(user);
        setSubscription(subscriptionData);
      }
    };

    fetchSubscription();
  }, [user, checkSubscription]);

  if (!auth && !user) {
    return (
      <div className="loader">
        <Logo />
      </div>
    );
  }

  return (
    <div>
      <DashNav />
      <div className="pt-28 h-[100vh]">
        <div className="px-4 lg:px-8 items-center gap-x-3 flex mb-8">
          <div className={cn("p-2 w-fit rounded-md", "bg-gray-700")}>
            <Settings className={cn("w-10 h-10", "text-white")} />
          </div>
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold">Settings</h2>
            <p className="text-sm text-muted-foreground">
              Manage account settings
            </p>
          </div>
        </div>
        <div className="px-4 lg:px-8 space-y-4 text-4xl lg:text-5xl">
          <div>
            Hi,&nbsp;<span>{user?.name}</span>
          </div>
          <div className="text-gray-500 text-xl lg:text-2xl">
            {subscription?.valid
              ? `You are currently on ${user.subscription
                  .toString()
                  .toUpperCase()} Subscription`
              : `You are currently on ${user.subscription
                  .toString()
                  .toUpperCase()} Subscription`}
          </div>
          <SubscriptionButton subscription={subscription} user={user} />
        </div>
      </div>
      {isLoading && (
        <div className="loader">
          <Logo />
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
