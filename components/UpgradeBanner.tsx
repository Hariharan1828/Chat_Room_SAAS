"use client";

import { useSubscriptionStore } from "@/store/store";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const UpgradeBanner = () => {

    const subscription = useSubscriptionStore((state) => state.subscription);
    const isPro  = subscription?.role ==="pro";
    const router = useRouter();
    if(subscription===null||isPro) return null;

  return (
    <Button onClick={()=>router.push("register")} className="w-full rounded-none bg-gradient-to-r  from-sky-400 to-sky-300 dark:to-indigo-600 text-center text-white px-5 py-2
    hover:from-cyan-800 hover:to-sky-300 hover:shadow-md hover:opacity-75 transition-all
    ">
        Upgrade to Pro to unlock all features
    </Button>

  )
}

export default UpgradeBanner