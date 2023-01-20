import React from 'react'
import { ThreeDots } from 'react-loading-icons'

const Loading = () => {
  return (
    <div className='flex h-full'>
        <div className='m-auto'>
            <ThreeDots fill="black"/>
        </div>
    </div>
  )
}

export default Loading
