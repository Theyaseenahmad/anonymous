"use client"

 
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { signUpSchema } from "@/schemas/signupSchema";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { apiResponse } from "../../types/apiResponse";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "../globals.css";

const Signup = () => {

  const [username, setUsername] = useState('')
  const [checkingUsername,setCheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {toast} = useToast()

  const router = useRouter()

  const [checkmessage,setcheckmessage] = useState('')

  const debounceUsername = useDebounce(username,500)

  const handlesubmit = async (data:z.infer<typeof signUpSchema>)=>{
    setIsSubmitting(true)
    try {
      
    const SignupResult = await axios.post('/api/signup',data)

    toast({
      title:'success',
      description:SignupResult.data.message
    })
    setIsSubmitting(false)
    router.replace('/verify')
    } 
    catch (error) {
      console.error('error in signup')
      toast({
        title:'failed signup',
        description:'falied signing up',
        variant: "destructive"
      })
      setIsSubmitting(false)
    }

  }

  useEffect(()=>{

    if(debounceUsername){
      setCheckingUsername(true)
      setcheckmessage('')

      
    try {
      const checkUsernameunique = async ()=>{
        const usernameResult = await axios.get(`api/verifyUsernameUnique?username=${debounceUsername}`)
        setcheckmessage(usernameResult.data.message)
        toast({
          title:'check',
          description:usernameResult.data.message
        })
        setCheckingUsername(false)
        
      }

      checkUsernameunique()
      
    } catch (error) {
      const axiosError = error as AxiosError<apiResponse>
      setcheckmessage(axiosError.response?.data.message ?? 'username already taken')
      setCheckingUsername(false)
      
    }

    }


  },[debounceUsername,toast])

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues:{
      username:'',
      email:'',
      password:''
      
    }
  })


  return (
    <div className='grad back w-full fillinscreen flex justify-center items-center '>
    <Form  {...form}>
    <form className='grad front w-3/4 min-h-5/6 gap-4 bg-yellow-400 rounded-md  p-6 flex flex-col justify-start'  onSubmit={form.handleSubmit(handlesubmit)} >
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder="username" {...field}
              onChange={(e)=> {
                field.onChange(e)
                setUsername(e.target.value)
              }}
              />
            </FormControl>

            <p className={`text-sm font-semibold ${checkmessage.length>3 && checkmessage === 'username available' ? 'text-green-500' : 'text-red-500'}`}>{checkmessage}</p>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="Email" {...field} />
            </FormControl>
            
            <FormMessage  />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" placeholder="password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      
<p className='text-slate-800 text-xs font-bold'>Accept our terms and conditions, Learn More.</p>
      <Button className="p-4" type="submit" disabled={isSubmitting}>{
      isSubmitting ? (<>signing up !</>):('signup')
     }</Button>
    </form>
  </Form>
  </div>
  )
}

export default Signup




// 'use client'
// import React, { useState } from 'react'
// import axios from 'axios'
// import { signUpSchema } from '@/schemas/signupSchema'  //  Todo : use

// const Signup = () => {

//     const [username, setusername] = useState('')
//     const [email,setEmail] = useState('')
//     const [password, setPassword] = useState('')

//     const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
//         e.preventDefault()
//         const result = axios.post('/api/signup',{username,email,password})

//         setusername('')
//         setPassword('')
//         setEmail('')




//     }

//   return (
//     <div className='grad back w-full h-screen flex justify-center items-center bg-black'>
//     <form method='POST' className='grad front w-1/4 h-2/3 gap-4  rounded-md  p-6 flex flex-col justify-center items-center' onSubmit={
//       handleSubmit
//     }>
//       <h1 className='font-bold text-2xl text-white '>Signup</h1>
//       <div className=''>
//       <label className='text-white' htmlFor="username">Username</label>
//       <br />
//       <input className=' p-1 front border-2 rounded-md' id='username' name='username' onChange={(e)=>{
//         setusername(e.target.value)}} type="text" />
//       </div>

//       <div className=''>
//       <label className='text-white' htmlFor="email">email</label>
//       <br />
//       <input className='p-1 front border-2 rounded-md' id='email' name='email' onChange={(e)=>{
//         setEmail(e.target.value)}} type="email" />
//       </div>

//       <div className=''>
//       <label className='text-white' htmlFor="password">Password</label>
//       <br />
//       <input className='p-1 front border-2 rounded-md' id='password' name='password' onChange={(e)=>{
//         setPassword(e.target.value)}} type="password" />
//       </div>
      
        
//         <button className='front border-2 text-white border-hidden  bg-blue-400 rounded-lg p-2' type='submit'>Sign-up</button>
//     </form>
//     </div>
//   )
// }

// export default Signup