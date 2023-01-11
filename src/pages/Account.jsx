import Multiselect from 'multiselect-react-dropdown';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext'
import { useAuth, upload } from '../firebase';
import { useEffect } from 'react';

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

  const [sectors, setSectors] = useState(['1', '2', '3'])

  return (
    <div className="bg-gray-100 h-full">
        <div className=" sm:ml-auto sm:mr-auto bg-gray-100 pt-12 md:pt-20 md:w-3/5">
          <form>
            <div className="ml-4 mr-4 shadow-md border border-gray-400 sm:overflow-hidden rounded-md">
              <div className='border-b border-gray p-3 bg-white'>
                  <h2 class="text-2xl font-bold tracking-tight text-gray-900  ml-3">My Profile</h2>
              </div>
              <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
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
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">Stage Interest</label>
                  <select id="country" name="country" autoComplete="country-name" className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="sector" className="block text-sm font-medium text-gray-700">Sectors Interest</label>
                  <select id="sector" name="sector" autoComplete="sector" data-placeholder="Begin typing a name to filter..." multiple  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                    <option>Infrastructure - L1s, L2s, Bridges</option>
                    <option>Infrastructure - DEXs, Oracles</option>
                    <option>GameFi</option>
                    <option>NFTs</option>
                    <option>Real World</option>
                    <option>DeFi</option>
                  </select>
                  <div className='z-50'>
                  <Multiselect className='z-50 text-sm font-medium '
                    isObject={false}
                    onRemove={(event)=>{
                      console.log(event)
                    }}
                    onSelect={(event)=>{
                      console.log(event)
                    }}
                    options={sectors}
                    placeholder="Select sectors"
                    showArrow='true'
                  />
                  </div>
                </div>
                <div className="flex justify-between bg-white items-center">
                  <div className='flex-1'>
                    <button onClick={handleLogout} 
                    className='text-sm pl-8 pr-8 pt-2 pb-2 bg-white shadow-sm rounded-md border border-gray-400 hover:shadow-md hover:border-gray-400'>                    
                      Logout
                    </button>
                  </div>
                  <div className='flex-1 flex justify-end '>
                    <button type="submit" className="text-sm pl-8 pr-8 pt-2 pb-2 bg-black text-white shadow-sm rounded-md border border-gray-400 hover:shadow-md hover:border-gray-400 hover:bg-gray-900"
                      disabled={loading || !photo}
                      onClick={uploadPhoto}>
                      Save
                    </button>
                  </div>
                </div>
              </div>
              
            </div>
            <div className='m-4 pt-2 flex justify-center'>
              <p className='text-gray-500'>User: {user.email}</p>
            </div>
          </form>
        </div>
    </div>
  )
}

export default Account
