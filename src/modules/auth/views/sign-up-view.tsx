"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import MaxWidthContainer from '@/style/max-width-container'

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { signUpSchema, type SignUpFormValues } from "@/zodSchemas/sign-up-schema"
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { toast } from '@/components/ui/toast'

const SignUpView = () => {
  const router = useRouter();
  const [authError, setAuthError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const handleSignUp = async (data: SignUpFormValues) => {
    setAuthError("")

    try {
      await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: "/",
        fetchOptions: {
          onRequest: () => {
            setIsLoading(true)
          },
          onSuccess: () => {
            setIsLoading(false)
            toast.add({
              type: "success",
              title: "Signed up",
              description: "Signing you in...",
            })
            router.push("/")
            router.refresh()
          },
          onError: (ctx) => {
            setIsLoading(false)
            const message = ctx.error.message || "Something went wrong."
            setAuthError(message)
            toast.add({
              type: "error",
              title: "Problem in signing up",
              description: message,
            })
          },
        },
      })
    } catch (error) {
      setIsLoading(false)
      const fallbackMessage = "Unable to create your account. Please try again."
      setAuthError(fallbackMessage)
      toast.add({
        type: "error",
        title: "Problem in signing up",
        description: fallbackMessage,
      })
    }
  }

  return (
    <div className='relative w-full flex justify-center items-center min-h-screen bg-muted'>
      <MaxWidthContainer className='py-4 flex justify-center items-center'>

        {/* Form - Sign Up */}
        <form
          onSubmit={handleSubmit(handleSignUp)}
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

              <h2 className='font-bold text-2xl md:text-3xl tracking-tight'>Register Now</h2>
            </div>
            <p className='max-w-lg w-full font-normal text-neutral-600 dark:text-neutral-300 text-sm'>
              Register now! Even the greatest heroes started somewhere. Your first step today could become your legendary story tomorrow!
            </p>
          </div>

          <div className='flex flex-col gap-6'>
            {/* Name */}
            <div className='flex flex-col gap-1.5'>
              <label htmlFor="email" className='text-xs font-medium text-muted-foreground'>Name</label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder='E.g. John Doe'
                    className='placeholder:text-xs h-10'
                    type='text'
                  />
                )}
              />
              {errors.name && (
                <p className="text-xs text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className='flex flex-col gap-1.5'>
              <label htmlFor="email" className='text-xs font-medium text-muted-foreground'>Email</label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder='E.g. johndoe@gmail.com'
                    className='placeholder:text-xs h-10'
                    type='email'
                  />
                )}
              />
              {errors.email && (
                <p className="text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className='flex flex-col gap-1.5'>
              <label htmlFor="email" className='text-xs font-medium text-muted-foreground'>Password</label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder='E.g. John****'
                    className='placeholder:text-xs h-10'
                    type='password'
                  />
                )}
              />
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className='flex flex-col gap-1.5'>
              <label htmlFor="email" className='text-xs font-medium text-muted-foreground'>Confirm Password</label>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder='E.g. John****'
                    className='placeholder:text-xs h-10'
                    type='password'
                  />
                )}
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>


          {/* Sign Up Button */}
          <Button
            type='submit'
            className="h-10 bg-linear-to-tr from-forest-dark/80 via-forest-dark/90 to-forest-dark font-semibold text-white shadow-xl border-none cursor-pointer hover:opacity-95 transition-all ease-in-out duration-200"
            disabled={isLoading}
            >
           {isLoading ? "Creating your Account..." : "Sign Up"}
          </Button>


          <div className='flex flex-col gap-10 my-4'>
            <div className='flex flex-row justify-between items-center gap-8'>
              <hr className='w-full' />
              <span className='text-muted-foreground font-medium tracking-tight'>OR</span>
              <hr className='w-full' />
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
                  Continue with Google
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
                  Continue with Apple
                </span>
              </Button>
            </div>
          </div>

          <div className='text-sm text-center'>
            Already have an account?
            {" "}
            <Link
              href={"/sign-in"}
              className='font-medium text-forest-dark hover:underline transition-all duration-200 ease-in-out'
            >
              Sign In
            </Link>
          </div>

          {/*  */}
        </form>
      </MaxWidthContainer>
    </div>
  )
}

export default SignUpView