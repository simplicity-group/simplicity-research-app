import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { UserAuth } from '../../context/AuthContext';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../images/sr_logo.svg'
import SRCoin from '../../images/coin.svg'

const navigation = [
  { name: 'Reports', href: '/reports', current: false },
  { name: 'My Reports', href: '/requests', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const navigate = useNavigate();

  const {user, userComplete, profilePic, reportsData, setSelectedReport, requestsData, setSelectedRequest, profileTokens} = UserAuth();

  //Put report and request arrays together
  const items = reportsData.concat(requestsData)

  const [search,setSearch] = useState('');
  const [searchResultsVisible, setSearchResultsVisible] = useState(false)

  function searching(value){
    if(value){
      setSearch(value)
      var filteredResults = items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

      if (filteredResults.length === 0){
        setSearchResultsVisible(false)
      }
      else{
        setSearchResultsVisible(true)
      }
    }
    else{
      setSearchResultsVisible(false)
    }
  }

  function searchClick(item){
    setSearchResultsVisible(false)

    //Navigate to request
    if(item.status){
      setSelectedRequest(item)
      navigate('/specificrequest');
    }
    //Navigate to report
    else{
      setSelectedReport(item)
      navigate('/specificreport');
    }
  }

  function clickInput(){
    if(search && searchResultsVisible === false){
      setSearchResultsVisible(true)
    }
  }

  const activeLogoNavbarLink = 'border-b-2 border-black text-black px-4 py-4 h-full text-sm font-medium'
  const activeNavbarLink = 'border-b-2 border-black text-black px-4 py-5 h-full text-base font-medium'
  const normalNavbarLink = 'text-gray-600 hover:text-black px-4 py-5 rounded-md text-base font-sm'
  const activeDisclosureLink = 'border-l-4 border-black block px-3 py-3 text-base font-medium text-black bg-gray-200 text-black'
  const normalDisclosureLink = 'block px-3 py-3 text-base pl-4 font-medium text-gray-600 hover:text-black'
  const acitveProfileLink = 'flex align-middle pl-2 pr-2 h-full flex justify-center items-center border-b-2 border-black'
  const normalProfileLink = 'flex align-middle pl-2 pr-2 h-full flex justify-center items-center'

  if (!user || !userComplete ){
    return null
  } else {
    return (
      <Disclosure as="nav" className="bg-white-800 shadow">
        {({ open }) => (
          <>
            <div className=" px-2 sm:px-6 lg:px-8">
              <div className="flex relative h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 h-full items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <NavLink key='logo' to='/home'                      
                        className={({ isActive }) => 
                        isActive?
                        activeLogoNavbarLink: normalNavbarLink}
                        >                      
                    <img
                        className="block h-8 w-auto lg:hidden"
                        src={logo}
                        alt="Simplicity Research"
                    />
                    <img
                        className="hidden h-8 w-auto lg:block"
                        src={logo}
                        alt="Simplicity Research"
                    />
                  </NavLink>
                </div>
                  <div className="hidden sm:ml-6 sm:mr-16 sm:block">
                    <div className="flex space-x-4 h-full ">
                      {navigation.map((item) => (
                        <NavLink key={item.name} to={item.href} 
                        className={({ isActive }) => 
                        isActive?
                        activeNavbarLink: normalNavbarLink}
                        >                      
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-auto h-full justify-end absolute inset-y-0 right-0 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Search bar */}
                  <div className="relative hidden sm:block w-4/6">
                    <div className='w-full'>
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                      </div>
                      <input 
                        onChange={(e) => searching(e.target.value)}
                        onClick={() => clickInput()}
                        type="text" 
                        id="search-navbar" 
                        className="bg-gray-100 block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-black focus:border-black" 
                        placeholder="Search"
                      />

                      { searchResultsVisible === true &&
                      <div className='absolute w-full bg-white border border-gray-300 rounded-md mt-1 shadow-md'>
                          {items.filter((item) => {
                            return search.toLowerCase() === ''
                            ? null
                            : item.name.toLowerCase().includes(search.toLowerCase());
                              }).slice(0,6).map((item) => (
                                <div key={item.id} onClick={() => searchClick(item)} className='p-2 w-full hover:bg-gray-100 hover:cursor-pointer'>
                                  <p className='w-full text-sm'> 
                                    {item.name}
                                  </p>
                                </div>
                              ))
                          }
                      </div>
                      }

                    </div>
                  </div>

                  {/* Coin */}
                  <div className='relative justify-center flex items-center m-1 md:ml-3 md:mr-3'>
                    <div className='m-1 md:m-2 text-sm text-gray-900'>
                      {profileTokens}
                    </div>
                    <img src={SRCoin} className="w-6" />
                  </div>

                  {/* Profile */}
                  <Menu as="div" className="relative h-full">
                    <div className='h-full '>
                      <NavLink key='account' to='/account' 
                        className={({ isActive }) => 
                        isActive?
                        acitveProfileLink: normalProfileLink}
                        >
                        <img
                          className="h-8 w-8 rounded-full"
                          src={profilePic}
                          alt=""
                        />                      
                      </NavLink>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              key="account"
                              to="/account"
                              className={classNames(active ? 'bg-black text-white' : '', 'block px-4 py-2 text-sm')}
                            >
                            </Link>
                          )}
                        </Menu.Item>

                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 pt-2 pb-3">
                {navigation.map((item) => (
                  <NavLink key={item.name} to={item.href} 
                  className={({ isActive }) => 
                  isActive?
                  activeDisclosureLink: normalDisclosureLink}
                  >                      
                    {item.name}
                  </NavLink>
                ))}
                <div className="relative mb-5 md:hidden ml-2 mr-2">
                  <div className='mt-3 '>
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    </div>
                    <input 
                      type="text" 
                      id="search-navbar" 
                      className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" 
                      placeholder="Search"
                      onChange={(e) => searching(e.target.value)}
                      onClick={() => clickInput()}
                      />
                      { searchResultsVisible === true &&
                      <div className='absolute w-full bg-white border border-gray-300 rounded-md mt-1 shadow-md'>
                          {items.filter((item) => {
                            return search.toLowerCase() === ''
                            ? null
                            : item.name.toLowerCase().includes(search.toLowerCase());
                              }).slice(0,6).map((item) => (
                                <div key={item.id} onClick={() => searchClick(item)} className='p-2 w-full hover:bg-gray-100 hover:cursor-pointer'>
                                  <p className='w-full text-sm'> 
                                    {item.name}
                                  </p>
                                </div>
                              ))
                          }
                      </div>
                      }
                  </div>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    )    
  }
}
