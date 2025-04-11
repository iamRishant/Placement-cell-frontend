import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Components/Button';
import useGlobalUserObject from '../store/store';

const Navbar = () => {
    const user=useGlobalUserObject((state)=>state.user)
    const setLogout=useGlobalUserObject((state)=>state.setLogout)
    const navigate=useNavigate();

    const handleLogout=()=>{
      setLogout();
      setLoggedIn(false);
      navigate('/login');
    }

  return (
    <div className='px-10 flex justify-between items-center text-white bg-gradient-to-r
     from-red-500 to-orange-400'>
        <Link to={"/"}> 
          <div className='flex justify-between gap-5 items-center'>
              <img className='w-[3rem] h-[5rem]' 
              src="https://res.cloudinary.com/desku3g7e/image/upload/v1744180262/culogo_mlj3ao.jpg" 
              alt="" />
              <h1
              className="text-green-100 text-4xl sm:text-4xl font-semibold"
              >
                Placement Cell, Chandigarh University
              </h1>
          </div>
        </Link>

        <div className='flex justify-between items-center gap-10 text-2xl'> 
            {!user && (
              <div className='flex gap-5'>
                <Link className='hover:scale-90' to={"/#overview"}>Overview</Link>
                <Link className='hover:scale-90' to={"/#process"}>Recruitment Process</Link>
                <Link className='hover:scale-90' to={"/#Recruit"}>Why Recruit</Link>
                <Link className='hover:scale-90' to={"/login"}>Login</Link> 
              </div>
            )}
            {user && (
              <div className='flex gap-5 font-semibold text-2xl'>
                <div onClick={handleLogout} to={'/login'}>
                  <button className="hover:scale-90">Logout</button>
                </div>
                <Link to={`/${user?.user?.name}`}>
                  <button className='px-4 hover:scale-85'>{user?.user?.name}</button>
                </Link>
              </div>
            )}
        </div>
    </div>
  )
}

export default Navbar