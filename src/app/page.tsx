'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

const Home = () => {
  const [isloading, setIsloading] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
   setIsloading(false)
  }, [])
  

  return (
    <div className='w-full max-w-lg text-center md:text-left md:max-w-2xl mx-auto flex flex-col gap-4 justify-start p-6 md:p-10 mt-8'>
      <div className='text-4xl md:text-6xl font-bold tracking-tight uppercase text-black'>Get</div>
      <div className='text-4xl md:text-6xl font-bold tracking-tight uppercase text-black'>Unfiltered</div>
      <div className='text-4xl md:text-6xl font-bold tracking-tight uppercase text-blue-600'>Reviews</div>

      <p className='text-sm md:text-base font-medium text-gray-600 tracking-normal'>Get your audience to speak about your content.</p>

      <Link className='flex items-center justify-center p-1' href={'/sign-up'}>
        <Button onClick={()=>setIsloading(true)} className='bg-blue-600 px-6 py-4 md:px-8 md:py-6 w-full font-semibold tracking-tight text-base md:text-lg'>{isloading ?<Loader2 className='animate-spin'></Loader2> : <h3>Get Started</h3> }</Button>
      </Link>
    </div>
  )
}

export default Home
