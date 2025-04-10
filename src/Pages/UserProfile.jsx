import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useGlobalUserObject from '../store/store';

const UserProfile = () => {
    const {name}=useParams();
    const user=useGlobalUserObject((state)=>state.user);
    const loadUserFromStorage = useGlobalUserObject((state) => state.loadUserFromStorage);
     useEffect(() => {
        // Load user only once on mount
        loadUserFromStorage();
      }, []);
    
  return (
    <div>
        <h1>Welcome : {name}</h1>
        <h1>Details : {user?.email}</h1>
    </div>
  )
}

export default UserProfile