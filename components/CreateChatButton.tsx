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
        router.push("/chat/new/abc")
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