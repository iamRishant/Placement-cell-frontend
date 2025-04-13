// import React, { useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import useGlobalUserObject from '../store/store';

// const UserProfile = () => {
//     const {name}=useParams();
//     const user=useGlobalUserObject((state)=>state.user);
//     const loadUserFromStorage = useGlobalUserObject((state) => state.loadUserFromStorage);
//     console.log(user)
//      useEffect(() => {
//         // Load user only once on mount
//         loadUserFromStorage();
//       }, []);
    
//   return (
//     <div className="flex items-center justify-center p-4">
//     <div className="bg-white shadow-2xl rounded-2xl max-w-md w-full p-6 text-center">
//       <h1 className='text-4xl mb-5'>{`${user?.role} card`}</h1>
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">👤 {user?.name || name}</h2>
//       <p className="text-gray-600 mb-2"><strong>Email:</strong> {user?.email}</p>
//       <p className="text-gray-600 mb-4"><strong>Role:</strong> {user?.role}</p>

//       <a
//         href={user?.resume}
//         target="_blank"
//         className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
//       >
//         📄 View Resume
//       </a>
//     </div>
//   </div>
//   )
// }

// export default UserProfile


import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useGlobalUserObject from '../store/store';
import axios from 'axios';

const UserProfile = () => {
  const { name } = useParams();
  const [user,setUser]=useState(null);
  const loadUserFromStorage = useGlobalUserObject((state) => state.loadUserFromStorage);
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [loadingForUser,setLoadingForUser]=useState(false);

  
  useEffect(() => {
    getCurrentUser();
  }, []);
  
  const getCurrentUser=async ()=>{
    
    setLoadingForUser(true);
    try {  
      const res = await axios.get(
        `http://localhost:8000/api/v1/student/get-user-details`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      if(!res){
        throw new error("User Fetching Failed");
      }
      
      const data= await res?.data?.user;

      setUser(data);
      localStorage.setItem("currUser",JSON.stringify(data));
      loadUserFromStorage();
      
      
    } catch (error) {
      console.error(error);
      alert("Error updating resume.");
    }
    finally{
      setLoadingForUser(false);
    }
  }
  
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") {
      alert("Please select a valid PDF file.");
      return;
    }
    
    const formData = new FormData();
    formData.append("resume", file);
    
    try {
      setIsUploading(true);
      const res = await axios.post(
        `http://localhost:8000/api/v1/student/update-resume`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      const updatedUser = { ...user, resume: res.data.resume };
      
      getCurrentUser();
      
      alert("Resume updated successfully.");
    } catch (err) {
      console.error(err);
      alert("Error updating resume.");
    } finally {
      setIsUploading(false);
    }
  };


  
  if(loadingForUser){
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400'></div>
      </div>
    )
  }
  
  return (
    <div className="flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl max-w-md w-full p-6 text-center">
        <h1 className='text-4xl mb-5'>{`${user?.role} card`}</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">👤 {user?.name || name}</h2>
        <p className="text-gray-600 mb-2"><strong>Email:</strong> {user?.email}</p>
        <p className="text-gray-600 mb-4"><strong>Role:</strong> {user?.role}</p>

        {/* <a
          href={user?.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition mb-4"
        >
          📄 View Resume
        </a> */}
        <a
  href={user?.resume}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition mb-4"
>
  📄 View Resume
</a>

        <div>
          <button
            onClick={() => fileInputRef.current.click()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Update Resume"}
          </button>
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
