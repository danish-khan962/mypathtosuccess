"use client"

import Navbar from '@/components/reusable/navbar/navbar'
import React from 'react'
import SubjectList from '../components/subject-list'

const DashboardView = () => {
  return (
    <div className='relative w-full'>
      <Navbar />
      <SubjectList />
    </div>
  )
}

export default DashboardView