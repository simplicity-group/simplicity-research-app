import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext'
import { useAuth, upload } from '../firebase';
import { useEffect } from 'react';
import Select from 'react-select';

const Account = () => {

  console.log('account')

  const {filters, user, logout, profile, profilePic, changeProfilePic} = UserAuth();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);

  const [selectedSectors, setSelectedSectors] = useState(null);
  localStorage.setItem("sectorOptions", JSON.stringify(filters[0].options));
  const sectorOptions = JSON.parse(localStorage.getItem("sectorOptions"));;
  for (var i = 0; i < sectorOptions.length; i++){
    delete sectorOptions[i].checked;
  }

  const [selectedStages, setSelectedStages] = useState(null);
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
    }
  }

  async function uploadPhoto() {
    const photoURL = await upload(photo, user, loading);
    changeProfilePicture(photoURL)
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate('');
    } catch (e) {
      console.log(e.message)
    }
  }

  // handle onChange event of the dropdown
  const handleSectorsChange = e => {
    setSelectedSectors(e);
  }
  const handleStagesChange = e => {
    setSelectedStages(e);
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
