import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import logo from '../images/sr_logo.svg'
import { FcGoogle } from 'react-icons/fc';

const Signin = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [emailLoading, setEmailLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)


  const navigate = useNavigate();
  const {signIn, googleSignIn, profileComplete} = UserAuth();

  async function handleEmailSignIn(e){
    e.preventDefault();
    setError('')
    try {
      setEmailLoading(true);
      await signIn(email, password);
      setEmailLoading(false);
    } catch (e) {
      setEmailLoading(false);
      setError(e.message)
      console.log(e.message)
    }
  } 

  async function handleGoogleSignIn(e){
    e.preventDefault();
    setError('')
    try {
      setGoogleLoading(true);
      await googleSignIn(email, password);
      setGoogleLoading(false);
    } catch (e) {
      setGoogleLoading(false);
      setError(e.message)
      console.log(e.message)
    }
  }

  return (
    <div className="bg-gray-100 flex h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-4 w-full max-w-md space-y-8 rounded-md shadow-md border border-gray-400 rounded-md">
        <div>
          <img className="mx-auto h-16 w-auto mt-6" src={logo} alt="SR"/>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6">
          <input type="hidden" name="remember" value="true"/>
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input onChange={(e) => setEmail(e.target.value)} id="email-address" name="email" type="email" autoComplete="email" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address"/>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="password" autoComplete="current-password" required className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password"/>
            </div>
          </div>

          <div>
            <button type="button"
              onClick={(e) => handleEmailSignIn(e)}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              </span>
              { emailLoading === false &&
              <p>Sign in with email</p>
              }
              { emailLoading === true &&
              <svg className="w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              }
            </button>

            <button type="button"
              onClick={(e) => handleGoogleSignIn(e)}
              className="mt-2 group relative flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              </span>
              { googleLoading === false &&
              <FcGoogle />
              }
              { googleLoading === true &&
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
          { error &&
            <p className='font-light text-red-700'>{error}</p>
          }

        </form>
      </div>
    </div>
  )
}

export default Signin
