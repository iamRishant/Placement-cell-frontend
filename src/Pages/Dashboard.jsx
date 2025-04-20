import React, { useState, useEffect } from 'react'
import { getAdminDashboard, getStudentDashboard } from '../Services/dashboardService'
import Card from '../Components/Card' 
import useGlobalUserObject from '../store/store'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const [expandedCardId, setExpandedCardId] = useState(null);
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
  
  useEffect(() => {
    if(expandedCardId){
      document.body.style.overflow = 'hidden';
    }else {
      document.body.style.overflow = 'auto';
    }

    return ()=>{
      document.body.style.overflow = 'auto';
    }
  }, [expandedCardId]);

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
      <div className='relative'>
        {expandedCardId && (
            <div
              className='fixed inset-0 bg-black opacity-50 z-40'
              onClick={() => setExpandedCardId(null)}
            />
          )}

        {companies && companies.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5'>
            {companies.map((company) => (
              <Card 
                key={company._id} 
                company={company} 
                isAdmin={isAdmin} 
                isExpanded={expandedCardId === company._id} 
                setExpandedCardId={setExpandedCardId}
              />
            ))}
          </div>
        ) : (
          <div className="text-center p-8 text-gray-500">No Campanies Available At The Moment..</div>
        )}
      </div>
    </>
  )
}

export default Dashboard;