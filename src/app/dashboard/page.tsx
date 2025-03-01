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
    <div className='flex justify-center items-center h-[60%]  mt-6'>
      <div className='w-full max-w-3xl mx-auto ml-4 p-4 md:p-6 bg-blue-700 text-white font-bold rounded-lg  flex flex-col items-center h-[60%] mt-6'>
        <h1 className='text-xl md:text-2xl'>User Dashboard</h1>
        <div className='flex flex-col gap-4 mt-4 w-full'>
          <Url />
          <AcceptSwitch />
          <MessagesBlock />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
