import React from 'react'
import { useParams } from 'react-router-dom'
import useGlobalUserObject from '../store/store';

const UserProfile = () => {
    const {name}=useParams();
    const user=useGlobalUserObject((state)=>state.user);
  return (
    <div>
        <h1>Welcome : {name}</h1>
        <h1>Details : {user?.user?.email}</h1>
    </div>
  )
}

export default UserProfile