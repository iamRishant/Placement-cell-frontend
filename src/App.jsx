import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './Pages/Homepage'
import Layout from './Layouts/Layout'

const App = () => {
  return (
    <Layout>
    <Routes>
        <Route path='/' element={<Homepage/>}/>
    </Routes>
    </Layout>
  )
}

export default App