import {initFirestore} from "@auth/firebase-adapter";
import admin, { credential } from "firebase-admin";
import { PilcrowIcon } from "lucide-react";

let app;

if(!admin.app.length){
    app= admin.initializeApp(
        {
            credential:admin.credential.cert({
                projectId:process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY,
            }),
        }
    )
};

const adminDB= initFirestore(
    {
        credential:admin.credential.cert({
            projectId:process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY,
        }),
    }
);

const adminAuth = admin.auth(app);

export {adminAuth, adminDB};
