import React from 'react'
import { Link } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';

const SpecificRequest = () => {

  var {selectedRequest} = UserAuth();

  return (
    <div className='h-full bg-gray-100'>
      <div className='p-6'>
        <div className='mb-8'>
          <Link to='/requests'
            className='flex h-full justify-center items-center w-56 pl-4 pr-6 pt-2 pb-2 bg-black text-white shadow-sm rounded-md border border-gray-400 hover:shadow-md hover:border-gray-400 hover:bg-gray-900'>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <polyline points="15 6 9 12 15 18" />
            </svg>
            <p className='justify-center'>Back to Requests</p>
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg border border-gray-400  h-full mx-auto grid grid-cols-1 gap-y-16 gap-x-8 py-6 px-4 sm:px-6 lg:grid-cols-1 lg:px-8">
          
          <div className=''>
            <h2 className="text-2xl mb-4 pb-5 font-bold tracking-tight text-gray-900 sm:text-6xl border-b border-gray-200">{selectedRequest.name}</h2>
            <p className="mt-4 mb-4 text-gray-500">
              {selectedRequest.summary}
            </p>
              Status: {selectedRequest.status}
          </div>

        </div>
      </div>
    </div>


  )
}

export default SpecificRequest
