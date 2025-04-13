import React from "react";

const Card = ({company, isAdmin}) => {
  return (
    <>
      <div className="bg-white shadow-md rounded-lg">
          <div className="p-5">
            <h3>{company.companyName}</h3>
            <p>{company.companyInfo}</p>

            <div>
              <span>{company.jobTitle}</span>
              <span>{company.payPackage}</span>
            </div>

            <p>{company.jobDescription}</p>
            <div>{company.eligibility}</div>

            {company.bond && (
              <div>
                <p>Bond:</p>{company.bondDescription}
              </div>
            )}

            <div>
              <strong>Apply by:</strong>{new Date(company.formDeadline).toLocaleDateString()}
            </div>

            <a
              href={company.registerationLink}
              target="_blank"
              rel="noopener noreferrer"
            >Apply Now</a>
          </div>
      </div>
    </>
  );
};

export default Card;
