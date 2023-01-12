import React from 'react'
import { Link } from 'react-router-dom'

const ReportCard = (props) => {
  return (
    <Link 
      to="/specificrequest"> 
      <div className="h-full bg-white shadow-sm rounded-md border border-gray-300 hover:shadow-md hover:border-gray-400">
        <div className="px-4 py-3 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">{props.name}</h3>
            </div>
            <div className="border-t border-gray-200 grid grid-cols-1">
            <div className="px-4 py-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0">
                    <p>{props.status}</p>
                </dd>
            </div>
        </div>
      </div>
    </Link>
  )
}

export default ReportCard
