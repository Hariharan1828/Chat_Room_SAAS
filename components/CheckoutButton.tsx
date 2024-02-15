"use client";
import React, { useState } from 'react'
import { Button } from './ui/button'
import { useSession } from 'next-auth/react'
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase';

const CheckoutButton = () => {

  const {data:session} = useSession();
  const [loading, setLoading] = useState(false);

  const createCheckoutSession=async()=>{
    if(!session?.user.id) return;

    //push a document to firestore db
    setLoading(true);

    const docRef = await addDoc(
      collection(db, "customers", session.user.id, "checkout_Session"),
      {
        price:"price_1O0998KDjTc",
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    )
    
    //...stripe extension on firebase will create a checkout session

    //redirect user to checkout page
  }


  return (
    <div className="flex flex-col space-y-2">
      <Button onClick={()=>createCheckoutSession()}className="mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm
      hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:opacity-80">
        Pay now
        </Button>
      </div>
  )
}

export default CheckoutButton