import { authOptions } from '@/auth'
import PricingCards from '@/components/PricingCards'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async () => {
    const session = await getServerSession(authOptions)
  return (
    <div className="isolate overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pb-96 pt-24 text-center sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl lg:text-4xl font-semibold leading-7 text-indigo-400"> Lets handle your membership {session?.user?.name?.split(" ")[0]} </h2>
        </div>
        <div className="relative mt-6">
          
          <svg viewBox="0 0 1208 1024" 
          className="absolute -top-10 left-1/2 -z-10 h-[64rem] -translate-x-1/2 
          [mask-image:radial-gradient(closest-side,white,transparent)] sm:-top-12 md:-top-20 lg:-top-12 xl:top-0">
            
            <ellipse
              cx={604}
              cy={512}
              fill="url(#radial-gradient-pricing)"
              rx={604}
              ry={512}
            />
            <defs>
              <radialGradient id="radial-gradient-pricing">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1"/>
              </radialGradient>  
            </defs>
          </svg>
        </div>
      </div>

        <div className="-mt-80">
          <PricingCards redirect={false}/>
        </div>
      
    </div>
  )
}

export default page