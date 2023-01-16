import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext'
import { useAuth, upload } from '../firebase';
import { useEffect } from 'react';
import Select from 'react-select';

const NewRequest = () => {

  const {user, logout} = UserAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");

  const hiddenFileInput = React.useRef(null);

  const clickProvidePhotoInput = event => {
    hiddenFileInput.current.click();
  }

  function providePhoto(e){
    if(e.target.files[0]) {
      setPhoto(e.target.files[0])
    }
  }

  function uploadPhoto() {
      upload(photo, user, setLoading)
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      console.log('You are logged out')
    } catch (e) {
      console.log(e.message)
    }
  }

  useEffect(() => {
    if(user?.photoURL) {
      console.log(user.photoURL)
      setPhotoURL(user.photoURL)
    }
  }, [user])

  const [selectedSectors, setSelectedSectors] = useState(null);
  // handle onChange event of the dropdown
  const handleSectorsChange = e => {
    setSelectedSectors(e);
  }
  const sectorOptions  = [
    { label:  'Infrastructure - L1s, L2s, Bridges', value:  'option_1'  },
    { label:  'Infrastructure - DEXs, Oracles', value:  'option_2'  },
    { label:  'GameFi', value:  'option_3'  },
    { label:  'NFTs', value:  'option_4'  },
    { label:  'Real World', value:  'option_5'  },
    { label:  'DeFi', value:  'option_6'  },
  ]

  const [selectedStages, setSelectedStages] = useState(null);
  const handleStagesChange = e => {
    setSelectedStages(e);
  }
  const stageOptions  = [
    { label:  'Pre-Seed', value:  'option_1'  },
    { label:  'Seed', value:  'option_2'  },
    { label:  'Series A', value:  'option_3'  },
    { label:  'Series B', value:  'option_4'  },
    { label:  'Series C', value:  'option_5'  },
  ]

  return (
    <div className="bg-gray-100 h-full">
        <div className="ml-4 mr-4 sm:ml-auto sm:mr-auto bg-gray-100 pt-12 md:pt-20 md:w-3/5 ">
          <form className='bg-white rounded-md'>
            <div className="shadow-md border border-gray-400 rounded-md">
              <div className='border-b border-gray p-3 '>
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900  ml-3">New Request</h2>
              </div>
              <div className="space-y-6  px-4 py-5 sm:p-6">
                <div className=''>
                  <label className="block text-sm font-medium text-gray-700">Name of Project</label>
                  <input type="text" name="first-name" id="first-name" autoComplete="given-name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"/>
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
                    Pitch Deck
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
                    focus:text-gray-700 focus:bg-white focus:border-gray-500 focus:outline-none" type="file" id="formFile"/>
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
                    focus:text-gray-700 focus:bg-white focus:border-gray-500 focus:outline-none" type="file" id="formFile"/>
                </div>
                <div className="pt-3 flex justify-between items-center">
                  <div className='flex-1'>

                  </div>
                  <div className='flex-1 flex justify-end'>
                    <button type="submit" className="text-sm pl-8 pr-8 pt-2 pb-2 bg-black text-white shadow-sm rounded-md border border-gray-400 hover:shadow-md hover:border-gray-400 hover:bg-gray-900"
                      >
                      Submit Request
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
