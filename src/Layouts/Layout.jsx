import React, { useEffect } from 'react'
import Navbar from '../Pages/Navbar'
import { div } from 'framer-motion/client'
import useGlobalUserObject from '../store/store';

const Layout = ({children}) => {

  const loadUserFromStorage = useGlobalUserObject((state) => state.loadUserFromStorage);

  useEffect(() => {
    // Load user only once on mount
    loadUserFromStorage();
  }, []);

  return (
    <div className='relative h-screen w-full bg-[#D9EAFD]'>
      <div className='absolute w-full bg-[url(/bg.webp)] bg-cover h-full'>
          <Navbar/>
          {children}
      </div>
    </div>
  )
}

export default Layout