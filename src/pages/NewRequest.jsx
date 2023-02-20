import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { submitRequest, getRequests } from '../firebase';
import TransactionModal from '../components/general/TransactionModal';

const NewRequest = () => {

  const {profile, setSelectedRequest, setRequestsData} = UserAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [transactionLoading, setTransactionLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false)
  const [whitepaper, setWhitepaper] = useState(null);
  const [pitchdeck, setPitchdeck] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [projectWebsite, setProjectWebsite] = useState('')

  function disableSubmit(){
    if( (modalOpen === true && loading === true) || (projectName === '' || pitchdeck === null && whitepaper === null)){
      return true
    }
    else{
      return false
    }
  }

  function handleSubmit(){
    if(projectName && (pitchdeck || whitepaper)){
      setLoading(true);
      setModalOpen(true);
    } else {
      alert('To submit a request you need to provide a project name and either a pitchdeck or whitepaper.')
    }
  } 

  async function callSubmitRequest(){
    setSelectedRequest(await submitRequest(profile.id, projectName, projectWebsite, pitchdeck, whitepaper));
    navigate('/specificrequest'); 
    setModalOpen(false);
    setLoading(false);
    setRequestsData(await getRequests(profile.id));  
  }

  return (
    <div className="bg-gray-100 h-full">
        <TransactionModal 
          modalOpen={[modalOpen, setModalOpen]}
          transactionLoading={[transactionLoading, setTransactionLoading]}
          transactionTitle="New Request"
          transactionDescription="Making a new request will transact 2 tokens from your account, would you like to proceed?"
          transactionCost={2}
          postTransactionAction={callSubmitRequest}
        />
        <div className="ml-4 mr-4 sm:ml-auto sm:mr-auto bg-gray-100 pt-12 md:pt-20 md:w-3/5 ">
          <form className='bg-white rounded-md'>
            <div className="shadow-md border border-gray-400 rounded-md">
              <div className='border-b border-gray p-3 '>
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900  ml-3">New Request</h2>
              </div>
              <div className="space-y-6  px-4 py-5 sm:p-6">
                <div className=''>
                  <label className="block text-sm font-medium text-gray-700">Name of Project</label>
                  <input onChange={(event) => setProjectName(event.target.value)} type="text" name="project-name" id="project-name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" required/>
                </div>
                <div className="">
                  <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                    Project Website
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                      http://
                    </span>
                    <input
                      onChange={(event) => setProjectWebsite(event.target.value)}
                      type="text"
                      name="company-website"
                      id="company-website"
                      className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                      placeholder="www.example.com"
                    />
                  </div>
                </div>
                <div className="">
                  <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                    Pitchdeck
                  </label>    
                  <input className="form-control
                    block
                    w-full
                    shadow-sm
                    px-3
                    py-2
                    file:mr-3
                    block text-sm font-medium text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-gray-500 focus:outline-none" 
                    type="file" 
                    onChange={(event) => {setPitchdeck(event.target.files[0])}}
                    />
                </div>

                <div className="">
                  <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                    White Paper
                  </label>    
                  <input className="form-control
                    block
                    w-full
                    shadow-sm
                    px-3
                    py-2
                    file:mr-3
                    block text-sm font-medium text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-gray-500 focus:outline-none" 
                    type="file" 
                    onChange={(event) => {setWhitepaper(event.target.files[0])}}
                    />
                </div>
                <div className="pt-3 flex justify-between items-center">
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    Submitting a new request will transact 2 tokens from your account.
                  </div>
                  <div className='flex-1 flex justify-end'>
                    <button type="button"
                      className="inline-flex items-center px-4 py-3 text-sm text-white bg-black text-white shadow-sm rounded-md border border-gray-400 hover:shadow-md hover:border-gray-400 hover:bg-gray-900 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:hover:bg-gray-200 disabled:text-gray-400 disabled:hover:shadow-none"
                      onClick={() => {handleSubmit()}}
                      disabled={disableSubmit() === true}
                      >
                      { (loading === false || modalOpen === false) &&
                      <p>Submit</p>
                      }
                      { (loading === true && modalOpen === true) &&
                      <svg className="w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                      </svg>
                      }
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
    </div>
  )
}

export default NewRequest
