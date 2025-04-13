import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useGlobalUserObject from '../store/store';

const UserProfile = () => {
    const {name}=useParams();
    const user=useGlobalUserObject((state)=>state.user);
    const loadUserFromStorage = useGlobalUserObject((state) => state.loadUserFromStorage);
    console.log(user)
     useEffect(() => {
        // Load user only once on mount
        loadUserFromStorage();
      }, []);
    
  return (
    <div className="flex items-center justify-center p-4">
    <div className="bg-white shadow-2xl rounded-2xl max-w-md w-full p-6 text-center">
      <h1 className='text-4xl mb-5'>{`${user?.role} card`}</h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">👤 {user?.name || name}</h2>
      <p className="text-gray-600 mb-2"><strong>Email:</strong> {user?.email}</p>
      <p className="text-gray-600 mb-4"><strong>Role:</strong> {user?.role}</p>

      <a
        href={user?.resume}
        target="_blank"
        className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
      >
        📄 View Resume
      </a>
    </div>
  </div>
  )
}

export default UserProfile