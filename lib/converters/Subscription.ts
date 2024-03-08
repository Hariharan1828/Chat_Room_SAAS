 import { Subscription } from "@/types/Subscription";
import { DocumentData, QueryDocumentSnapshot,FirestoreDataConverter, SnapshotOptions, collection } from "firebase/firestore";
import { db } from '@/firebase';


 const subscriptionConveters: FirestoreDataConverter<Subscription> = {
    toFirestore : function(subscription:Subscription): DocumentData{
        return{
            ...subscription
        }
    },
    fromFirestore: function(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ):Subscription{
        const data = snapshot.data(options);
    const sub: Subscription ={
           id:snapshot.id,
           cancel_at_period_end: data.cancel_at_period_end,
           created: data.created,
           current_period_start: data.current_period_start,
           items: data.items,
           latest_invoice : data.latest_invoice,
           metadata:data.metadata,
           payment_method: data.payment_method,
           price: data.price,
           prices:data.prices,
           product: data.product,
           quantity: data.quantity,
           status: data.status,
           stripeLink: data.stripelink,
           cancel_at: data.cancel_at,
           canceled_at: data.canceled_at,
           current_period_end: data.current_period_end,
           ended_at: data.ended_at,
           trial_start: data.trail_start,
            trial_end: data.trail_end,
            role: data.role,



            
        };
        return sub;
    },
 };

 export const subscriptionRef = (userId: string) => collection(db, 'customers', userId, 'subscriptions').withConverter(subscriptionConveters);
