import React, { useEffect, useState } from "react";
import generatePDF from "../services/reportGenerator";
import axios from "axios";  // Import axios for making HTTP requests

const OutpassApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const getAllApplications = async () => {
      try {
        const response = await axios.get("http://localhost:3001/form");
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching outpass applications:", error);
      }
    };
    getAllApplications();
  }, []);

  const approvedApplications = applications.filter(
    (application) => application.status === "approved"
  );

  return (
    <div>
      <div className="container mb-4 mt-4 p-3">
        <div className="row">
          <button
            className="btn btn-primary"
            onClick={() => generatePDF(approvedApplications)}
          >
            Generate Approved Outpass Report
          </button>
        </div>
      </div>
      {/* Assuming you have a component to display outpass applications */}
      {/* Replace 'YourComponent' with the actual component name */}
      <YourComponent applications={applications} />
    </div>
  );
};

export default OutpassApplications;
