import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AuthRoute from "./components/auth/AuthRoute";

import Signin from './pages/Signin'
import Home from "./pages/Home";
import Account from "./pages/Account";
import Requests from "./pages/Requests";
import Reports from "./pages/Reports";
import SpecificReport from "./pages/SpecificReport";
import NewRequest from "./pages/NewRequest";
import SpecificRequest from "./pages/SpecificRequest";
import AccountSetup from "./pages/AccountSetup";

import { AuthContextProvider } from "./context/AuthContext";

function App() {

  return (
    <div className="flex flex-col h-screen">
      <AuthContextProvider>
        <div className="z-10">
          {<Navbar />}
        </div>

        <div className="flex-1">
          <Routes>
              <Route path='/' element={
                <AuthRoute>
                  <Signin />
                </AuthRoute>
              } />
              
              <Route path='/accountsetup' element={
                <ProtectedRoute>
                  <AccountSetup />
                </ProtectedRoute>
              } />
              
                <Route path='/home' element={
                  <ProtectedRoute>
                    <Home  />
                  </ProtectedRoute>
                } />


              <Route path='/account' element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              } />

              <Route path='/requests' element={
                <ProtectedRoute>
                  <Requests />
                </ProtectedRoute>
              } />

              <Route path='/specificrequest' element={
                <ProtectedRoute>
                  <SpecificRequest />
                </ProtectedRoute>
              } />

              <Route path='/newrequest' element={
                <ProtectedRoute>
                  <NewRequest />
                </ProtectedRoute>
              } />

              <Route path='/reports' element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              } />

              <Route path='/specificreport' element={
                <ProtectedRoute>
                  <SpecificReport />
                </ProtectedRoute>
              } />
          </Routes>
        </div> 
      </AuthContextProvider>
    </div>

    

  );
}

export default App;
