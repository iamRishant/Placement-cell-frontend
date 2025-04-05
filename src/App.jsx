import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './Pages/Homepage'
import Layout from './Layouts/Layout'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import UserProfile from './Pages/UserProfile'

const App = () => {
  return (
    <Layout>
    <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/:name' element={<UserProfile/>}></Route>
    </Routes>
    </Layout>
  )
}

export default App