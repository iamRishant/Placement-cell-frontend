import React, { useState } from "react";

const Card = ({ company, isAdmin }) => {

  const [currCompany,setCurrCompany]=useState(company);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ ...company });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Data:", formData); // replace with your update logic
    setIsModalOpen(false);
  };

  

  const handleUpdate = async () => {
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
  

  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-5">
        <h3>{currCompany.companyName}</h3>
        <p>{currCompany.companyInfo}</p>

        <div>
          <span>{currCompany.jobTitle}</span>
          <span>{currCompany.payPackage}</span>
        </div>

        <p>{currCompany.jobDescription}</p>
        <div>{currCompany.eligibility}</div>

        {currCompany.bond && (
          <div>
            <p>Bond:</p>{currCompany.bondDescription}
          </div>
        )}

        <div>
          <strong>Apply by:</strong> {new Date(company.formDeadline).toLocaleDateString()}
        </div>

        <a
          href={currCompany.registerationLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Apply Now
        </a>

        {isAdmin && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
          >
            Update
          </button>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-xl">
            <h2 className="text-xl font-bold mb-4">Update Company</h2>
            <form onSubmit={handleUpdateSubmit} className="space-y-3">
              <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} className="w-full border p-2 rounded" placeholder="Company Name" />
              <textarea name="companyInfo" value={formData.companyInfo} onChange={handleInputChange} className="w-full border p-2 rounded" placeholder="Company Info" />
              <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} className="w-full border p-2 rounded" placeholder="Job Title" />
              <input type="text" name="payPackage" value={formData.payPackage} onChange={handleInputChange} className="w-full border p-2 rounded" placeholder="Pay Package" />
              <textarea name="jobDescription" value={formData.jobDescription} onChange={handleInputChange} className="w-full border p-2 rounded" placeholder="Job Description" />
              <input type="text" name="eligibility" value={formData.eligibility} onChange={handleInputChange} className="w-full border p-2 rounded" placeholder="Eligibility" />
              <input type="checkbox" name="bond" checked={formData.bond} onChange={(e) => setFormData(prev => ({ ...prev, bond: e.target.checked }))} /> Bond Required
              {formData.bond && (
                <input type="text" name="bondDescription" value={formData.bondDescription} onChange={handleInputChange} className="w-full border p-2 rounded" placeholder="Bond Description" />
              )}
              <input type="date" name="formDeadline" value={formData.formDeadline?.slice(0, 10)} onChange={handleInputChange} className="w-full border p-2 rounded" />
              <input type="url" name="registerationLink" value={formData.registerationLink} onChange={handleInputChange} className="w-full border p-2 rounded" placeholder="Registration Link" />

              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                <button onClick={handleUpdate} type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;