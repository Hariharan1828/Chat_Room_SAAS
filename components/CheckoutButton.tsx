"use client";
import React, { useState } from 'react'
import { Button } from './ui/button'
import { useSession } from 'next-auth/react'
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';
import { Spinner } from '@nextui-org/react';
import { useSubscriptionStore } from '@/store/store';
import ManageAccountButton from './ManageAccountButton';

const CheckoutButton = () => {

  const {data:session} = useSession();
  const [loading, setLoading] = useState(false);
  const subscription  = useSubscriptionStore((state) => state.subscription);

  const isLoadingSubscription = subscription===undefined;
  const isSubscribed = subscription?.role==="pro" && subscription?.status==="active";

  const createCheckoutSession=async()=>{
    if(!session?.user.id) return;

    //push a document to firestore db
    setLoading(true);

    const docRef = await addDoc(
      collection(db, "customers", session.user.id, "checkout_sessions"),
      {
        price:"price_1Or0q0SGzhL44JnK3ARrsf0t",
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );
    
    //...stripe extension on firebase will create a checkout session
      return onSnapshot(docRef, async (snap)=>{
        const data = snap.data();
        const url = data?.url;
        const error = data?.error;

        if(error){
          //Show an error to your customer and
          // inspect your cloud function logs in the firebase console.
          alert(`An error occured: ${error.message}`);
          setLoading(false);
           
        }

        if(url){
          window.location.assign(url);
          setLoading(false);

        }
      });
    //redirect user to checkout page
  }


  return (
    <div className="flex flex-col space-y-2">
      <div className="mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm
      hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:opacity-80">
        {
          isSubscribed ?(
            <ManageAccountButton/>
          ):
        
        isLoadingSubscription|| loading? (<Spinner/>):
        (<button onClick={()=>createCheckoutSession()}>Checkout</button>)
      
      }
        </div>
      </div>
  )
}

export default CheckoutButton