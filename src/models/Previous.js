import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import axios from 'axios';

const Previous = ({ rollNo }) => {
  const [previousRequests, setPreviousRequests] = useState([]);

  const fetchPreviousRequests = async () => {
    try {
      // Replace 'studentId' with the actual ID or token of the logged-in student
      const response = await axios.get(`http://localhost:3001/form?rollNo=29`);
      
      console.log(response.data); // Log the response data to inspect its structure
  
      const formData = response.data;
  
      // Check if formData exists and has requests
      if (formData && Array.isArray(formData)) {
        const filteredRequests = formData.filter(
          (request) => request.status === 'approved' || request.status === 'rejected'
        );
  
        setPreviousRequests(filteredRequests);
      } else {
        console.error('Invalid or missing data structure in API response.');
      }
    } catch (error) {
      alert("no");
      console.error('Error fetching form data:', error);
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      await fetchPreviousRequests();
    };
  
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rollNo]);

  return (
    <Box sx={{ margin: '10px', padding: '20px', border: '1px double green', backgroundColor: '#dedede' }}>
      <Typography variant="h5">Previous Approved/Rejected Requests:</Typography>
      {previousRequests.length === 0 ? (
        <Typography variant="body1">No approved or rejected requests found.</Typography>
      ) : (
        <ul>
          {previousRequests.map((request) => (
            <li key={request._id}>
              {/* Render information about each approved or rejected request */}
              <Typography variant="body1">{`Request ID: ${request._id}, Date: ${request.date}, Status: ${request.status}`}</Typography>
            </li>
          ))}
        </ul>
      )}
    </Box>
  );
};

export default Previous;