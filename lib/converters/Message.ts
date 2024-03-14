import { DocumentData, QueryDocumentSnapshot,FirestoreDataConverter, 
SnapshotOptions, collection, doc, query, where, collectionGroup, limit, orderBy } from "firebase/firestore";
import { db } from '@/firebase';
import { LanguageSupported } from "@/store/store";


export interface User{
    id: string;
    email:string;
    name: string;
    image: string;
}
export interface Message{
    id?: string;
    input:string;
    timestamp:Date;
    user:User;
    translate?:{
        [K in LanguageSupported]?: string;
    };
  
}

 const messageConverters: FirestoreDataConverter<Message> = {
    toFirestore : function(message:Message): DocumentData{
        return{
            input: message.input,
            user: message.user,
            timestamp: message.timestamp,
            
        };
    },
    fromFirestore: function(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ):Message{
        const data = snapshot.data(options);
        return {
            id:snapshot.id,
            input: data.input,
            timestamp: data.timestamp,
            translate:data.translate,
            user:data.user, 

        };
    },
 };

export const messageRef = (chatId: string) =>
collection(db, 'chats', chatId, 'messages').withConverter(messageConverters);

export const limitedMessageRef =(chatId: string)=>
query(messageRef(chatId), orderBy('timestamp', 'desc'), limit(25));

export const limitedSoretedMessagesRef =(chatId: string)=>
 query(query(messageRef(chatId), limit(1)), orderBy('timestamp', 'desc'));


