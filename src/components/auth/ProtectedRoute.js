import React, { Children } from 'react'
import { Navigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'
import Loading from '../general/Loading'

const ProtectedRoute = ({children}) => {
    const {user, userComplete} = UserAuth();

    if (!user) {
      return <Navigate to='/' />
    }
    else if(user && (userComplete === false || userComplete === null)) {
      if(userComplete === null){
        return <Loading />
      }
      else if(userComplete === false){
        return <Navigate to='/accountsetup' />
      }
    }

  return children
}

export default ProtectedRoute
