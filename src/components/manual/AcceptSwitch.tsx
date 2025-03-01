import React, { useEffect, useState } from 'react'
import { Switch } from '../ui/switch'
import { Label } from '../ui/label'
import axios from 'axios'

const AcceptSwitch = () => {
  const [Accept, setAccept] = useState(false)

  const Toggled = async()=>{
    const res = await axios.post('/api/updateAccept',{update:!Accept})
    
    setAccept(!Accept)
  }
  useEffect(() => {
   async function getStat(){
    const res = await axios.get('/api/isAcceptingmessage')
  
    setAccept(res.data.success)
   }
   getStat()

  }, [])

  
  

  return (
    <div className=' w-full h-10 flex items-center justify-start px-2'>
         <div className="flex items-center space-x-2">
      <Switch onClick={Toggled} checked={Accept} id="acceptMessage" />
      <Label htmlFor="acceptMessage">Accept Message</Label>
    </div>

    </div>
  )
}

export default AcceptSwitch