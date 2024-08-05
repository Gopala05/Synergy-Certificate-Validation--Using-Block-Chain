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
import { Button } from "antd";
import { Check, Code, FileEditIcon, MessageSquare } from "lucide-react";

export const Plans = () => {
  const [rendered, setRendered] = useState(false);
  const modelHook = upgradeHook();

  useEffect(() => {
    setRendered(true);
  }, []);

  if (!rendered) return null;

  const tools = [
    {
      label: "Conversation",
      icon: MessageSquare,
      color: "text-violet-500",
      bg: "bg-violet-500/15",
    },
    {
      label: "Form Generation",
      icon: FileEditIcon,
      color: "text-orange-400",
      bg: "bg-orange-400/15",
    },
    {
      label: "Code Generation",
      icon: Code,
      color: "text-green-700",
      bg: "bg-green-700/15",
    },
  ];

  return (
    <Dialog open={modelHook.isOpen} onOpenChange={modelHook.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center text-gray-950 flex-row gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1">
              Upgrade NeuroNexus
              <Badge className="uppercase text-sm py-1">Pro</Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="grid cols grid-cols-3 text-center text-gray-950 pt-2 space-y-2 font-medium">
            {tools.map((tool) => (
              <Card
                className="p-3 border-black/5 flex items-center col-span-1 justify-between"
                key={tool.label}
              >
                <div className="flex items-center flex-col gap-x-4">
                  <div className={cn("p-2 w-fit rounded-md", tool.bg)}>
                    <tool.icon className={cn("w-6 h-6", tool.color)} />
                  </div>
                  <div className="text-sm font-semibold">{tool.label}</div>
                </div>
                <Check className="w-5 h-5 text-primary" />
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button className="btn w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-none shadow-xl">
            Upgrade
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
