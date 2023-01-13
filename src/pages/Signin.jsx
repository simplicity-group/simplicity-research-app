import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import logo from '../images/sr_logo.svg'

const Signin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate();
  const {signIn} = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await signIn(email, password);
      navigate('/home');
    } catch (e) {
      setError(e.message)
      console.log(e.message)
    }
  }

  return (
    <div className="bg-gray-50 flex h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-4 w-full max-w-md space-y-8 rounded-md shadow-md border border-gray-400 rounded-md">
        <div>
          <img className="mx-auto h-16 w-auto" src={logo} alt="Your Company"/>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
            <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              </span>
              Sign in
            </button>
          </div>
          <p className='font-light text-red-700'>{error}</p>
        </form>
      </div>
    </div>
  )
}

export default Signin
