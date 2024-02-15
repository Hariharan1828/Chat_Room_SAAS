import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logos from "@logos/Logo.png"
import { AspectRatio } from './ui/aspect-ratio'
const Logo = () => {
  return (
    
    <Link prefetch={false} href="/" className='overflow-hidden '>
        <div className="flex items-center w-72 h-14">
            <AspectRatio
                ratio={16/9}
                className='flex items-center justify-center'
            >
                <Image
            priority
            src={Logos}
            alt=''
            className='dark:filter dark:invert'  />
            </AspectRatio>
            

        </div>
    </Link>
  )
}

export default Logo