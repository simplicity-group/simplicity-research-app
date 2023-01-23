import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext'
import { upload, db } from '../firebase';
import FixRequiredSelect from '../components/general/FixRequiredSelect';
import BaseSelect from 'react-select';
import Loading from '../components/general/Loading';
import { doc, collection, addDoc, setDoc, updateDoc } from 'firebase/firestore'
import filters from '../data/filters';

const Select = props => (
    <FixRequiredSelect
      {...props}
      SelectComponent={BaseSelect}
      options={props.options || options}
    />
);

const AccountSetup = () => {

  const {user, profile, profilePic, changeProfilePicture, userComplete, changeUserComplete} = UserAuth();
  const userstoreRef = collection(db, "userstore")
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
    if(profile){
      const docRef = doc(userstoreRef, profile.id);
      try {
        await updateDoc(docRef, {
          profileComplete: true,
          stagesInterest: selectedStages,
          sectorsInterest: selectedSectors
        });

        setLoading(true);
        const photoURL = await upload(photo, user, loading);
        changeProfilePicture(photoURL)
        setLoading(false);

        changeUserComplete(true);
        navigate('/home');
      }
      catch (e) {
        console.log(e.message)
      }
    }
    else{
      try{
        await setDoc(doc(userstoreRef, user.uid), { fname:null, lname:null, profileComplete: true, stagesInterest: selectedStages, sectorsInterest: selectedSectors } );

        setLoading(true);
        const photoURL = await upload(photo, user, loading);
        changeProfilePicture(photoURL)
        setLoading(false);

        changeUserComplete(true);
        navigate('/home');
      } catch (e) {
        console.log(e.message)
      }
    }
  }

  function providePhoto(e){
    if(e.target.files[0]) {
      setPhoto(e.target.files[0])
      console.log(photo)
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
                      disabled={!selectedStages && !selectedSectors}
                    >Complete Account
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
