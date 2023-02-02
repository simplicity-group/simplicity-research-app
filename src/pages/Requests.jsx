import React from 'react';
import { Fragment, useState } from 'react'
import RequestCard from '../components/requests/RequestCard.jsx'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Requests = () => {

  var {filters, requestsLoading, setRequestsLoading, requestsData, setRequestsData, setSelectedRequest} = UserAuth();

  localStorage.setItem("requestFilters", JSON.stringify(filters));
  var requestFilters = JSON.parse(localStorage.getItem("requestFilters"));

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [visible, setVisible] = useState(21);
  
  const showMoreRequests = () => {
    if (visible < requestsData.length){
      setVisible((prevValue) => prevValue + 8);
    }
  };

  const unselectAll = () => {
    let i = 0;
    for (i = 0; i < requestFilters.length; i++){
      let f = 0;
      for (f = 0; f < requestFilters[i].options.length; f++){
        let checkboxId = 'request-filter-' + i + '-' + f
        requestFilters[i].options[f].checked = false;
        document.getElementById(checkboxId).checked = false;
      }
    }
    filterReports();
  };

  const unselectAllMobile = () => {
    let i = 0;
    for (i = 0; i < requestFilters.length; i++){
      let f = 0;
      for (f = 0; f < requestFilters[i].options.length; f++){
        let checkboxId = 'request-filter-mobile-' + i + '-' + f
        requestFilters[i].options[f].checked = false;
        document.getElementById(checkboxId).checked = false;
      }
    }
    filterReports();
  };

  const selectAll = () => {
    let i = 0;
    for (i = 0; i < requestFilters.length; i++){
      let f = 0;
      for (f = 0; f < requestFilters[i].options.length; f++){
        let checkboxId = 'request-filter-' + i + '-' + f
        requestFilters[i].options[f].checked = true;
        document.getElementById(checkboxId).checked = true;
      }
    }
    filterReports();
  };

  const selectAllMobile = () => {
    let i = 0;
    for (i = 0; i < requestFilters.length; i++){
      let f = 0;
      for (f = 0; f < requestFilters[i].options.length; f++){
        let checkboxId = 'request-filter-mobile-' + i + '-' + f
        requestFilters[i].options[f].checked = true;
        document.getElementById(checkboxId).checked = true;
      }
    }
    filterReports();
  };

  const handleFilterChange = (e) => {
    let filterId = e.target.id;
    const selectedFilter = filterId.split('-');
    requestFilters[selectedFilter[2]].options[selectedFilter[3]].checked = e.target.checked
    filterReports();
  };

  const filterReports = () => {
    console.log('Searching with new filter...')
    console.log(requestFilters)
  };

  function selectRequest(request){
    setSelectedRequest(request);
    //localStorage.setItem("selectedRequest", JSON.stringify(request));
  }
  
  return (
    <div className='h-full'>
    
      {/* Mobile filter panel */}
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-0 opacity-0"
              enterTo="translate-x-0 opacity-100"
              leave="transition ease-in-out duration-100 transform"
              leaveFrom="translate-x-0 opacity-100"
              leaveTo="opacitiy-0"
            >
              <Dialog.Panel className="relative mr-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <div className=' mt-4 border-t border-gray-300'>
                </div>
                <div className='p-3 md:p-6  border-b border-gray-300'>
                    <Link 
                      to="/newrequest">
                      <div className='flex h-full justify-center items-center text-sm pl-8 pr-8 pt-2 pb-2	bg-black text-white shadow-sm rounded-md border border-gray-400 hover:shadow-md hover:border-gray-400 hover:bg-gray-900'>
                        <div className='h-full justify-center items-center'>
                          New	&nbsp;
                        </div>
                        <div>
                          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus" width="21" height="21" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </div>
                      </div>  
                    </Link>
                </div>
                  <button 
                    className='ml-auto mr-auto mb-2 mt-2 w-11/12 text-sm pl-8 pr-8 pt-2 pb-2	bg-black text-white shadow-sm rounded-md border border-gray-400 hover:shadow-md hover:border-gray-400 hover:bg-gray-900'
                    onClick={selectAllMobile}>
                      Select all
                  </button>
                  <button 
                    className='ml-auto mr-auto w-11/12 text-sm pl-8 pr-8 pt-2 pb-2	bg-white shadow-sm rounded-md border border-gray-400 hover:shadow-md hover:border-gray-400'
                    onClick={unselectAllMobile}>
                      Unselect all
                  </button>
                <form className="mt-4 border-t border-gray-200">

                  {filters.map((section) => (
                    <Disclosure defaultOpen as="div" key={section.id} className="border-t border-gray-200 px-4 py-4">
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">{section.name}</span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                  <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-3">
                            <div className="space-y-2">
                              {section.options.map((option, optionIdx) => (
                                <div key={option.value} className="flex items-center">
                                  <input
                                    id={`request-filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    className="border-2 h-4 w-4 bg-white border-gray-400 text-black checked:bg-black focus:ring-gray-200"
                                    onChange={handleFilterChange}
                                  />
                                  <label
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <main className='h-full'>
        
        {/* Mobile header panel */}
        <div className="flex justify-between pt-6 bg-gray-100 md:hidden">
          <div className='ml-6'>
            <h1 className='text-lg font-semibold text-gray-900'>Requests</h1>
          </div>
          <div className="flex items-center">
            <button
              type="button"
              className="-m-2 mr-4 p-2 hover:text-gray-500 text-black sm:ml-6 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="sr-only">Filters</span>
              <FunnelIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="flex h-full">
          
          {/* Main filter panel */}
          <div className='hidden flex flex-row md:flex-col md:flex-none md:border-r md:block lg:block lg:flex-col lg:flex-none lg:border-r lg:border-gray-300'>
           <div className='p-3 md:p-6 border-b border-gray-300'>
              <Link 
                to="/newrequest">
                <div className='flex h-full justify-center items-center text-sm pl-8 pr-8 pt-2 pb-2	bg-black text-white shadow-sm sm:rounded-lg border border-gray-400 hover:shadow-md hover:border-gray-400 hover:bg-gray-900'>
                  <div className='h-full justify-center items-center'>
                    New	&nbsp;
                  </div>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus" width="21" height="21" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </div>
                </div>  
              </Link>
            </div>
            <div className='p-3 h-screen overflow-y-scroll scrollbar scrollbar-w-1 sticky top-0 md:p-6'>
              <div className='mb-2'>
                <button 
                  className='w-full text-sm pl-8 pr-8 pt-2 pb-2	bg-black text-white shadow-sm sm:rounded-lg border border-gray-400 hover:shadow-md hover:border-gray-400 hover:bg-gray-900'
                  onClick={selectAll}>
                    Select all
                </button>
              </div>
              <div>
                <button 
                  className='w-full text-sm pl-8 pr-8 pt-2 pb-2	bg-white shadow-sm sm:rounded-lg border border-gray-400 hover:shadow-md hover:border-gray-400'
                  onClick={unselectAll}>
                    Unselect all
                </button>
              </div>
              <form className="">
                {filters.map((section) => (
                  <Disclosure defaultOpen as="div" key={section.id} className="border-b border-gray-200 py-5">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between py-1 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-lg text-gray-900">{section.name}</span>
                            <span className="ml-12 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-2">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`request-filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="border-2 h-4 w-4 bg-white border-gray-400 text-black checked:bg-black focus:ring-gray-200"
                                  onChange={handleFilterChange}
                                />
                                <label
                                  htmlFor={`request-filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </div>

          </div> 

          {/* Request grid */}
          <div className="flex-1 flex bg-gray-100">
            <div className='flex-1 p-6 '>
              <div className="grid gap-6 mb-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {requestsData.slice(0, visible).map(request => (
                    <div key={request.id} onClick={() => selectRequest(request)}>
                      <RequestCard 
                        id={request.id}
                        name={request.name} 
                        status={request.status}
                      />
                    </div>
                  ))}
              </div>
              {visible <= requestsData.length && 
                <div className='w-100 flex'>
                  <button 
                    className='m-auto pl-8 pr-8 pt-2 pb-2	bg-black text-white shadow-sm rounded-lg border border-gray-400 hover:shadow-md hover:border-gray-400 hover:bg-gray-900'
                    onClick={showMoreRequests}>
                      Load more
                  </button>
                </div>
              } 
              {visible > requestsData.length &&
              <div className='w-100 flex'>
                <p className='m-auto text-gray-500'>no more reports &nbsp; ╮(●︿●)╭</p> 
              </div>
              }
              
            </div>
          </div>

        </div>

      </main>

    </div>
  )
}

export default Requests
