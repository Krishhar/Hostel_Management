import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

const formatDate = (dateString) => {
  return new Intl.DateTimeFormat("en-US").format(new Date(dateString));
};

const assignColorToApplicationStatus = (application) => {
  if (application.status === "approved") {
    return "p-3 mb-20 bg-success text-white";
  } else if (application.status === "pending") {
    return "p-3 mb-20 bg-warning text-dark";
  } else if (application.status === "rejected") {
    return "p-3 mb-20 bg-danger text-white";
  }
};

const generatePDF = async (applications) => {
  try {
    const doc = new jsPDF();
    const tableColumn = ["rollNo", "First Name", "Email","Hostel","Room no", "Department","Year", "Outpass For", "Start Date", "End Date", "Status"];
    const tableRows = [];

    applications.forEach((application) => {
      const rowData = [
        application.rollNo,
        application.firstName,
        application.email,
        application.Hostel,
        application.Room,
        application.Department,
        application.Year,
        application.outpassFor,
        formatDate(application.sDate),
        formatDate(application.eDate),
        application.status,
      ];
      tableRows.push(rowData);
    });

    const startY = 20;
    doc.autoTable(tableColumn, tableRows, { startY });

    const date = new Date();
    const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const filename = `report_${dateString}.pdf`;

    doc.text("Outpass Applications Report", 14, 15);
    doc.save(filename);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};

const OutpassApplications = () => {
  const [applications, setApplications] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    document.body.classList.add('tablebg');
    return () => {
      document.body.classList.remove('tablebg');
    };
  }, []);

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

  const filteredApplications = filterStatus === "all"
    ? applications
    : applications.filter(application => application.status === filterStatus);

  return (
    <div>


      <div className="tdbg" style={{ position: 'relative', top: '100px', border: '2px solid ', textAlign: 'center', display: 'flex', justifyContent: 'center', height: '50vh',margin:"0 2.5%"}}>
        {filteredApplications && filteredApplications.length === 0 ? (
          <p>No applications match the selected filter.</p>
        ) : (
          <table>
            <thead style={{ padding: '100px'}}>
              <tr>
                <th scope="col">RollNo</th>
                <th scope="col">Applicant Name</th>
                {/* <th scope="col">Email</th> */}
                <th scope="col">Hostel</th>
                <th scope="col">Room</th>
                <th scope="col">Department</th>
                <th scope="col">Year</th>
                <th scope="col">Reason</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <br />
            <tbody>
              {filteredApplications &&
                filteredApplications.map((application, index) => (
                  <tr key={application._id}>
                    <td>{application.rollNo}</td>
                    <td>{application.firstName}</td>
                    <td>{application.Hostel}</td>
                    <td>{application.Room}</td>
                    <td>{application.Department}</td>
                    <td>{application.Year}</td>
                    <td>{application.outpassFor}</td>
                    <td>
                      {application.status}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
      <div style={{position:'relative',top:'150px'}}>
        <label>Filter by Status:</label>
        <select onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      <div style={{ position: 'relative', top: '150px', textAlign: 'center' }}>
        <button
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
          onClick={() => generatePDF(filteredApplications)}
        >
          Generate Outpass Report
        </button>
      </div>
    </div>
  );
};

export default OutpassApplications;
