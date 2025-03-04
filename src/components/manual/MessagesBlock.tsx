import React, { useEffect, useState } from 'react'
import Message from './Message'
import { Loader2, RefreshCcw } from 'lucide-react'
import axios from 'axios';
import { useSession } from 'next-auth/react';

const MessagesBlock = () => {
  const [msgs, setmsgs] = useState([])
  const { data:session}= useSession()

  useEffect(() => {
    if (!session) {
      setmsgs([]);
      return;
    }
  
    async function getmsg() {
      try {
        const res = await axios.get('/api/getmessage');
        setmsgs(Array.isArray(res.data.message) ? res.data.message : []);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setmsgs([]);
      }
    }
  
    getmsg();
  }, [session]);

  console.log("messages",msgs);
  
  
  return (
    <div className="w-full flex gap-2 flex-wrap items-start justify-center p-6 relative overflow-y-scroll h-[60vh] max-h-[500px] sm:h-auto sm:max-h-none">

        <div className=' size-5 absolute left-1 top-1 rounded-lg flex items-center justify-center p-1 bg-green-600'>
        <RefreshCcw className=''/>
        </div>

       

        

        {msgs.length>0 ? msgs?.map((ele,idx)=>{
          return(
            <Message message={ele} key={idx}></Message>
          )
        }) : <div className='flex items-center justify-center'>
          <Loader2 className='animate-spin'></Loader2></div>}
        
        
        
    </div>
  )
}

export default MessagesBlock