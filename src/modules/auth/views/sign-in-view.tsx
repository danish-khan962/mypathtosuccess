"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import MaxWidthContainer from '@/style/max-width-container'

import { Controller, useForm } from "react-hook-form"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { toast, Toast } from '@/components/ui/toast'

const SignInView = () => (
  <div className='relative w-full flex justify-center items-center min-h-screen bg-muted'>
    <MaxWidthContainer className='py-4 flex justify-center items-center'>

      {/* Form - Sign In */}
      <form
        className='max-w-3xl w-full flex flex-col gap-10'
      >
        <div className='flex flex-col'>
          <div className='flex flex-row items-center gap-2'>
            <Link href={"/"}>
              <Image
                src={"/logo.svg"}
                alt='logo'
                height={1000}
                width={1000}
                className='h-12 w-12' />
            </Link>

            <h2 className='font-bold text-2xl md:text-3xl tracking-tight'>Welcome Back</h2>
          </div>
          <p className='max-w-lg w-full font-normal text-neutral-600 dark:text-neutral-300 text-sm'>
            Legends aren&apos;t born at the finish line; they&apos;
            re forged through every battle.
          </p>
        </div>

        <div className='flex flex-col gap-6'>
          {/* Email */}
          <div className='flex flex-col gap-1.5'>
            <label htmlFor="email" className='text-xs font-medium text-muted-foreground'>Email</label>
            <Input
              placeholder='E.g. johndoe@gmail.com'
              className='placeholder:text-xs h-10'
              type='email'
            />
          </div>

          {/* Password */}
          <div className='flex flex-col gap-1.5'>
            <label htmlFor="email" className='text-xs font-medium text-muted-foreground'>Password</label>
            <Input
              placeholder='E.g. John****'
              className='placeholder:text-xs h-10'
              type='password'
            />
          </div>
        </div>

        {/* Sign In Button */}
        <Button className="h-10 bg-linear-to-tr from-forest-dark/80 via-forest-dark/90 to-forest-dark font-semibold text-white shadow-xl border-none cursor-pointer hover:opacity-95 transition-all ease-in-out duration-200">
          Sign in
        </Button>


        <div className='flex flex-col gap-10 my-4'>
          <div className='flex flex-row justify-between items-center gap-8'>
            <hr className='w-full'/>
            <span className='text-muted-foreground font-medium tracking-tight'>OR</span>
            <hr className='w-full'/>
          </div>

          {/* Social Authentication Buttons */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
            {/* Google Auth */}
            <Button
              variant={"secondary"}
              className="h-10 flex gap-3.5 border border-neutral-200 dark:border-neutral-900"
            >
              <Image
                src={"/images/icons8-google.png"}
                alt='google authentication'
                height={1000}
                width={1000}
                className='h-fit w-fit'
                loading='eager'
              />
              <span className='text-sm font-medium'>
                Login with Google
              </span>
            </Button>
            {/* Apple Auth */}
            <Button
              variant={"secondary"}
              className="h-10 flex gap-3.5 border border-neutral-200 dark:border-neutral-900"
            >
              <Image
                src={"/images/icons8-apple-blue.png"}
                alt='google authentication'
                height={1000}
                width={1000}
                className='h-fit w-fit'
                loading='eager'
              />
              <span className='text-sm font-medium'>
                Login with Apple
              </span>
            </Button>
          </div>
        </div>

        <div className='text-sm text-center'>
          Don&apos;t have an account?
          {" "} 
          <Link
            href={"/sign-up"}
            className='font-medium text-forest-dark hover:underline transition-all duration-200 ease-in-out'
          >
            Register Now
          </Link>
        </div>

        {/*  */}
      </form>
    </MaxWidthContainer>
  </div>
)

export default SignInView