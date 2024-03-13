import { DocumentData, QueryDocumentSnapshot,FirestoreDataConverter, SnapshotOptions, collection, doc, query, where, collectionGroup } from "firebase/firestore";
import { db } from '@/firebase';


export interface ChatMembers{
    userId: string;
    email:string;
    timestamp: Date|null;
    isAdmin: boolean;
    chatId:string;
    image: string;
}


 const ChatMembersConverters: FirestoreDataConverter<ChatMembers> = {
    toFirestore : function(member:ChatMembers): DocumentData{
        return{
            userId: member.userId, 
            email: member.email,  
            timestamp: member.timestamp,
            isAdmin: !!member.isAdmin,
            chatId: member.chatId,
            image: member.image || "",
        };
    },
    fromFirestore: function(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ):ChatMembers{
        const data = snapshot.data(options);
    
        return {
            userId:snapshot.id,
            email:data.email,
            timestamp: data.timestamp.toDate(),
            isAdmin: data.isAdmin,
            chatId: data.chatId,
            image: data.image,

        };
    },
 };

 export const addChatRef = (chatId:string,userId: string) => 
 doc(db, 'chats', chatId, 'members', userId).withConverter(ChatMembersConverters);


export const ChatmemberRef = (chatId: string) => 
collection(db, 'chats', chatId, 'members').withConverter(ChatMembersConverters);

export const ChatMemberAdminRef = (chatId:string)=>
query(
    collection(db, "chats", chatId, 'members'),
    where('isAdmin', '==', true)
).withConverter(ChatMembersConverters);

export const chatMemberCollectionGroupRef = (userId:string)=>
    query(
        collectionGroup(db, 'members'),
        where('userId', '==', userId)
    ).withConverter(ChatMembersConverters)



