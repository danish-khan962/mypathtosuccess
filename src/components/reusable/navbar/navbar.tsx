"use client"

import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import MaxWidthContainer from '@/style/max-width-container'
import { toast } from '@/components/ui/toast'
import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const Navbar = () => {
    const { data: session } = authClient.useSession();
    const router = useRouter();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const toggleMenuDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    }

    const handleSignOut = async () => {
        setIsLoading(true)
        try {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        toast.add({
                            title: "Signed out",
                            description: "You have been logged out successfully."
                        })
                        setDropdownOpen(false)
                        router.push("/sign-in")
                        router.refresh()
                    },
                    onError: (ctx) => {
                        toast.add({
                            title: "Problem in signing out",
                            description: ctx.error.message || "Failed to sign out."
                        })
                    }
                }
            })
        } catch (error) {
            toast.add({
                title: "Problem in signing out",
                description:"An unexpected error occurred while signing out."
            })
        }finally{
            setIsLoading(false)
        }
    }

    return (
        <nav className='sticky top-0 z-99 w-full bg-black/5 dark:bg-white/5 backdrop-blur-xl'>
            <MaxWidthContainer className='relative py-3 flex flex-row justify-between items-center'>
                {/* Left Side */}
                <div className='flex flex-row items-center gap-4'>
                    <Link href={"/"}>
                        <Image
                            src={"/logo.svg"}
                            alt='logo'
                            height={1000}
                            width={1000}
                            className='h-10 w-10'
                        />
                    </Link>

                    <div className='flex flex-row items-center gap-2'>
                        <Image
                            src={"/images/aizen-pfp.jpg"}
                            alt='logo'
                            height={1000}
                            width={1000}
                            className='h-7 w-7 rounded-full'
                        />
                        <p className='text-lg xl:text-xl font-semibold'>
                            Hi, {session?.user?.name || "User"}
                        </p>
                    </div>
                </div>

                {/* Right Side */}
                <div className='flex flex-row items-center gap-2'>
                    <div
                        onClick={toggleMenuDropdown}
                        className='bg-black/10 dark:bg-white/10 p-1.5 rounded-full cursor-pointer'>
                        <Menu size={17} />
                    </div>
                </div>


                {
                    dropdownOpen && (
                        <div className='absolute top-20 right-6 max-w-2xs w-full pt-10 pb-4 px-5 bg-white dark:bg-black border rounded-xl shadow-lg'>
                            <Button
                                variant={"destructive"}
                                onClick={handleSignOut}
                                disabled={isLoading}
                            >
                                {isLoading ? "Signing out..." : "Sign Out"}
                            </Button>
                        </div>
                    )
                }
            </MaxWidthContainer>
        </nav>
    )
}

export default Navbar