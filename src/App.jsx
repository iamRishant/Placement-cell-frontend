import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './Pages/Homepage'
import Layout from './Layouts/Layout'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import UserProfile from './Pages/UserProfile'
import Protected from './Pages/AuthLayout'
import useGlobalUserObject from './store/store'
import RegisterCompany from './Pages/RegisterCompany'

const App = () => {

  const authStatus = useGlobalUserObject((state) => state.isLoggedIn);
  const loadUserFromStorage = useGlobalUserObject((state) => state.loadUserFromStorage);

  useEffect(() => {
    // Load user only once on mount
    loadUserFromStorage();
  }, []);
  return (
    <Layout>
     <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path="/login" element={<Protected authentication={false}><Login /></Protected>} />
        <Route path="/signup" element={<Protected authentication={false}><SignUp /></Protected>} />
        <Route path="/dashboard" element={<Protected authentication={true}><Dashboard /></Protected>} />
        <Route path='/:name' element={<Protected authentication={true}><UserProfile /></Protected>} />
        <Route path='/register-company' element={<RegisterCompany/>}></Route>
      </Routes>
    </Layout>
  )
}

export default App