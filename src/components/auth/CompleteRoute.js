import React, { Children } from 'react'
import { Navigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'

const CompleteRoute = ({children}) => {
    const {user, userComplete} = UserAuth();

    if (user && userComplete === true) {
        return <Navigate to='/home' />
    }
    else if(!user){
        return <Navigate to='/' />
    }

  return children
}

export default CompleteRoute
