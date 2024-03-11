'use client';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import UserAvatar from "./UserAvatar"
import { Session } from "next-auth"
import { Button } from "@/components/ui/button"
import { signIn, signOut } from "next-auth/react"
import { useSubscriptionStore } from "@/store/store";
import { StarIcon } from "lucide-react";
import {Spinner} from "@nextui-org/react";
  
const UserButton = ({Session}:{Session:Session|null}) => {
  const subscription = useSubscriptionStore((state) => state.subscription);
  if(!Session) return(
    <Button variant={"outline"} onClick={()=>signIn()}>
      SignIn
    </Button>
  )

  return (
    Session && (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <UserAvatar name={Session.user?.name} image={Session.user?.image} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>{Session.user?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {subscription===undefined && (<DropdownMenuItem ><Spinner color="primary"/></DropdownMenuItem>)}
          
            {subscription?.role==="pro" && (
            <>
            <DropdownMenuLabel className="text-xs flex items-center justify-center space-x-1 text-[#E935C1] animate-pulse">
              <StarIcon fill="#E935C1"/>
              <p>PRO</p>
            </DropdownMenuLabel>

            <DropdownMenuSeparator/>
            
            <DropdownMenuItem >Manage Subscription</DropdownMenuItem>
            </>
            
            )
          
            }
            <DropdownMenuItem onClick={()=>signOut()}>SignOut</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    )

  )
}

export default UserButton