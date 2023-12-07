import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClassAdvisorHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Fetch Class Advisor history when the component mounts
    fetchHistory();
  }, []);

  const fetchHistory = () => {
    axios.get('http://localhost:3001/classAdvisorsHistory')
      .then((response) => {
        setHistory(response.data);
      })
      .catch((error) => {
        console.error('Error fetching Class Advisor history:', error);
      });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh'  }}>
      <h1 style={{ textAlign: 'center' }}>Class Advisor History</h1><br/>
      <ul style={{ listStyle: 'none', padding: 0 } }>
        {history.map((item) => (
          <li key={item._id} style={{ backgroundColor: 'white', marginBottom: '20px', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
            <div style={{ marginBottom: '20px' }}><strong>Student:</strong> {item.firstName} {item.lastName}</div>
            <div style={{ marginBottom: '20px' }}><strong>Start Date:</strong> {item.sDate}</div>
            <div style={{ marginBottom: '20px' }}><strong>End Date:</strong> {item.eDate}</div>
            <div style={{ marginBottom: '20px' }}><strong>Reason:</strong> {item.outpassFor}</div>
            <div style={{ marginBottom: '20px' }}><strong>Status:</strong> {item.status}</div>
            <div style={{ marginBottom: '20px' }}><strong>Date of Approval/Rejection:</strong> {item.classAdvisorApprovalDate}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassAdvisorHistory;
