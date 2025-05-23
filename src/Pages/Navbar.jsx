import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useGlobalUserObject from '../store/store';
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
    const user = useGlobalUserObject((state)=>state.user)
    const setLogout = useGlobalUserObject((state)=>state.setLogout)
    const navigate = useNavigate();
    const [loggedIn,setLoggedIn] = useState(false);
    const checkTokenExpiry = useGlobalUserObject((state) => state.checkTokenExpiry);

    useEffect(()=>{
      if(user) setLoggedIn(true);
    },[user])

    useEffect(()=>{
      if(loggedIn){
        const isValid = checkTokenExpiry();
        if(!isValid){
          handleLogout();
        }
      }

      const tokenCheckInterval = setInterval(() => {
        if(loggedIn){
          const isValid = checkTokenExpiry();
          if(!isValid){
            handleLogout();
          }
        }
      }, 60000);

      return () => clearInterval(tokenCheckInterval);
    }, [loggedIn, checkTokenExpiry])

    const handleLogout=()=>{
      setLogout();
      setLoggedIn(false);
      navigate('/login');
    }

  return (
    <div className='px-10 flex justify-between items-center text-white 
    bg-gradient-to-r from-red-500 to-orange-400'>
        <Link to={"/"}> 
        <div className='flex justify-between gap-5 items-center'>
            <img className='w-[4rem] h-[5rem] p-2' 
            src="https://res.cloudinary.com/desku3g7e/image/upload/v1744180262/culogo_mlj3ao.jpg" 
            alt="" />
            <h1
            className="text-green-100 text-4xl sm:text-3xl font-semibold"
            >
              Placement Cell, Chandigarh University
            </h1>
        </div> </Link>
        <div className='flex justify-between items-center gap-10 text-2xl '> 
            {!loggedIn && <div className='flex gap-5'>
              <Link to={"/#overview"}>Overview</Link>
              <Link to={"/#process"}>Recruitment Process</Link>
              <Link to={"/#Recruit"}>Why Recruit</Link>
              <Link to={"/login"}>Login</Link> 
        </div>}
            {loggedIn && <div className='flex gap-5 justify-around items-center'>
              <div className='flex items-center justify-between px-2 py-1 border border-gray-300 rounded-full'>
                <CiSearch className='text-white font-bold'/>
                <input type="search" placeholder='search companies' 
                className='w-full focus:outline-none ml-2 placeholder-white'/>
              </div>
                {user?.role === 'admin' && (
                    <Link to='/register-company' className='hover:scale-90 px-5 '> Recruit </Link>
                )}
                <Link to={"/dashboard"} className='hover:scale-90'>Dashboard</Link>
                <div onClick={handleLogout} className='hover:scale-90 px-5 cursor-pointer'>Logout</div>
                <Link to={`/${user?.name}`} className='hover:scale-90 px-5><button '>{user?.name}</Link>
                </div>}
        </div>
    </div>
  )
}

export default Navbar