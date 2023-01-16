import React, { Children } from 'react'
import { Navigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'

const AuthRoute = ({children}) => {
    const {user} = UserAuth();

    if (user) {
      console.log(user)
      console.log('redirecting to home')
        return <Navigate to='/home' />
    }

  return children
}

export default AuthRoute
