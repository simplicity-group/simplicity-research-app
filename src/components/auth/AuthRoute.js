import React, { Children } from 'react'
import { Navigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'
import LoadingAuth from '../general/LoadingAuth';

const AuthRoute = ({children}) => {
    const {user, userComplete} = UserAuth();

    if (user) {
      if(userComplete === true){
        return <Navigate to='/home' />
      }
      else{
        if(userComplete === null){
          return <LoadingAuth />  
        }
        else{
          return <Navigate to='/accountsetup' />
        }
      }
    }

  return children
}

export default AuthRoute
