"use client";
import { upgradeHook } from "@/hooks/upgrade-model";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { cn } from "@/utils/utils";
import {
  Bot,
  Check,
  IndianRupeeIcon,
  TimerResetIcon,
  Unlock,
  VerifiedIcon,
  X,
} from "lucide-react";
import React from "react";

// Define a type for the dynamic component
type FeatureIcon = (props: React.SVGProps<SVGSVGElement>) => JSX.Element;

export const Plans = () => {
  const [rendered, setRendered] = useState(false);
  const plansHook = upgradeHook();

  useEffect(() => {
    setRendered(true);
  }, []);

  if (!rendered) return null;

  const prices = [
    {
      label: "BRONZE",
      cost: "Free",
      icons: [VerifiedIcon, TimerResetIcon, Bot, Unlock] as FeatureIcon[],
      iconLabels: [
        "30 users Verification",
        "1x Faster",
        "Chat-Bot",
        "24/7 Live Support",
      ],
      check: [Check, Check, X, X] as FeatureIcon[],
      iconColors: [
        "text-white",
        "text-white",
        "text-gray-400",
        "text-gray-400",
      ],
      textColor:
        "bg-gradient-to-r from-[#FF5733] via-white to-[#FF5733] bg-clip-text text-transparent",
      color: "text-[#FF5733]",
      bg: "bg-violet-500/15",
    },
    {
      label: "GOLD",
      cost: "Rs. 1499/-",
      icons: [VerifiedIcon, TimerResetIcon, Bot, Unlock] as FeatureIcon[],
      iconLabels: [
        "1,000 users Verification",
        "2x Faster",
        "Chat-Bot",
        "24/7 Live Support",
      ],
      check: [Check, Check, Check, X] as FeatureIcon[],
      iconColors: ["text-white", "text-white", "text-white", "text-gray-400"],
      textColor:
        "bg-gradient-to-r from-[#ffbf00] via-white to-[#ffbf00] bg-clip-text text-transparent",
      color: "text-[#ffbf00]",
      bg: "bg-violet-500/15",
    },
    {
      label: "PLATINUM",
      cost: "Rs. 3349/-",
      icons: [VerifiedIcon, TimerResetIcon, Bot, Unlock] as FeatureIcon[],
      iconLabels: [
        "Unlimited Verification",
        "3x Faster",
        "Chat-Bot",
        "24/7 Live Support",
      ],
      check: [Check, Check, Check, Check] as FeatureIcon[],
      iconColors: ["text-white", "text-white", "text-white", "text-white"],
      textColor:
        "bg-gradient-to-r from-sky-400 via-white to-sky-400 bg-clip-text text-transparent",
      color: "text-sky-400",
      bg: "bg-violet-500/15",
    },
  ];

  return (
    <Dialog open={plansHook.isOpen} onOpenChange={plansHook.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center text-gray-950 flex-row gap-y-4 pb-2">
            <div className="uppercase tracking-wider text-4xl lg:text-6xl drop-shadow-[8px_2px_1px_rgba(0,0,0,1)] text-white flex items-center justify-center gap-x-2 font-bold py-1">
              SYNERGY PlANS
              {/* <Badge className="uppercase text-sm py-1 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                SYNERGY PlANS
              </Badge> */}
            </div>
          </DialogTitle>
          <DialogDescription className="flex flex-col lg:grid lg:grid-cols-3 gap-x-8 gap-y-8 text-center text-whit pt-2 font-medium">
            {prices.map((price, index) => (
              <div
                className={cn(
                  "p-2 lg:p-4 rounded-3xl hover:scale-110 transition-all",
                  plansHook.subscription == "platinum" &&
                    price.label.toLowerCase() == "platinum"
                    ? "border-4 border-sky-400 hover:scale-105 transition-all"
                    : plansHook.subscription == "gold" &&
                      price.label.toLowerCase() == "gold"
                    ? "border-4 border-[#ffbf00] hover:scale-105 transition-all"
                    : plansHook.subscription == "bronze" &&
                      price.label.toLowerCase() == "bronze"
                    ? "border-4 border-[#FF5733] hover:scale-105 lg:hover:scale-105 transition-all"
                    : null
                )}
              >
                <Card
                  className="hover:scale-100 lg:hover:scale-100 transition-all p-5 lg:p-10 cursor-pointer border-none rounded-2xl flex flex-col justify-center items-center col-span-1 drop-shadow-[4px_4px_16px_rgba(0,0,0,1)]"
                  key={price.label}
                  style={{
                    backgroundImage: `url(/Pricing.jpg)`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                >
                  <div
                    className={cn(
                      "text-5xl lg:text-6xl drop-shadow-[8px_3px_1px_rgba(0,0,0,1)]",
                      price.textColor
                    )}
                  >
                    {price.label}
                  </div>
                  <div
                    className={cn(
                      "text-3xl flex lg:text-5xl drop-shadow-[7px_3px_1px_rgba(0,0,0,1)] mt-2",
                      price.textColor
                    )}
                  >
                    {price.cost}
                  </div>
                  <div
                    className={cn(
                      "uppercase text-lg lg:text-2xl drop-shadow-[4px_4px_1px_rgba(0,0,0,1)] mt-2",
                      price.textColor
                    )}
                  >
                    Per Month
                  </div>
                  <div className="flex w-full flex-col items-center gap-y-10 mt-5">
                    <div className={cn("px-4 w-full rounded-md")}>
                      {price.icons.map((IconComponent, index) => (
                        <>
                          <div
                            className="flex items-center justify-between gap-x-5 my-4"
                            key={index}
                          >
                            <IconComponent
                              className={cn(
                                "w-5 h-5 lg:w-8 lg:h-8",
                                price.iconColors[index]
                              )}
                            />
                            <label
                              className={cn(
                                "text-[0.9rem] lg:text-2xl",
                                price.iconColors[index]
                              )}
                            >
                              {price.iconLabels[index]}
                            </label>
                            {React.createElement(price.check[index], {
                              className: cn("w-6 h-6", price.color),
                            })}
                          </div>
                          <hr className="border-1 border-white" />
                        </>
                      ))}
                    </div>
                    <button className="uppercase btn w-full bg-gradient-to-r text-lg lg:text-2xl from-indigo-500 via-purple-500 to-pink-500 text-white border-none shadow-md shadow-slate-800">
                      Purchase {price.label}
                    </button>
                  </div>
                </Card>
              </div>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="text-white hidden tracking-wider font-bold text-2xl lg:flex justify-center items-center w-full drop-shadow-[6px_5px_3px_rgba(0,0,0,1)]">
          You are currently on&nbsp;
          <span
            className={cn(
              "text-3xl",
              plansHook.subscription == "platinum"
                ? "text-sky-400"
                : plansHook.subscription == "gold"
                ? "text-[#ffbf00]"
                : plansHook.subscription == "bronze"
                ? "text-[#FF5733]"
                : null
            )}
          >
            {plansHook.subscription.toUpperCase()}
          </span>
          &nbsp;Subscription
        </DialogFooter>
        <DialogFooter className="text-white lg:hidden tracking-wider font-bold text-lg flex flex-row justify-center items-center w-full drop-shadow-[6px_5px_3px_rgba(0,0,0,1)]">
          Currently on&nbsp;
          <span
            className={cn(
              "text-xl",
              plansHook.subscription == "platinum"
                ? "text-sky-400"
                : plansHook.subscription == "gold"
                ? "text-[#ffbf00]"
                : plansHook.subscription == "bronze"
                ? "text-[#FF5733]"
                : null
            )}
          >
            {plansHook.subscription.toUpperCase()}
          </span>
          &nbsp;Subscription
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
