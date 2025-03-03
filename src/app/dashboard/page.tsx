'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Url from '@/components/manual/Url'
import AcceptSwitch from '@/components/manual/AcceptSwitch'
import MessagesBlock from '@/components/manual/MessagesBlock'
import axios from 'axios'

const Dashboard = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const { user } = useParams()

  useEffect(() => {
    if (!session) {
      router.push('/signin')
    }
  }, [session, router]);

  return (
    <div className='flex justify-center items-center h-[90%] md:h-[60%] md:mt-6'>
  <div className='w-full max-w-3xl mx-auto ml-4 p-2 md:p-6 bg-blue-700 text-white font-bold rounded-lg flex flex-col items-center md:h-[60%] h-[80vh] md:mt-6 mt-8 overflow-hidden'>
    <h1 className='text-xl md:text-2xl'>User Dashboard</h1>
    <div className='flex flex-col gap-4 mt-4 w-full flex-1 overflow-hidden'>
      <Url />
      <AcceptSwitch />
      <div className="flex-1 w-full overflow-y-auto">
        <MessagesBlock />
      </div>
    </div>
  </div>
</div>
  )
}

export default Dashboard
