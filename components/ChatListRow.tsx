"use client";
import { Skeleton } from "@/components/ui/skeleton"
import { Message, limitedSoretedMessagesRef } from "@/lib/converters/Message";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";


const ChatListRow = ({chatId}:{chatId: string}) => {
    const [values, loading, error, snapshot] =
  useCollectionDataOnce < Message > (
    limitedSoretedMessagesRef(chatId)
  );
  return (
    <div>ChatListRow</div>
  )
}

export default ChatListRow