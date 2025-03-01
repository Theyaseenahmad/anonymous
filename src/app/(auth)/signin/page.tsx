'use client'
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { signinSchema } from '@/schemas/signinSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { Form } from '@/components/ui/form'

// todo : use react hook form to signin as well as validation

const Signin =  () => {

  const {toast} = useToast()


  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      identifier:'',
      password:""
    }
  })


  const submitFunc = async (data:z.infer <typeof signinSchema>)=>{



    if(!data.identifier || !data.password){
      toast({
        title:'Signin error',
        description:"please fill all the fields"
      }
      
      )
    }
    else {

      const signInResult = await signIn('credentials',
        {
          redirect:false,
          identifier : data.identifier,
          password : data.password
        }
  
      )
  
      if(signInResult?.error){
        throw Error("cannot signin")
      }
      else{
        
        window.location.href ='/'
      }
    }
  
    }


  return (
    <div className='fillinscreen grad back w-full h-screen flex justify-center items-center '>
    <Form {...form}>
    <form onSubmit={form.handleSubmit(submitFunc)} className='grad front w-3/4 h-4/6 gap-4  rounded-md p-6 flex flex-col justify-between  bg-yellow-400' >

      <FormField
        name="identifier"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username or Email</FormLabel>
            <FormControl>
              <Input placeholder="" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="password"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input placeholder="" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <p className='text-slate-800 text-xs font-bold'>Accept our terms and conditions, Learn More.</p>
      <Button type="submit">Signin</Button>
    </form>
  </Form>
  </div>

  )
}

export default Signin

