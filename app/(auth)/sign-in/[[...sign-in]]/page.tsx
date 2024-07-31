'use client'
import { SignIn, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';
import React from 'react'

const SignInPage = () => {
  const { isSignedIn } = useUser();
  const router = useRouter();
  if (isSignedIn) {
    // Redirect to a different page if the user is already signed in
    router.push('/dashboard'); // Replace '/dashboard' with your desired URL
    return null; // Prevent rendering of the SignIn component
  }
  return (
    <main className='flex-center h-screen w-full'>
      <SignIn />
    </main>
  )
}

export default SignInPage