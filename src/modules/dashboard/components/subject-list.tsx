"use client"

import MaxWidthContainer from '@/style/max-width-container'
import React from 'react'

const SubjectList = () => {
    return (
        <MaxWidthContainer className='py-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4'>
            <div className='bg-radial from-forest-medium to-forest-dark'>
                Maths
            </div>
        </MaxWidthContainer>
    )
}

export default SubjectList