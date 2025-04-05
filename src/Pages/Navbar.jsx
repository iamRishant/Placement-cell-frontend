import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Components/Button';
import useGlobalUserObject from '../store/store';

const Navbar = () => {
    const user=useGlobalUserObject((state)=>state.user)
    const setLogout=useGlobalUserObject((state)=>state.setLogout)
    const navigate=useNavigate();
    const [loggedIn,setLoggedIn]=useState(false);

    useEffect(()=>{
      if(user) setLoggedIn(true);
    },[user])

    const handleLogout=()=>{
      setLogout();
      setLoggedIn(false);
      navigate('/login');
    }

  return (
    <div className='py-3 px-5 flex justify-between items-center'>
        <img className='w-[10rem]' 
        src="https://www.cuchd.in/about/assets/images/cu-logo.png" alt="" />
        <div>
            {!loggedIn && <div className='flex gap-5'>
            <Link to={"/login"}><Button>Login</Button></Link> 
            <Link to={"/signup"}><Button>Sign Up</Button></Link></div>}
            {loggedIn && 
                <div className='flex gap-5'>
                    <div onClick={handleLogout} to={'/login'}><Button>Logout</Button></div>
                    <Link to={`/${user?.user?.name}`}><Button>{user?.user?.name}</Button></Link>
                    
                </div>}
        </div>
    </div>
  )
}

export default Navbar