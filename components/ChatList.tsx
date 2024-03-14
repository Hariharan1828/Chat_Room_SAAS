import { authOptions } from '@/auth'
import { chatMemberCollectionGroupRef } from '@/lib/converters/ChatMembers'
import { getDocs } from 'firebase/firestore'
import { getServerSession } from 'next-auth'
import React from 'react'
import ChatListRows from './ChatListRows'

const ChatList = async () => {
    const session = await getServerSession(authOptions)

    const chatsSnapshot = await getDocs(chatMemberCollectionGroupRef(session?.user.id!))
    const intialChats = chatsSnapshot.docs.map(doc => (
      {
        ...doc.data(),
        timestamp:null,
      }
    ));
  return (


    <ChatListRows intialChats={intialChats}/>
  )
}

export default ChatList