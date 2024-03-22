  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import dh from "../css/dheeran.jpg"
  import bha from "../css/bharathi.jpg"


  const StatusPage = () => {
    const [userDetails, setUserDetails] = useState({});
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
      document.body.classList.add('statbg');
      return () => {
        document.body.classList.remove('statbg');
      };
    }, []);


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
      axios.get('http://localhost:3001/form', { responseType: 'blob' })
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
      <>

        <img src={dh} alt="Dheeran" style={styles.leftImage} />
        <img src={bha} alt="Bharathi" style={styles.rightImage} />
        <div style={styles.pageContainer}>
          <div style={styles.container}>
            <h1 style={styles.title}>Outpass Application Status</h1>
            <div style={styles.userInfo}>
              <p><strong>Advisor Approval:</strong> {userDetails.classAdvisorApproval ? 'Approved' : 'Pending'}</p>
              <p><strong>Deputy Warden Approval:</strong> {userDetails.deputyWardenApproval ? 'Approved' : 'Pending'}</p>
              <p><strong>Email:</strong> {storedEmail}</p>
              <p><strong>Name:</strong> {userDetails.firstName}</p>
              <p><strong>Roll No:</strong> {userDetails.rollNo}</p>
              <p><strong>Hostel:</strong> {userDetails.Hostel}</p>
              <p><strong>Room No:</strong> {userDetails.Room}</p>
              <p><strong>From:</strong> {userDetails.sDate}</p>
              <p><strong>To:</strong> {userDetails.eDate}</p>
              <p><strong>Outpass Status:</strong> {userDetails.status} </p>
            </div>
            <div style={styles.buttonContainer}>
              <button style={styles.downloadButton} onClick={handleDownload} disabled={ userDetails.status !== 'approved'}>
                Download Outpass
              </button>
            </div>
          </div>
        </div>
        

      </>
    );
  };

  const styles = {
    pageContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: '55%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      margin: 'auto',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#e2ebf0',
      border: '2px groove #fa709a',
      width:'30%',
      fontSize:'25px'
    },
    leftImage: {
      width: '600px', // Set the width as needed
      height: 'auto', // Maintain aspect ratio
      marginRight: '20px',
      float: 'left',
      position: 'relative',
      top:'50px',
      right: '10%'
    },
    rightImage: {
      width: '600px', // Set the width as needed
      height: 'auto', // Maintain aspect ratio
      marginLeft: '20px',
      float: 'right',
      position: 'relative',
      // top: '550px',
      left:"20%"
    },
    container: {
      maxWidth: '600px',
    },
    title: {
      fontSize: '24px',
      textAlign: 'center',
      marginBottom: '40px',
    },
    userInfo: {
      marginBottom: '20px',
    },
    buttonContainer: {
      textAlign: 'center',
    },
    downloadButton: {
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '10px 20px',
      fontSize: '16px',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  };

  export default StatusPage;