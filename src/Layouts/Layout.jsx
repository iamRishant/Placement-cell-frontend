import React from 'react'
import Navbar from '../Pages/Navbar'

const Layout = ({children}) => {
  return (
    <div className='w-full bg-[url(/bg.webp)] bg-cover min-h-screen'>
        <Navbar/>
        {children}
    </div>
  )
}

export default Layout