import React, { useState, useEffect } from 'react';
import axios from 'axios';
import imge from "../css/k.png"

const AdvisorDashboard = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Fetch pending outpass applications for Advisor when the component mounts
    fetchPendingApplications();
  }, []);

  const fetchPendingApplications = () => {
    axios.get('http://localhost:3001/form')
      .then((response) => {
        // Filter out the approved applications
        const pendingApplications = response.data.filter(application => application.status !== 'approved');
        setApplications(pendingApplications);
      })
      .catch((error) => {
        console.error('Error fetching applications:', error);
      });
  };

  const handleApprove = (applicationId) => {
    // Update the status of the outpass application on the server
    axios.put(`http://localhost:3001/form/${applicationId}`, {
      classAdvisorApproval: true,
    })
      .then(() => {
        console.log('Application approved successfully');
        document.getElementById(`acc_${applicationId}`).innerHTML = "Accepted";
        document.getElementById(`rej_${applicationId}`).innerHTML = "Reject";
        fetchPendingApplications();
      })
      .catch((error) => {
        console.error('Error updating application status:', error);
      });
  };
  

  const handleReject = (applicationId) => {
    // Update the status of the outpass application on the server
    axios.put(`http://localhost:3001/form/${applicationId}`, {
      classAdvisorApproval: false,
    })
      .then(() => {
        console.log('Application rejected successfully');
        document.getElementById(`rej_${applicationId}`).innerHTML = "Rejected";
        document.getElementById(`acc_${applicationId}`).innerHTML = "Accept";
        fetchPendingApplications();
      })
      .catch((error) => {
        console.error('Error updating application status:', error);
      });
  };

  const redirectToHistory = () => {
    // Redirect to the history page (replace '/history' with your actual route)
    window.location.href = '/history';
  };

  useEffect(() => {
    document.body.classList.add('cbg');
    return () => {
      document.body.classList.remove('cbg');
    };
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Advisor Dashboard</h1><br /><br />
      <ul style={{ listStyle: 'none', padding: 0 , textAlign: 'center'}}>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px',marginBottom:"20px", background: "linear-gradient( 135deg, #FFA8A8 10%, #FCFF00 100%)",}}><br/>
            <div style={{ width: '100px', height: '105px', borderRadius: '50%', overflow: 'hidden',display:"flex" }}>
              <img src={`${imge}`} alt="College Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', padding: "1px" }} />
            </div>
            </div>
        {applications.map((application, index) => (
          <li
            key={application._id}
            className={index % 2 === 0 ? 'even-row' : 'odd-row'}
            style={{
              marginBottom: '20px',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
              ,border: "5px solid goldenrod"
            }}>

            <div style={{ marginBottom: '20px' }}><strong>Student:</strong> {application.firstName} {application.lastName}</div>
            <div style={{ marginBottom: '20px' }}><strong>Start Date:</strong> {application.sDate}</div>
            <div style={{ marginBottom: '20px' }}><strong>End Date:</strong> {application.eDate}</div>
            <div style={{ marginBottom: '20px' }}><strong>Reason:</strong> {application.outpassFor}</div>
            <div style={{ marginBottom: '20px' }}><strong>Status:</strong> {application.status}</div>
            <div style={{ marginTop: '10px' }}>
              <button id={`acc_${application._id}`}
                onClick={() => handleApprove(application._id)}
                style={{
                  marginRight: '10px',
                  padding: '2px',
                  width: '100px',
                  height: '40px',
                  fontSize: '15px',
                  backgroundImage: 'linear-gradient(to right, #32be8f, #38d39f, #32be8f)',
                  backgroundSize: '200%',
                  color: '#fff',
                  fontFamily: "'Aref Ruqaa Ink', sans-serif",
                  cursor: 'pointer',
                  transition: '.5s'
                }}
              >
                Accept
              </button>
              <button
              id={`rej_${application._id}`}
                onClick={() => handleReject(application._id)}
                style={{
                  marginRight: '10px',
                  marginLeft: '10px',
                  width: '100px',
                  height: '40px',
                  fontSize: '15px',
                  padding: '2px',
                  backgroundImage: 'linear-gradient(to right, #bd1313,#bd1313,#bd1313)',
                  backgroundSize: '200%',
                  color: '#fff',
                  fontFamily: "'Aref Ruqaa Ink', sans-serif",
                  cursor: 'pointer',
                  transition: '.5s',
                }}
              >
                Reject
              </button>
              <button
                onClick={() => redirectToHistory(application._id)}
                style={{
                  marginLeft: '10px',
                  width: '100px',
                  height: '40px',
                  fontSize: '15px',
                  padding: '2px',
                  backgroundColor: '#007BFF',
                  color: '#fff',
                  fontFamily: "'Aref Ruqaa Ink', sans-serif",
                  cursor: 'pointer',
                  transition: '.5s',
                }}
              >
                View History
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdvisorDashboard;