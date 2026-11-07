import ThemeToggler from '@/theme/theme-toggler'
import React from 'react'

const page = () => {
  return (
    <div className='font-bold text-5xl font-poppins p-10 bg-muted'>
      <ThemeToggler />
    </div>
  )
}

export default page