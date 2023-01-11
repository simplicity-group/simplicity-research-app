import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import ReportThumbnail from '../components/reports/ReportThumbnail'

const Home = () => {
  return (
    <div className="bg-gray-100 h-full justify-center items-center grid grid-cols-1 gap-x-4 mt-10 sm:mt-10 sm:mb-auto sm:px-6 md:mt-10 md:mb-auto lg:mt-auto lg:mb-auto lg:grid-cols-3 lg:px-8">
      <div className='pl-4 pr-4 mb-10 col-span-3 sm:mb-10 lg:col-span-2'>
        <div className='pb-16'>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Good Afternoon John Doe
          </h2>
          <h3 className="mt-4 text-gray-600">
            What would you like to do today?
          </h3>
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-1 gap-y-8 lg:gap-x-4">
          <NavLink 
            to="/newrequest"
            className="bg-white relative flex flex-row gap-6 border border-gray-400 rounded-lg p-6 hover:shadow-md">
              <div className="flex grow-0 h-8 w-8 p-1 rounded-md bg-black text-white items-center justify-center sm:h-12 sm:w-12 sm:rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-lg font-semibold text-gray-900">Request a new Report</p>
                <p className="mt-2 text-base leading-7 text-gray-600">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.</p>
              </div>
          </NavLink>

          <NavLink 
            to="/requests"
            className="bg-white relative flex flex-row gap-6 border border-gray-400 rounded-lg p-6 hover:shadow-md">
              <div className="flex grow-0 h-8 w-8 p-1 rounded-md bg-black text-white items-center justify-center sm:h-12 sm:w-12 sm:rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-clipboard-check" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
                <rect x="9" y="3" width="6" height="4" rx="2" />
                <path d="M9 14l2 2l4 -4" />
              </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-lg font-semibold text-gray-900">Check status of a Report</p>
                <p className="mt-2 text-base leading-7 text-gray-600">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.</p>
              </div>
          </NavLink>

          <NavLink 
            to="/reports"
            className="bg-white relative flex flex-row gap-6 border border-gray-400 rounded-lg p-6 hover:shadow-md">
              <div className="flex grow-0 h-8 w-8 p-1 rounded-md bg-black text-white items-center justify-center sm:h-12 sm:w-12 sm:rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-report-search" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M8 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h5.697" />
                <path d="M18 12v-5a2 2 0 0 0 -2 -2h-2" />
                <rect x="8" y="3" width="6" height="4" rx="2" />
                <path d="M8 11h4" />
                <path d="M8 15h3" />
                <circle cx="16.5" cy="17.5" r="2.5" />
                <path d="M18.5 19.5l2.5 2.5" />
              </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-lg font-semibold text-gray-900">Browse Popular Reports</p>
                <p className="mt-2 text-base leading-7 text-gray-600">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.</p>
              </div>
          </NavLink>
        </dl>
      </div>

      <div className='pl-4 pr-4 mb-8 sm:mb-6 md:mb-8 lg:m-0 col-span-3 lg:col-span-1'>
        <div className='sm:m-0 bg-white border border-gray-400 rounded-lg shadow-md'>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl mb-4 ml-6 mt-4">Popular Reports</h2>
          <div className='ml-4 mr-4 mb-8'>
            <div className="grid grid-cols-1 grid-rows-3 gap-2 sm:gap-4 lg:gap-6 m-4 ">
              <ReportThumbnail/>
              <ReportThumbnail/>
              <ReportThumbnail/>
            </div>
          </div>
        </div>
      </div>
  </div>
  )
}

export default Home
