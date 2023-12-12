import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import axios from 'axios';

const Previous = () => {
  const [previousRequests, setPreviousRequests] = useState([]);

  const fetchPreviousRequests = async () => {
    try {
      // Fetch email from localStorage
      const storedEmail = localStorage.getItem('email');

      // Check if email is not empty
      if (storedEmail && storedEmail.trim() !== '') {
        // Make the axios request with the fetched email
        const response = await axios.get('http://localhost:3001/form', {
          params: {
            email: storedEmail,
          },
        });

        console.log(response.data);

        const formData = response.data;

        if (formData && Array.isArray(formData)) {
          const filteredRequests = formData.filter(
            (request) => request.email === storedEmail && (request.status === 'approved' || request.status === 'rejected')
          );

          setPreviousRequests(filteredRequests);
        } else {
          console.error('Invalid or missing data structure in API response.');
        }
      } else {
        console.log('Email is empty, not making the request.');
      }
    } catch (error) {
      alert('no');
      console.error('Error fetching form data:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchPreviousRequests();
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ margin: '10px', padding: '20px', border: '10px double green', backgroundColor: ' rgba(0, 0, 0, 0.8)', color:'white' }}>
      <Typography variant="h4">Previous Approved/Rejected Requests:</Typography>
      {previousRequests.length === 0 ? (
        <Typography variant="body1">No approved or rejected requests found.</Typography>
      ) : (
        <ul>
          {previousRequests.map((request) => (
            <li key={request._id}>
              
              {/* Render information about each approved or rejected request */}
              <Typography variant="body1">{`Email: ${localStorage.getItem('email')}, Date: ${request.sDate}, Status: ${request.status}`}</Typography><br/>
              
            </li>
          ))}
        </ul>
      )}
    </Box>
  );
};

export default Previous;
