import React, { useState } from 'react';
import { registerCompany } from './dashboardService';
import { useNavigate } from 'react-router-dom';

const RegisterCompany = ()=>{
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    companyInfo: '',
    jobTitle: '',
    payPackage: '',
    jobDescription: '',
    eligibility: '',
    bond: false,
    bondDescription: '',
    formDeadline: '',
    registerationLink: ''
  }); 

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const dataToSubmit = {
        ...formData, 
        bondDescription: formData.bond ? formData.bondDescription : undefined
    };

    try{
        await registerCompany(dataToSubmit);
        navigate('/dashboard');
    } catch(error){
        console.error("Error registering company", error);
        setError('failed to register company: ', (error.message || "something went wrong"));
    } finally {
        setLoading(false);
    }
  };
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Register New Company</h1>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Company Name*</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Company Info*</label>
          <textarea
            name="companyInfo"
            value={formData.companyInfo}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Job Title*</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Job Description*</label>
          <textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Eligibility*</label>
          <input
            type="text"
            name="eligibility"
            value={formData.eligibility}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Package*</label>
          <input
            type="text"
            name="payPackage"
            value={formData.payPackage}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="bond"
              checked={formData.bond}
              onChange={handleChange}
              className="mr-2"
            />
            <span>Has Bond</span>
          </label>
        </div>
        
        {formData.bond && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Bond Description</label>
            <input
              type="text"
              name="bondDescription"
              value={formData.bondDescription}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required={formData.bond}
            />
          </div>
        )}  
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Application Deadline</label>
          <input
            type="date"
            name="formDeadline"
            value={formData.formDeadline}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <p className="text-sm text-gray-500 mt-1">
            If not specified, deadline will be set to 48 hours from now.
          </p>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Registration Link*</label>
          <input
            type="url"
            name="registerationLink"
            value={formData.registerationLink}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={loading}
            className={`py-2 px-4 text-white rounded ${
              loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {loading ? 'Registering...' : 'Register Company'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterCompany;