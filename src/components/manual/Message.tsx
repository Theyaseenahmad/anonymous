import { X } from 'lucide-react'
import React from 'react'

const Message = ({message}:any) => {

  
  return (
    <div className='flex rounded-lg min-h-20 w-48 border-2 border-white'>
        <div className='w-[85%] min-h-full p-1 text-sm font-bold font-[gilroy]'>
            <p>{message.content}</p>
        </div>
        <div className='w-[15%] h-full flex items-start justify-center rounded-lg py-2 '>
        <X className='bg-red-500 rounded-lg p-1'/>
          </div>
    </div>
  )
}

export default Message