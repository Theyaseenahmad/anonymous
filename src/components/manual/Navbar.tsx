'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { signOut } from 'next-auth/react'
import { User } from 'next-auth'
import { toast } from '@/hooks/use-toast'
import { useSession } from 'next-auth/react'
import { Menu, X } from 'lucide-react'
import "../../app/globals.css"

const Navbar = () => {
  const { data: session } = useSession()
  const user: User = session?.user as User
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className='w-full h-16 px-6 md:px-10 flex items-center justify-between bg-white shadow-md fixed top-0 left-0 right-0 z-50'>
      {/* Logo */}
      <Link href={'/'} className='flex items-center gap-2'>
        <div className='size-8 overflow-hidden rounded-lg'>
          <img className='w-full h-full object-cover' src="/unknown.png" alt="Logo" />
        </div>
        <h2 className='text-lg font-bold'>ANONYMOUS</h2>
      </Link>

      {/* Desktop Navigation */}
      <div className='hidden md:flex gap-4 items-center'>
        {session ? (
          <>
            <Link href={'/dashboard'} className='px-4 py-2 text-white bg-blue-500 rounded-lg text-sm font-semibold'>Dashboard</Link>
            <button 
              className='px-4 py-2 text-white bg-blue-500 rounded-lg text-sm font-semibold'
              onClick={() => {
                signOut()
                toast({ title: 'Logout successful', description: 'Redirecting...' })
              }}
            >Sign Out</button>
          </>
        ) : (
          <>
            <Link href={'/signin'} className='px-4 py-2 text-white bg-blue-500 rounded-lg text-sm font-semibold'>Sign In</Link>
            <Link href={'/sign-up'} className='px-4 py-2 text-white bg-blue-500 rounded-lg text-sm font-semibold'>Sign Up</Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button className='md:hidden' onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-4 md:hidden'>
          {session ? (
            <>
              <Link href={'/dashboard'} className='px-4 py-2 text-white bg-blue-500 rounded-lg text-sm font-semibold'>Dashboard</Link>
              <button 
                className='px-4 py-2 text-white bg-blue-500 rounded-lg text-sm font-semibold'
                onClick={() => {
                  signOut()
                  toast({ title: 'Logout successful', description: 'Redirecting...' })
                }}
              >Sign Out</button>
            </>
          ) : (
            <>
              <Link href={'/signin'} className='px-4 py-2 text-white bg-blue-500 rounded-lg text-sm font-semibold'>Sign In</Link>
              <Link href={'/sign-up'} className='px-4 py-2 text-white bg-blue-500 rounded-lg text-sm font-semibold'>Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
