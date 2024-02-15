"use client";
import { MessageSquarePlusIcon } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

const CreateChatButton = () => {
    const router = useRouter();
    const createNewChat = async ()=>{
        router.push("/chat/new/abc")
    }
  return (
    <Button onClick={createNewChat} variant={"ghost"}>
        <MessageSquarePlusIcon/>
    </Button>
    )
}

export default CreateChatButton