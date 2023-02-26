import React, { Fragment, useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext'
import { updateUserProfile } from '../firebase';
import Select from 'react-select';
import AvatarImageCropper from 'react-avatar-image-cropper';
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

const Account = () => {

  const [open, setOpen] = useState(true)

  const cancelButtonRef = useRef(null)

  const {filters, user, profile, logout, profilePic, changeProfilePicture} = UserAuth();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [profileChanged, setProfileChanged] = useState(false)
  const [selectedSectors, setSelectedSectors] = useState(profile.sectorsInterest);
  const [selectedStages, setSelectedStages] = useState(profile.stagesInterest);

  localStorage.setItem("sectorOptions", JSON.stringify(filters[0].options));
  const sectorOptions = JSON.parse(localStorage.getItem("sectorOptions"));;
  for (var i = 0; i < sectorOptions.length; i++){
    delete sectorOptions[i].checked;
  }

  localStorage.setItem("stageOptions", JSON.stringify(filters[2].options));
  const stageOptions = JSON.parse(localStorage.getItem("stageOptions"));;
  for (var i = 0; i < stageOptions.length; i++){
    delete stageOptions[i].checked;
  }

  const hiddenFileInput = React.useRef(null);

  const clickProvidePhotoInput = event => {
    event.preventDefault();
    hiddenFileInput.current.click();
  }

  function providePhoto(e){
    if(e.target.files[0]) {
      setPhoto(e.target.files[0])
      setProfileChanged(true);
    }
  }

  async function saveProfileChanges() {
    setLoading(true);
    const photoURL = await updateUserProfile(user, profile, photo, selectedStages ,selectedSectors);
    changeProfilePicture(photoURL);
    setLoading(false);
    setProfileChanged(false);
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate('');
    } catch (e) {
      console.log(e.message)
    }
  }

  const handleSectorsChange = e => {
    setSelectedSectors(e);
    setProfileChanged(true);
  }

  const handleStagesChange = e => {
    setSelectedStages(e);
    setProfileChanged(true);
  }

  return (
    <div className="bg-gray-100 h-full">
      <div className="ml-4 mr-4 sm:ml-auto sm:mr-auto bg-gray-100 pt-12 md:pt-20 md:w-3/5 ">
        <form className='bg-white rounded-md'>
          <div className="shadow-md border border-gray-400 rounded-md">
            <div className='border-b border-gray p-3 '>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900  ml-3">My Profile</h2>
            </div>
            <div className="space-y-6  px-4 py-5 sm:p-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Photo</label>
                <div className="mt-1 flex items-center">
                  <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                    <img src={profilePic} alt="Avatar"/>
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
                  options={stageOptions}
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
                  options={sectorOptions}
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
                  <button type="button" className="text-sm pl-8 pr-8 pt-2 pb-2 bg-black text-white shadow-sm rounded-md border border-gray-400 hover:shadow-md hover:border-gray-400 hover:bg-gray-900 disabled:bg-gray-200 disabled:hover:bg-gray-200 disabled:text-gray-400 disabled:hover:shadow-none disabled:cursor-not-allowed"
                    disabled={profileChanged === false}
                    onClick={() => saveProfileChanges()}>
                    { loading === false &&
                    <p>Save</p>
                    }
                    { loading === true &&
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
        <div className='m-4 pt-2 flex justify-center'>
            <p className='text-gray-500'>User: {user.email}</p>
          </div>
      </div>

    </div>
  )
}

export default Account
