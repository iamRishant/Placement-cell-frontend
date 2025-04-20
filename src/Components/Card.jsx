import React, { useRef, useState, useEffect } from "react";

const Card = ({ company, isAdmin, isExpanded, setExpandedCardId }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setExpandedCardId(null);
      }
    };
    
    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded, setExpandedCardId]);

  const [currCompany, setCurrCompany] = useState(company);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ ...company });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/v1/admin/update-company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          id: company._id,
          ...formData,
        }),
      });

      if (!response.ok) {
        throw new Error("Update failed");
      }

      const result = await response.json();
      alert("Form data updated successfully");
      console.log("Response:", result);
      setCurrCompany(result.updatedCompany);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating company:", error);
      alert("Failed to update. Please try again.");
    }
  };

  // Function to handle apply button click
  const handleApplyClick = (e) => {
    e.stopPropagation(); // Prevent the click from closing the card
    window.open(currCompany.registerationLink, '_blank');
  };

  return (
    <>
      <div
        ref={cardRef}
        className={`
          bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white
          shadow-md rounded-lg p-4 transition-all duration-300
          ${isExpanded 
            ? "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-lg max-h-[80vh] overflow-y-auto" 
            : "cursor-pointer hover:shadow-lg"}
        `}
        onClick={() => !isExpanded && setExpandedCardId(company._id)}
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-bold">{currCompany.companyName}</h3>
          
          {isExpanded && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setExpandedCardId(null);
              }}
              className="text-gray-300 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {!isExpanded ? (
          <>
            <p className="text-gray-300 mb-4 line-clamp-2">{currCompany.companyInfo}</p>
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
              onClick={handleApplyClick}
            >
              Apply Now
            </button>
          </>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-300">{currCompany.companyInfo}</p>
            
            <div className="bg-gray-800 p-3 rounded">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">{currCompany.jobTitle}</span>
                <span className="text-green-400">{currCompany.payPackage}</span>
              </div>
              <p className="text-sm text-gray-300">{currCompany.jobDescription}</p>
            </div>
            
            <div className="bg-gray-800 p-3 rounded">
              <h4 className="font-semibold mb-1">Eligibility</h4>
              <p>{currCompany.eligibility}</p>
            </div>
            
            {currCompany.bond && (
              <div className="bg-gray-800 p-3 rounded">
                <h4 className="font-semibold mb-1">Bond:</h4>
                <p>{currCompany.bondDescription}</p>
              </div>
            )}
            
            <div className="bg-gray-800 p-3 rounded">
              <strong>Apply by:</strong> {new Date(company.formDeadline).toLocaleDateString()}
            </div>
            
            <div className="flex justify-between mt-6">
              {/* Fixed Apply button */}
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
                onClick={handleApplyClick}
              >
                Apply Now
              </button>
              
              {isAdmin && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(true);
                  }}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded transition"
                >
                  Update
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex justify-center items-center z-[60]">
          <div 
            className="bg-white p-6 rounded-lg w-[90%] max-w-xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4 text-gray-800">Update Company</h2>
            <form onSubmit={handleUpdate} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Company Info</label>
                <textarea
                  name="companyInfo"
                  value={formData.companyInfo}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                  rows="3"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Job Title</label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Pay Package</label>
                  <input
                    type="text"
                    name="payPackage"
                    value={formData.payPackage}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Job Description</label>
                <textarea
                  name="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                  rows="4"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Eligibility</label>
                <input
                  type="text"
                  name="eligibility"
                  value={formData.eligibility}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="bond"
                  name="bond"
                  checked={formData.bond}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, bond: e.target.checked }))
                  }
                  className="mr-2"
                />
                <label htmlFor="bond" className="text-sm font-medium text-gray-700">Bond Required</label>
              </div>
              
              {formData.bond && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bond Description</label>
                  <input
                    type="text"
                    name="bondDescription"
                    value={formData.bondDescription}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Form Deadline</label>
                <input
                  type="date"
                  name="formDeadline"
                  value={formData.formDeadline?.slice(0, 10)}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Registration Link</label>
                <input
                  type="url"
                  name="registerationLink"
                  value={formData.registerationLink}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;