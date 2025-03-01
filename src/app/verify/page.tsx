'use client'
import axios from 'axios'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'


const Verify = () => {
  const router = useRouter()
    const [username,setUsername] = useState('')
    const [otp,setotp] = useState('')


    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault()
      axios.post('/api/verifyCode',{username,otp})
      toast({
        title:'success',
        description:"verified successfully",
        variant:'default'
      })
      router.replace('/')

    }

  return (
    <div className='fillinscreen grad back w-full h-screen flex justify-center items-center bg-black'>
    <form method='POST' className='grad front w-1/4 h-2/3 gap-4  rounded-md  p-6 flex flex-col justify-center items-center' onSubmit={
      handleSubmit
    }>
      <h1 className='font-bold text-2xl text-white '>Verify code</h1>
      <div className=''>
      <label className='text-white' htmlFor="username">Username</label>
      <br />
      <input className=' p-1 front border-2 rounded-md' id='username' name='username' onChange={(e)=>{
        setUsername(e.target.value)}} type="text" />
      </div>

      <div className=''>
      <label className='text-white' htmlFor="otp">otp</label>
      <br />
      <input className='p-1 front border-2 rounded-md' id='otp' name='otp' onChange={(e)=>{
        setotp(e.target.value)}} type="number" />
      </div>
      
        
        <button className='front border-2 text-white border-hidden  bg-blue-400 rounded-lg p-2' type='submit'>Verify</button>
    </form>
    </div>
  )
}

export default Verify