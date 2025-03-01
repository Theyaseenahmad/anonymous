'use client'
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSession } from 'next-auth/react'
import { useToast } from '@/hooks/use-toast'

const Url = () => {

  const {data: session} =  useSession()
  
  const [url, seturl] = useState('')

  const {toast} = useToast()

  const copytxt = () => {
    navigator.clipboard.writeText(url).then(() => {
      // Show a success message
      toast({
        title: 'copied',
        description: 'Link copied to clipboard',
      })
      
  }).catch(err => {
      console.error("Failed to copy: ", err);
  });
  }

  useEffect(() => {
    if (session?.user?.username) {
      seturl(`${process.env.NEXT_PUBLIC_ROOT_URL}/dm/${session.user.username}`)
    }
  }, [session?.user.username])
  

  
  return (
    <div>
        <div className='text-xl font-bold capitalize'>copy your Review link</div>
        <div className=' w-full min-h-8 rounded-xl flex p-1 gap-2'>
            <Input readOnly value={url} className='border-none outline-none text-black'></Input>
            <Button onClick={copytxt} className='text-sm font-bold uppercase '>Copy</Button>
        </div>
    </div>
  )
}

export default Url