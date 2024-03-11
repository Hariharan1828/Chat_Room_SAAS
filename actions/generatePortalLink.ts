"use server";
import { authOptions } from "@/auth";
import { adminDB } from "@/firebase-admin";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import Stripe from "stripe";



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {

    apiVersion: "2023-10-16",
    appInfo: {
        name: "e-commerce",
        version: "0.1.0",
    },
});

export default async function generatePortalLink() {
    const session = await getServerSession(authOptions);
    const host = headers().get("host");

    if(!session?.user?.id) return console.error("No user id found in session");
    const {
        user:{id}
    } = session;

    const redirectUrl = process.env.NODE_ENV ==="development"
    ? `http://${host}/register`
    : `https://${host}/register`;

    const doc = await adminDB.collection("customers").doc(id).get();

    if(!doc.data)
        return console.error("No customer found in firestore with id: ", id);

    const stripeData = doc.data()?.stripeId;

    const stripeSession = await stripe.billingPortal.sessions.create({
        customer: stripeData,
        return_url: redirectUrl,
    });
    return stripeSession.url;

} 