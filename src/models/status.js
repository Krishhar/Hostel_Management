import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StatusPage = () => {
  const [userDetails, setUserDetails] = useState({});
  const [status, setStatus] = useState({});
  const [Requests, setRequests] = useState([]);
  const [downloadEnabled, setDownloadEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const storedEmail = localStorage.getItem('email');

  const fetchRequests = async () => {
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
        setRequests(formData); // Assuming formData is an array of requests

        if (formData && Array.isArray(formData)) {
          const filteredRequests = formData.filter(
            (request) => request.email === storedEmail && (request.status === 'approved' || request.status === 'rejected')
          );

          setRequests(filteredRequests);
        } else {
          console.error('Invalid or missing data structure in API response.');
          setError('Invalid or missing data structure in API response.');
        }
      } else {
        console.log('Email is empty, not making the request.');
        setError('Email is empty, not making the request.');
      }
    } catch (error) {
      console.error('Error fetching form data:', error);
      setError('Error fetching form data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchRequests();
    };

    fetchData();
  }, [storedEmail]); // Include storedEmail in the dependency array to re-run the effect when it changes

  useEffect(() => {
    // Assuming you want to set userDetails based on the first request in the filteredRequests array
    if (Requests.length > 0) {
      setUserDetails(Requests[0]);
      // Update download button status based on the fetched statusData
      updateDownloadButton(Requests[0]);
    }
  }, [Requests]);

  const updateDownloadButton = (statusData) => {
    // Check conditions for enabling the download button
    if (statusData.advisorApproval && statusData.deputyApproval) {
      setDownloadEnabled(true);
    }
  };

  const handleDownload = () => {
    // Implement the logic to download the outpass
    // Replace 'your-download-endpoint' with the actual endpoint
    axios.get('/download', { responseType: 'blob' })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'outpass.pdf'; // Specify the desired filename
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
      .catch(error => {
        console.error('Error downloading outpass:', error);
        setError('Error downloading outpass.');
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Outpass Application Status</h1>
      <div>
        <p>Advisor Approval: {userDetails.classAdvisorApproval? 'Approved' : 'Pending'}</p>
        <p>Deputy Warden Approval: {userDetails.deputyWardenApproval ? 'Approved' : 'Pending'}</p>
        <p>Email: {storedEmail}</p>
        <p>Name: {userDetails.firstName}</p>
      </div>
      <div>
        {downloadEnabled && (
          <button onClick={handleDownload} disabled={!downloadEnabled}>
            Download Outpass
          </button>
        )}
      </div>
    </div>
  );
};

export default StatusPage;
