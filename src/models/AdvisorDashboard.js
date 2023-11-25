// AdvisorDashboard.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdvisorDashboard = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Fetch outpass applications when the component mounts
    fetchApplications();
  }, []);

  const fetchApplications = () => {
    axios.get('http://localhost:3001/form')
      .then((response) => {
        setApplications(response.data);
      })
      .catch((error) => {
        console.error('Error fetching applications:', error);
      });
  };

  const handleAction = (applicationId, action) => {
    // Update the status of the outpass application on the server
    axios.put(`http://localhost:3001/form/${applicationId}`, { status: action })
      .then((response) => {
        // If the action is 'accept', forward the application to the warden
        if (action === 'approved') {
          const studentHostel = response.data.Hostel; // Assuming Hostel is a field in your schema
          forwardToWarden(applicationId, studentHostel);
        }

        // Refresh the application list after taking action
        fetchApplications();
      })
      .catch((error) => {
        console.error('Error updating application status:', error);
      });
  };

  const forwardToWarden = (applicationId, hostel) => {
    // Implement logic to find the warden for the specified hostel and forward the application
    // You may use another API endpoint like '/api/forward-to-warden'
    // to handle the warden assignment and forwarding logic
    axios.post(`http://localhost:3001/forward-to-warden`, { applicationId, hostel })
      .then(() => {
        console.log('Application forwarded to warden successfully');
      })
      .catch((error) => {
        console.error('Error forwarding application to warden:', error);
      });
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Advisor Dashboard</h1><br /><br />
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {applications.map((application) => (
          <li key={application._id} style={{ backgroundColor: 'white', marginBottom: '20px', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ marginBottom: '20px' }}><strong>Student:</strong> {application.firstName} {application.lastName}</div>
            <div style={{ marginBottom: '20px' }}><strong>Start Date:</strong> {application.sDate}</div>
            <div style={{ marginBottom: '20px' }}><strong>End Date:</strong> {application.eDate}</div>
            <div style={{ marginBottom: '20px' }}><strong>Reason:</strong> {application.outpassFor}</div>
            <div style={{ marginBottom: '20px' }}><strong>Status:</strong> {application.status}</div>
            <div style={{ marginTop: '10px' }}>
              <button
                onClick={() => handleAction(application._id, 'approved')}
                style={{
                  marginRight: '10px',
                  padding: '2px',
                  width:'100px',
                  height:'40px',
                  fontSize:'15px',
                  backgroundImage: 'linear-gradient(to right, #32be8f, #38d39f, #32be8f)',
                  backgroundSize: '200%',
                  color: '#fff',
                  fontFamily: "'Aref Ruqaa Ink', sans-serif",
                  cursor: 'pointer',
                  transition: '.5s'
                }}>Accept</button>
              <button onClick={() => handleAction(application._id, 'rejected')}
                style={{
                  marginRight: '10px',
                  marginLeft:'10px',
                  width:'100px',
                  height:'40px',
                  fontSize:'15px',
                  padding: '2px',
                  backgroundImage: 'linear-gradient(to right, #bd1313,#bd1313,#bd1313)',
                  backgroundSize: '200%',
                  color: '#fff',
                  fontFamily: "'Aref Ruqaa Ink', sans-serif",
                  cursor: 'pointer',
                  transition: '.5s',
                }}>Reject</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdvisorDashboard;
