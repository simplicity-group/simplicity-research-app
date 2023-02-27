import React from 'react'
import { Link } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'

const ReportThumbnail = (props) => {

  const {getValueLabel} = UserAuth();

  return (
    <Link to='/specificreport'>
      <div className="overflow-hidden bg-white shadow-sm rounded-md border border-gray-300 hover:shadow-md hover:border-gray-400">
        <div className="px-4 py-3 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">{props.name}</h3>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="px-4 py-3 grid sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Rating</dt>
              <dd className="flex items-center mt-1 text-xs font-small text-white  sm:mt-0">
                {getValueLabel('rating', props.rating)}
              </dd>  
            </div>
            <div className=" px-4 py-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Stage</dt>
              <dd className="flex items-center mt-1 text-xs font-small text-white  sm:mt-0">
                {getValueLabel('stage', props.stage)}
              </dd>  
            </div>
            <div className="px-4 py-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Sectors</dt>
              <dd className="flex items-center mt-1 text-xs font-small text-white  sm:mt-0">
                  {getValueLabel('sectors', props.sectors)}
              </dd>            
            </div>
          </dl>
        </div>
      </div>
    </Link>
  )
}

export default ReportThumbnail
