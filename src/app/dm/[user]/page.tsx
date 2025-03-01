'use client'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import axios from 'axios'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

const User = () => {
  const pathname = usePathname()
  const [message, setmessage] = useState('')
  const userName = pathname.split('/').splice(-1)[0].toString()

  const { toast } = useToast()

  const sendMsg = async () => {
    const res = await axios.post('/api/sendMessage', {
      message,
      username: userName,
    })

    if (res.data.success) {
      toast({
        title: 'Success',
        description: 'Message sent successfully',
        variant: 'default',
      })
    } else {
      toast({
        title: 'Failed',
        description: 'Invalid message',
        variant: 'destructive',
      })
    }

    setmessage('')
  }

  return (
    <div className="min-h-[100%] mt-10 flex items-center justify-center p-4 ">
      <div className="bg-blue-700 w-full max-w-lg md:w-[80%] md:h-[80%] flex flex-col items-center p-4 gap-4 rounded-xl text-white font-semibold">
        <h1>Public Profile</h1>

        <div className="grid w-full max-w-sm items-center gap-2.5">
          <Label htmlFor="message">Send Message Anonymously to @ {userName}</Label>
          <Textarea
            value={message}
            onChange={(e) => setmessage(e.target.value)}
            className="text-black"
            id="message"
          />
        </div>

        <Button onClick={sendMsg} className="w-[78%]">
          Send
        </Button>
      </div>
    </div>
  )
}

export default User
