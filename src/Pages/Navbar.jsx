import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Button from '../Components/Button';

const Navbar = () => {
    const [loggedIn,setLoggedIn]=useState(false);
  return (
    <div className='py-3 px-5 flex justify-between items-center'>
        <img className='w-[10rem]' src="https://www.cuchd.in/about/assets/images/cu-logo.png" alt="" />
        <div>
            {!loggedIn && <div className='flex gap-5'><Link to={"/login"}><Button>Login</Button></Link> <Link to={"/signup"}><Button>Sign Up</Button></Link></div>}
            {loggedIn && 
                <div>
                    <Link to={'/'}><Button>Logout</Button></Link>
                </div>}
        </div>
    </div>
  )
}

export default Navbar