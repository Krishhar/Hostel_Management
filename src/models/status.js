// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const StatusPage = () => {
//   const [status, setStatus] = useState({});
//   const [downloadEnabled, setDownloadEnabled] = useState(false);

//   useEffect(() => {
//     // Fetch status from the server (replace 'your-api-endpoint' with the actual endpoint)
//     axios.get('/http://localhost:3000//form')
//       .then(response => {
//         setStatus(response.data); // Assuming your API response has a status field
//         updateDownloadButton(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching status:', error);
//       });
//   }, []); // Empty dependency array to run the effect only once on component mount

//   const updateDownloadButton = (statusData) => {
//     // Check conditions for enabling the download button
//     if (statusData.advisorApproval && statusData.deputyApproval) {
//       setDownloadEnabled(true);
//     }
//   };

//   const handleDownload = () => {
//     // Implement the logic to download the outpass (replace 'your-download-endpoint' with the actual endpoint)
//     axios.get('/your-download-endpoint', { responseType: 'blob' })
//       .then(response => {
//         const url = window.URL.createObjectURL(new Blob([response.data]));
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = 'outpass.pdf'; // Specify the desired filename
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//       })
//       .catch(error => {
//         console.error('Error downloading outpass:', error);
//       });
//   };

//   return (
//     <div>
//       <h1>Outpass Application Status</h1>
//       <div>
//         <p>Advisor Approval: {status.advisorApproval ? 'Approved' : 'Pending'}</p>
//         <p>Deputy Warden Approval: {status.deputyApproval ? 'Approved' : 'Pending'}</p>
//       </div>
//       <div>
//         {downloadEnabled && (
//           <button onClick={handleDownload} disabled={!downloadEnabled}>
//             Download Outpass
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StatusPage;
import React, { useRef } from 'react';
import { Typography, Container, CssBaseline, Paper, Button } from '@mui/material';
import html2pdf from 'html2pdf.js';

// StatusPage component with dummy data
function StatusPage() {
  // Dummy data
  const dummyData = {
    name: 'Hari Krishnan',
    rollNumber: '23Mcr029',
    departureDateTime: '2023-12-31T12:00',
    reason: 'Going home for the weekend',
    expectedReturnTime: '2024-1-4',
  };

  // Accessing dummy data
  const name = dummyData.name;
  const rollNumber = dummyData.rollNumber;
  const departureDateTime = dummyData.departureDateTime;
  const reason = dummyData.reason;
  const expectedReturnTime = dummyData.expectedReturnTime;

  // Ref for the paper element
  const componentRef = useRef();

  // Function to handle download
  const handleDownload = () => {
    const content = componentRef.current;

    // Configure the PDF options
    const pdfOptions = {
      margin: 10,
      filename: 'outpass_status.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    // Generate PDF
    html2pdf().from(content).set(pdfOptions).save();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper ref={componentRef} elevation={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3, borderRadius: '10px', backgroundColor: '#f0f0f0' }}>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Outpass Status
        </Typography>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name">Student Name:</label>
          <Typography variant="body1">{name}</Typography>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="rollNumber">Roll Number:</label>
          <Typography variant="body1">{rollNumber}</Typography>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="departureDateTime">Departure Date and Time:</label>
          <Typography variant="body1">{departureDateTime}</Typography>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="reason">Reason for Leaving:</label>
          <Typography variant="body1">{reason}</Typography>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="expectedReturnTime">Expected Return Time:</label>
          <Typography variant="body1">{expectedReturnTime}</Typography>
        </div>

        <Button variant="contained" fullWidth sx={{ mb: 2 }} onClick={handleDownload}>
          Download Status (PDF)
        </Button>
      </Paper>
    </Container>
  );
}

export default StatusPage;
