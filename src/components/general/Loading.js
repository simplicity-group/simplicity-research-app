import React from 'react'
import { ThreeDots } from 'react-loading-icons'

const Loading = () => {
  return (
    <div className='flex h-full bg-gray-100 h-full justify-center items-center'>
        <div className='m-auto'>
            <ThreeDots fill="black"/>
        </div>
    </div>
  )
}

export default Loading
