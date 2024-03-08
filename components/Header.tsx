import React from 'react'
import Logo from './Logo'
import DarkModeToggle  from './DarkModeToggle'
import UserButton from './UserButton'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import  Link  from 'next/link';
import { MessagesSquare } from 'lucide-react'
import CreateChatButton from './CreateChatButton'
import UpgradeBanner from './UpgradeBanner'

const Header = async () => {
  const Session = await getServerSession(authOptions)
  return (
    <header className=' bg-transparent dark:bg-transparent'>
        <nav className='flex flex-col sm:flex-row items-center 
        p-5 pl-2 dark:bg-transparent max-w-7xl mx-auto'>
            <Logo/>
          <div className="flex-1 flex items-center justify-end space-x-4">
            {/* language select  */}
            {Session?(
              <>
                <Link
                  href={"/chat"}
                  prefetch={false}
                >
                  <MessagesSquare className='text-black dark:text-white'/>
                  
                </Link>
              
              </>
            ):(
              <Link
              href={"/pricing"}
              >Pricing</Link>
            )
            
            }

            <CreateChatButton/>
            <DarkModeToggle/>
            <UserButton Session={Session}/>
          </div>
        </nav>

        <UpgradeBanner/>
    </header>
  )
}

export default Header