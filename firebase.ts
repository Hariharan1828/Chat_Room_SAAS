import {getApp, getApps, initializeApp} from "firebase/app"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
    apiKey: "AIzaSyDmEic5lbo-0CJZq42Ln1QCf02QLc8DPO8",
    authDomain: "chatroom-saas.firebaseapp.com",
    projectId: "chatroom-saas",
    storageBucket: "chatroom-saas.appspot.com",
    messagingSenderId: "915237364529",
    appId: "1:915237364529:web:7d782b8185f0298c334610",
    measurementId: "G-6VDESG1G4D"
  };

const app = getApps().length? getApp():initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export {db, auth,  functions};