import React, { Children } from 'react'
import { Navigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'
import LoadingAuth from '../general/LoadingAuth'

const ProtectedRoute = ({children}) => {
    const {user, userComplete, filtersLoading, reportsLoading, requestsLoading} = UserAuth();

    if (!user) {
      return <Navigate to='/' />
    }
    else if(user && (userComplete === false || userComplete === null)) {
      if(userComplete === null || filtersLoading === true || reportsLoading === true || requestsLoading === true){
        return <LoadingAuth />
      }
      else if(userComplete === false){
        return <Navigate to='/accountsetup' />
      }
    }

  return children
}

export default ProtectedRoute
