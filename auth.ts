import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from 'next-auth/providers/github'
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { adminAuth, adminDB } from "./firebase-admin";
import { User } from "firebase/auth";
import { JWT } from "next-auth/jwt";


export const authOptions: NextAuthOptions= {
    // Configure one or more authentication providers
    providers: [
    //   GithubProvider({
    //     clientId: process.env.GITHUB_ID,
    //     clientSecret: process.env.GITHUB_SECRET,
    //   }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
    ],
    callbacks:{
      session:async ({session, token})=>{
        if(session?.user){
          if(token.sub){
            session.user.id= token.sub;

            const firebaseToken = await adminAuth.createCustomToken(token.sub);
            session.firebaseToken= firebaseToken;
          }
        }
        return session;
      },
      jwt: async ({user,token})=>{
        if(user){
          token.sub = user.id;
        }
        return token;
      }
    },
 
    session:{
      strategy:'jwt',
      
    },
    adapter: FirestoreAdapter(adminDB),

  } satisfies NextAuthOptions
 