"use client";
import { MessageSquarePlusIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react';
import { useSubscriptionStore } from '@/store/store';
import { useToast } from './ui/use-toast';
import { Spinner } from '@nextui-org/react';
import {v4 as uuidv4} from "uuid";
import { serverTimestamp, setDoc } from 'firebase/firestore';
import { addChatRef } from '@/lib/converters/ChatMembers';

const CreateChatButton = ({isLarge}:{isLarge:Boolean}) => {
    const {data:session} = useSession();
    const [loading, setLoading] = useState(false);
    const {toast } = useToast();
    const subscription = useSubscriptionStore((state) => state.subscription);




    const router = useRouter();
    const createNewChat = async ()=>{
        if(!session?.user.id) return;
        setLoading(true);
        toast({
            title:"creating a new chat",
            description:"Hold on tight we create your new chat",
            duration:3000,

        })

        // ToDO: Check if user is pro and limit the chat if not
        // ....
        // -----

        const ChatId = uuidv4();

        await setDoc(addChatRef(ChatId,session.user.id),{
            userId: session.user.id!,
            email: session.user.email!,
            timestamp: serverTimestamp(),
            isAdmin: true,
            chatId: ChatId,
            image: session.user.image || "",

        }).then(()=>{
            toast({
                title:"Success",
                description:"You have created a new chat",
                className:"bg-green-600 text-white",
                duration:2000,
            });
            router.push(`/chat/${ChatId}`);
        }).catch((error)=>{
            console.error(error);
            toast({
                title:"Error",
                description:"Something went wrong",
                className:"bg-red-600 text-white",
                duration:2000,
            });
        }).finally(() => {setLoading(false);

        
        });
        
        
    }
  if(isLarge)
  {
    return(
        <div className="">
            <Button variant={"default"} onClick={createNewChat}>
                {loading? <Spinner/>:"Create a new Chat"}
            </Button>
        </div>
    );
  }
  
    return (
        <Button onClick={createNewChat} variant={"ghost"}>
            <MessageSquarePlusIcon/>
        </Button>
        )
  
}

export default CreateChatButton