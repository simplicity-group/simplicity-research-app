import React, { Children } from 'react'
import { Navigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'

const ProtectedRoute = ({children}) => {
    const {user, userComplete} = UserAuth();

    if (!user) {
      return <Navigate to='/' />
    }
    else if(user && userComplete === false){
      return <Navigate to='/accountsetup' />
    }


  return children
}

export default ProtectedRoute
