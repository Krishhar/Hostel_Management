// // DeputyWardenHistory.jsx

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const DeputyWardenHistory = () => {
//   const [history, setHistory] = useState([]);

//   useEffect(() => {
//     // Fetch Deputy Warden history when the component mounts
//     fetchHistory();
//   }, []);

//   const fetchHistory = () => {
//     axios.get('http://localhost:3001/form')
//       .then((response) => {
//         setHistory(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching Deputy Warden history:', error);
//       });
//   };

//   return (
//     <div>
//       <h1 style={{ textAlign: 'center' }}>Deputy Warden History</h1>
//       <br/>
//       <ul style={{ listStyle: 'none', padding: 0 }}>
//         {history.map((item) => (
//           <li key={item._id} style={{ backgroundColor: 'white', marginBottom: '20px', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
//             <div style={{ marginBottom: '20px' }}><strong>Student:</strong> {item.firstName} {item.lastName}</div>
//             <div style={{ marginBottom: '20px' }}><strong>Start Date:</strong> {item.sDate}</div>
//             <div style={{ marginBottom: '20px' }}><strong>End Date:</strong> {item.eDate}</div>
//             <div style={{ marginBottom: '20px' }}><strong>Reason:</strong> {item.outpassFor}</div>
//             <div style={{ marginBottom: '20px' }}><strong>Status:</strong> {item.status}</div>
//             <div style={{ marginBottom: '20px' }}><strong>Date of Approval/Rejection:</strong> {item.deputyWardenApprovalDate}</div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default DeputyWardenHistory;

// DeputyWardenHistory.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import image from "../css/valluvar.jpg"
import html2pdf from 'html2pdf.js';

const DeputyWardenHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Fetch Deputy Warden history when the component mounts
    fetchHistory();
  }, []);

  const fetchHistory = () => {
    axios.get('http://localhost:3001/deputyWardensHistory')
      .then((response) => {
        setHistory(response.data);
      })
      .catch((error) => {
        console.error('Error fetching Deputy Warden history:', error);
      });
  };
  const handleDownload = (application) => {
    const content = document.getElementById(`outpass_${application._id}`);
  
    html2pdf(content, {
      margin: 10,
      filename: `Outpass_${application._id}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    });
  };
  
  useEffect(() => {
    document.body.classList.add('cbg');
    return () => {
      document.body.classList.remove('cbg');
    };
  }, []);

  return (
    <section style={{background:`url((${image}))` }}>
      <h1 style={{ textAlign: 'center' }}>Class Advisor History</h1><br/>
      <ul style={{ listStyle: 'none', padding: 0, textAlign:"center"} }>
        {history.map((item,index) => (
          <li key={item._id}
          id={`outpass_${item._id}`}
          className={index % 2 === 0 ? 'even-row' : 'odd-row'}
           style={{
            marginBottom: '20px',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            ,border: "5px solid goldenrod"
          }}>
            <div>
            <div style={{ marginBottom: '20px' }}><strong>Student:</strong> {item.firstName} </div>
            <div style={{ marginBottom: '20px' }}><strong>RollNo:</strong> {item.rollNo} </div>
            <div style={{ marginBottom: '20px' }}><strong>Year:</strong> {item.Year} </div>      
            <div style={{ marginBottom: '20px' }}><strong>Start Date:</strong> {item.sDate}</div>
            <div style={{ marginBottom: '20px' }}><strong>End Date:</strong> {item.eDate}</div>
            <div style={{ marginBottom: '20px' }}><strong>Reason:</strong> {item.outpassFor}</div>
            <div style={{ marginBottom: '20px' }}><strong>Status:</strong> {item.status}</div>
            <div style={{ marginBottom: '20px' }}><strong>Date of Approval/Rejection:</strong> {item.classAdvisorApprovalDate}</div>
            </div>
            <button
      onClick={() => handleDownload(item)}
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
      Download
    </button>

          </li>
        ))}
      </ul>
    </section>
  );
};

export default DeputyWardenHistory;