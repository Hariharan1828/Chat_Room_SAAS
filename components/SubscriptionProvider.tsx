"use client";
import { subscriptionRef } from "@/lib/converters/Subscription";
import { useSubscriptionStore } from "@/store/store";
import { onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { Children, useEffect } from "react";
const SubscriptionProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
    const { data: session } = useSession();
    const setSubscription = useSubscriptionStore((state) => state.setSubscription);
    useEffect(()=>{
      if(!session) return;

      return onSnapshot(subscriptionRef(session?.user.id), (snapshot)=> {
        if(snapshot.empty){
          console.log("No active subscription")
          //set no subscription
          setSubscription(null)

          return;
        }else{
          console.log("Active subscription found")
          //set active subscription
          console.log("User has subscription");
          setSubscription(snapshot.docs[0].data());
        }


      },
      
      (error)=>{
        console.error(error);
      }
      );

    
    },[session, setSubscription]);

    
    return <>{children}</>
  
}

export default SubscriptionProvider