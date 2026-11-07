"use client";

import React from 'react'
import { useTheme } from 'next-themes';
import { Sun, Moon } from "lucide-react"

const ThemeToggler = () => {

    // Theming
    const { setTheme } = useTheme();

    return (
        <div className='inline-flex flex-row gap-1 items-center p-1 rounded-lg bg-white dark:bg-black shadow-lg border'>
            {/* Light Theme Toggler */}
            <div
                onClick={() => setTheme("light")}
                className='bg-muted p-1.5 rounded-lg cursor-pointer border'>
                <Sun size={18} />
            </div>

            {/* Dark Theme Toggler */}
            <div
                onClick={() => setTheme("dark")}
                className='bg-muted p-1.5 rounded-lg cursor-pointer border'>
                <Moon size={18} />
            </div>
        </div>
    )
}

export default ThemeToggler