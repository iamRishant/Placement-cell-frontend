import React, { useState, useEffect } from 'react'
import { getAdminDashboard, getStudentDashboard } from './dashboardService'
import Card from '../Components/Card' 
import useGlobalUserObject from '../store/store'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useGlobalUserObject();

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const fetchDashboard = async () => {
      try{
        setLoading(true);

        const data = isAdmin? await getAdminDashboard()
        : await getStudentDashboard();

        setCompanies(data.companies || []);
        setError(null); 
      }catch(error){
        console.log("Error fetching dashboard dashboard", error);
        setError(error.message);  
      }finally{
        setLoading(false);
      }
    };

    if(user){
      fetchDashboard();
    } 
  }, [user, isAdmin]);

  if(loading){
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400'></div>
      </div>
    )
  }

  if(error){
    return (
      <div className='bg-red-100 border border-red-400 text-red-700' role="alert">
        <span className='font-bold'>Error!</span>
        <span className='block'>{error}</span>
      </div>
    );
  }

  return (
    <>
      <div className=''>
        <div>
          <h1>{isAdmin ? "Admin Dashboard":"Student Dashboard"}</h1>
          {isAdmin && (
            <Link to='/register-company'> Register New Company</Link>
          )}
        </div>

        {companies && companies.length > 0 ? (
          <div>
            {companies.map((company) => (
              <Card key={company._id} company={company} isAdmin={isAdmin}/>
            ))}
          </div>
        ) : (
          <div>No Campanies Available At The Moment..</div>
        )}
      </div>
    </>
  )
}

export default Dashboard;