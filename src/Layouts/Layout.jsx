import React from 'react'
import Navbar from '../Pages/Navbar'
import { div } from 'framer-motion/client'

const Layout = ({children}) => {
  return (
    <div className='relaitve h-screen w-full bg-[#D9EAFD]'>
      <div className='absolute w-full bg-[url(/bg.webp)] bg-cover h-[70vh]'>
          <Navbar/>
          {children}
      </div>
    </div>
  )
}

export default Layout