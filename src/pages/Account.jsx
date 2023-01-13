import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext'
import { useAuth, upload } from '../firebase';
import { useEffect } from 'react';
import Select from 'react-select';

const Account = () => {

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
      navigate('');
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
                  <h2 class="text-2xl font-bold tracking-tight text-gray-900  ml-3">My Profile</h2>
              </div>
              <div className="space-y-6  px-4 py-5 sm:p-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Photo</label>
                  <div className="mt-1 flex items-center">
                    <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                      <img src={photoURL} alt="Avatar"/>
                    </span>
                    <input
                      type="file"
                      style={{ display: 'none' }}
                      id="contained-button-file"
                      onChange={providePhoto}
                      ref={hiddenFileInput}
                    />
                    <label htmlFor="contained-button-file">
                      <button className='ml-4 text-sm pl-6 pr-6 pt-2 pb-2 bg-white shadow-sm rounded-md border border-gray-400 hover:shadow-md hover:border-gray-400'
                        onClick={clickProvidePhotoInput}>
                        Change
                      </button>
                    </label>
                  </div>
                </div>
                <div className="">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stage Interest
                  </label>
                  <Select 
                    isMulti
                    placeholder="Select Stage(s)"
                    value={selectedStages} 
                    options={stageOptions} // list of the data
                    onChange={handleStagesChange}
                  />
                </div>
                <div className="">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sectors Interest
                  </label>
                  <Select
                    isMulti
                    placeholder="Select Sector(s)"
                    value={selectedSectors} 
                    options={sectorOptions} // list of the data
                    onChange={handleSectorsChange}
                  />
                </div>
                <div className="pt-3 flex justify-between items-center">
                  <div className='flex-1'>
                    <button 
                    type="button"
                    onClick={handleLogout} 
                    className='text-sm pl-8 pr-8 pt-2 pb-2 bg-white shadow-sm rounded-md border border-gray-400 hover:shadow-md hover:border-gray-400'>                    
                      Logout
                    </button>
                  </div>
                  <div className='flex-1 flex justify-end'>
                    <button type="submit" className="text-sm pl-8 pr-8 pt-2 pb-2 bg-black text-white shadow-sm rounded-md border border-gray-400 hover:shadow-md hover:border-gray-400 hover:bg-gray-900"
                      disabled={loading || !photo}
                      onClick={uploadPhoto}>
                      Save
                    </button>
                  </div>
                </div>
              </div>
              
            </div>
          </form>
          <div className='m-4 pt-2 flex justify-center'>
              <p className='text-gray-500'>User: {user.email}</p>
            </div>
        </div>
    </div>
  )
}

export default Account
