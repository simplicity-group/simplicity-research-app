import React, { useEffect } from 'react';
import { Fragment, useState } from 'react'
import ReportCard from '../components/reports/ReportCard';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { getReports } from '../firebase';
import LoadingData from '../components/general/LoadingData';
import { UserAuth } from '../context/AuthContext';

const Reports = () => {
  
  var {filters, reportsLoading, setReportsLoading, reportsData, setReportsData, setSelectedReport, onSpecificReport, setOnSpecificReport} = UserAuth();
  const [reportFilters, setReportFilters] = useState([])
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [visible, setVisible] = useState(8);
  const [filteredReports, setFilteredReports] = useState(reportsData);

  useEffect(() => {
    if(!onSpecificReport){
      getReportsData();
    }
    else{
      setOnSpecificReport(false);
    }
    localStorage.setItem("reportFilters", JSON.stringify(filters));
    var reportFilters = JSON.parse(localStorage.getItem("reportFilters"));
    reportFilters.pop(1) 
    setReportFilters(reportFilters)
  }, [])

  const getReportsData = async () => {
    setReportsLoading(true);
    setReportsData(await getReports());
    setReportsLoading(false);
  }

  var filterReports = async () => {
    setReportsLoading(true);
    localStorage.setItem("reportFiltersTrue", JSON.stringify(reportFilters));
    var reportFiltersTrue = JSON.parse(localStorage.getItem("reportFiltersTrue"));

    //Get checked filters
    for (var i = 0; i < reportFiltersTrue.length; i++){
      for (var x = 0; x < reportFiltersTrue[i].options.length; x++){
        delete reportFiltersTrue[i].options[x].label
        if(reportFiltersTrue[i].options[x].checked === false){
          delete reportFiltersTrue[i].options[x]
        }
        else{
          delete reportFiltersTrue[i].options[x].checked
        }
      }
    }

    //Split filters
    var sectorsFilter = reportFiltersTrue[0].options
    let sectorsFilterMapped = sectorsFilter.map(sector => { return sector.value });
    var ratingFilter = reportFiltersTrue[1].options
    let ratingFilterMapped = ratingFilter.map(rating => { return rating.value });
    var stageFilter = reportFiltersTrue[2].options
    let stageFilterMapped = stageFilter.map(stage => { return stage.value });

    //Filter for stage & rating
    setFilteredReports(reportsData.filter(function(report){

      var reportExist = false;
      var sectorsSplit = report.sectors.split(' ');

      for(var sectorSplitIndex = 0; sectorSplitIndex < sectorsSplit.length; sectorSplitIndex++){
        //Check for sectors
        if(sectorsFilterMapped.includes(sectorsSplit[sectorSplitIndex])){
          reportExist = true;
        }       
      }
      //Check for stages and rating
      if(reportExist == false){
        if(stageFilterMapped.includes(report.stage) || ratingFilterMapped.includes(report.rating)){
          reportExist = true;
        }
      }

      return reportExist
    }));  

    setReportsLoading(false);
  }

  const showMoreReports = () => {
    if (visible < filteredReports.length){
      setVisible((prevValue) => prevValue + 8);
    }
  };

  const unselectAll = () => {
    let i = 0;
    for (i = 0; i < reportFilters.length; i++){
      let f = 0;
      for (f = 0; f < reportFilters[i].options.length; f++){
        let checkboxId = 'report-filter-' + i + '-' + f
        reportFilters[i].options[f].checked = false;
        document.getElementById(checkboxId).checked = false;
      }
    }
    filterReports();
  };

  const unselectAllMobile = () => {
    let i = 0;
    for (i = 0; i < reportFilters.length; i++){
      let f = 0;
      for (f = 0; f < reportFilters[i].options.length; f++){
        let checkboxId = 'report-filter-mobile-' + i + '-' + f
        reportFilters[i].options[f].checked = false;
        document.getElementById(checkboxId).checked = false;
      }
    }
    filterReports();
  };

  const selectAll = () => {
    let i = 0;
    for (i = 0; i < reportFilters.length; i++){
      let f = 0;
      for (f = 0; f < reportFilters[i].options.length; f++){
        let checkboxId = 'report-filter-' + i + '-' + f
        reportFilters[i].options[f].checked = true;
        document.getElementById(checkboxId).checked = true;
      }
    }
    filterReports();
  };

  const selectAllMobile = () => {
    let i = 0;
    for (i = 0; i < reportFilters.length; i++){
      let f = 0;
      for (f = 0; f < reportFilters[i].options.length; f++){
        let checkboxId = 'report-filter-mobile-' + i + '-' + f
        reportFilters[i].options[f].checked = true;
        document.getElementById(checkboxId).checked = true;
      }
    }
    filterReports();
  };

  const handleFilterChange = (e) => {
    let filterId = e.target.id;
    const selectedFilter = filterId.split('-');

    if(selectedFilter.includes('mobile')){
      reportFilters[selectedFilter[3]].options[selectedFilter[4]].checked = e.target.checked
    }
    else{
      reportFilters[selectedFilter[2]].options[selectedFilter[3]].checked = e.target.checked
    }

    filterReports();
  };

  function selectReport(report){
    setSelectedReport(report);
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
              enterTo="translate-x-100 opacity-100"
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
                <div className='mb-2 mt-4 border-t border-gray-300'>
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

                  {reportFilters.map((section) => (
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
                                    id={`report-filter-mobile-${section.id}-${optionIdx}`}
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
            <h1 className='text-lg font-semibold text-gray-900'>Reports</h1>
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
          <div className='hidden flex flex-row h-screen overflow-y-visible sticky top-0 p-3 md:p-6 md:flex-col md:flex-none md:border-r md:block lg:block lg:p-6 lg:flex-col lg:flex-none lg:border-r lg:border-gray-300'>
            <div className='mb-2'>
              <button 
                className='w-full text-sm pl-8 pr-8 pt-2 pb-2	bg-black text-white shadow-sm rounded-md border border-gray-400 hover:shadow-md hover:border-gray-400 hover:bg-gray-900'
                onClick={selectAll}>
                  Select all
              </button>
            </div>
            <div>
              <button 
                className='w-full text-sm pl-8 pr-8 pt-2 pb-2	bg-white shadow-sm rounded-md border border-gray-400 hover:shadow-md hover:border-gray-400'
                onClick={unselectAll}>
                  Unselect all
              </button>
            </div>
            <form className="">
              {reportFilters.map((section) => (
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
                                id={`report-filter-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                defaultValue={option.value}
                                type="checkbox"
                                defaultChecked={option.checked}
                                className="border-2 h-4 w-4 bg-white border-gray-400 text-black checked:bg-black focus:ring-gray-200"
                                onChange={handleFilterChange}
                              />
                              <label
                                htmlFor={`report-filter-${section.id}-${optionIdx}`}
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

          {/* Report grid */}
          <div className="flex-1 flex bg-gray-100">
            <div className='flex-1 p-6 '>
            {
              reportsLoading 
              ? <LoadingData />
              : <div className="grid gap-6 mb-6 grid-cols-1 md:grid-cols-1 lg:grid-cols-2 ">
                    {filteredReports.slice(0, visible).map(report => (
                      <div key={report.id} onClick={() => selectReport(report)}>
                        <ReportCard 
                          id={report.id}
                          name={report.name} 
                          summary={report.summary}
                          rating={report.rating}
                          stage={report.stage}
                          sectors={report.sectors}
                        />
                      </div>
                    ))}
                </div>

            }
            {visible <= filteredReports.length && 
              <div className='w-100 flex'>
                <button 
                  className='m-auto pl-8 pr-8 pt-2 pb-2	bg-black text-white shadow-sm rounded-lg border border-gray-400 hover:shadow-md hover:border-gray-400 hover:bg-gray-900'
                  onClick={showMoreReports}>
                  Load more
                </button>
              </div>
            } 
            {filteredReports.length > 0 && visible > filteredReports.length &&
            <div className='w-100 flex'>
              <p className='m-auto text-gray-500'>no more reports</p> 
            </div>
            }
            {filteredReports.length == 0 && visible > filteredReports.length &&
            <div className='w-100 flex'>
              <p className='m-auto text-gray-500'>no results &nbsp; ╮(●︿●)╭</p> 
            </div>
            }
            </div>
          </div>

        </div>

      </main>

    </div>
  )
}

export default Reports
