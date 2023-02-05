import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext'
import { upload, db, completeAccount } from '../firebase';
import FixRequiredSelect from '../components/general/FixRequiredSelect';
import BaseSelect from 'react-select';
import { doc, collection, addDoc, setDoc, updateDoc } from 'firebase/firestore'
import filters from '../data/filters'

const Select = props => (
  <FixRequiredSelect
    {...props}
    SelectComponent={BaseSelect}
    options={props.options || options}
  />
);

const AccountSetup = () => {

  const {user, profile, getCurrentUserProfile, profilePic, changeProfilePicture, changeUserComplete} = UserAuth();
  const navigate = useNavigate();
    
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const hiddenFileInput = React.useRef(null);

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

  const handleSectorsChange = e => {
    setSelectedSectors(e);
  }

  const handleStagesChange = e => {
    setSelectedStages(e);
  }

  const clickProvidePhotoInput = event => {
    event.preventDefault();
    hiddenFileInput.current.click();
  }

  const completeProfile = async (e) => { 
    e.preventDefault();
    setLoading(true);
    const photoURL = await completeAccount(user, profile, photo, selectedStages, selectedSectors);
    await getCurrentUserProfile(user);
    changeUserComplete(true);
    changeProfilePicture(photoURL);
    setLoading(false);

    navigate('/home');
  }

  function providePhoto(e){
    if(e.target.files[0]) {
      setPhoto(e.target.files[0])
    }
  }

  return (
    <div className="bg-gray-100 h-full">
      <div className="ml-4 mr-4 sm:ml-auto sm:mr-auto bg-gray-100 pt-12 md:pt-20 md:w-3/5 ">
        <form className='bg-white rounded-md'>
          <div className="shadow-md border border-gray-400 rounded-md">
            <div className='border-b border-gray p-3 '>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900  ml-3">Account Setup</h2>
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
                  <button 
                    className='ml-4 text-sm pl-6 pr-6 pt-2 pb-2 bg-white shadow-sm rounded-md border border-gray-400 hover:shadow-md hover:border-gray-400 hover:cursor-pointer'
                    onClick={clickProvidePhotoInput}>
                    Change
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stage Interest
                </label>
                <Select 
                  required
                  isMulti
                  placeholder="Select Stage(s)"
                  value={selectedStages} 
                  options={stageOptions} // list of the data
                  onChange={handleStagesChange}
                />
              </div>
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sectors Interest
                </label>
                <Select
                  required
                  isMulti
                  placeholder="Select Sector(s)"
                  value={selectedSectors} 
                  options={sectorOptions} // list of the data
                  onChange={handleSectorsChange}
                />
              </div>
              <div className="pt-3 flex justify-between items-center">
                <div className='flex-1 flex justify-end'>
                  <button
                      className="text-sm pl-8 pr-8 pt-2 pb-2 bg-black text-white shadow-sm rounded-md border border-gray-400 hover:shadow-md hover:border-gray-400 hover:bg-gray-900 disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:shadow-none disabled:cursor-not-allowed"
                      type="submit" 
                      onClick={completeProfile}
                      disabled={(selectedStages === null || selectedStages.length === 0) || (selectedSectors === null || selectedSectors.length === 0 ) }
                    >
                      { loading === false &&
                      <p>Complete Account</p>
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

export default AccountSetup
