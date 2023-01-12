import React from 'react'
import { NavLink } from 'react-router-dom'

const ReportThumbnail = () => {
  return (
    <NavLink className="overflow-hidden bg-white shadow-sm rounded-md border border-gray-300 hover:shadow-md hover:border-gray-400">
      <div className="px-4 py-3 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Betterverse</h3>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="px-4 py-3 grid sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Rating</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0">A*</dd>
          </div>
          <div className=" px-4 py-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Some Metric</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0">---</dd>
          </div>
          <div className="px-4 py-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Some Metric</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0">---</dd>
          </div>
        </dl>
      </div>
    </NavLink>
  )
}

export default ReportThumbnail
