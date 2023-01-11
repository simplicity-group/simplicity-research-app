import React from 'react'
import { NavLink } from 'react-router-dom'
import TextTruncate from 'react-text-truncate'

const ReportCard = (props) => {
  return (
    <div class="overflow-hidden bg-white shadow-sm rounded-md border border-gray-300">
      <div class="px-4 py-3 sm:px-6">
          <h3 class="text-lg font-medium leading-6 text-gray-900">{props.name}</h3>
          </div>
          <div class="border-t border-gray-200 grid grid-cols-1">
          <div class="px-4 py-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Status</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0">
                  <p>{props.status}</p>
              </dd>
          </div>
      </div>
    </div>
  )
}

export default ReportCard
