import { authOptions } from "@/auth";
import LandingPage from "@/components/LandingPage";
import { Session } from "inspector";
import { getServerSession } from "next-auth";

export default async function Home() {
 
  return (
    <>
       
      <LandingPage/>
    </>
   
  );
}
