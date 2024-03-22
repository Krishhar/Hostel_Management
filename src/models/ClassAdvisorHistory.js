import React, { useState, useEffect } from 'react';
import axios from 'axios';
import image from "../css/valluvar.jpg"
import html2pdf from 'html2pdf.js';
import jsPDF from "jspdf";
import "jspdf-autotable";

const formatDate = (dateString) => {
  return new Intl.DateTimeFormat("en-US").format(new Date(dateString));
};

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

  // const handleDownload = (application) => {
  //   const content = document.getElementById(`outpass_${application._id}`);
  
  //   html2pdf(content, {
  //     margin: 10,
  //     filename: `Outpass_${application._id}.pdf`,
  //     image: { type: 'jpeg', quality: 0.98 },
  //     html2canvas: { scale: 2 },
  //     jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  //   });
  // };

  const generatePDF = async (applications) => {
    try {
      const doc = new jsPDF();
      const tableColumn = ["Id", "First Name", "Email", "Outpass For", "Start Date", "End Date", "Status"];
      const tableRows = [];
  
      applications.forEach((application) => {
        const rowData = [
          application._id,
          application.firstName,
          application.email,
          application.outpassFor,
          formatDate(application.sDate),
          formatDate(application.eDate),
          application.status,
        ];
        tableRows.push(rowData);
      });
  
      const startY = 20;
      const columnStyles = {
        0: { cellWidth: 10 },
        1: { cellWidth: 30 },
        // Adjust the width for each column as needed
      };
  
      doc.autoTable(tableColumn, tableRows, { startY, styles: { cellPadding: 1.5, fontSize: 10, halign: 'center' }, columnStyles });
  
      const date = new Date();
      const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      const filename = `report_${dateString}.pdf`;
  
      doc.text("Outpass Applications Report", 14, 15);
  
      // Download as Blob
      const pdfBlob = doc.output('blob');
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(pdfBlob);
      downloadLink.download = filename;
      downloadLink.click();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };
  
  useEffect(() => {
    document.body.classList.add('cbg');
    return () => {
      document.body.classList.remove('cbg');
    };
  }, []);

  return (
    <section style={{background:`url((${image}))` }}>
      <br/>
      <br/>
      <h1 style={{ textAlign: 'center' }}>Class Advisor History</h1>
      <ul style={{ listStyle: 'none', padding: 0, textAlign:"center"} }>
        {history.map((item,index) => (
          <li key={item._id}
          id={`outpass_${item._id}`}
          className={index % 2 === 0 ? 'even-rowh' : 'odd-row'}
           style={{
            marginBottom: '20px',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            ,border: "5px solid goldenrod",
            fontSize:"25px"
          }}>
            <div>
              <br/>
            <div style={{ marginBottom: '20px' }}><strong>Student:</strong> {item.firstName} </div>
            <div style={{ marginBottom: '20px' }}><strong>RollNo:</strong> {item.rollNo} </div>
            <div style={{ marginBottom: '20px' }}><strong>Department:</strong> {item.Deaprtment} </div>
            <div style={{ marginBottom: '20px' }}><strong>Hostel:</strong> {item.Hostel} </div>
            <div style={{ marginBottom: '20px' }}><strong>Room No:</strong> {item.Room} </div>
            <div style={{ marginBottom: '20px' }}><strong>Year:</strong> {item.Year} </div>      
            <div style={{ marginBottom: '20px' }}><strong>Start Date:</strong> {item.sDate}</div>
            <div style={{ marginBottom: '20px' }}><strong>End Date:</strong> {item.eDate}</div>
            <div style={{ marginBottom: '20px' }}><strong>Reason:</strong> {item.outpassFor}</div>
            <div style={{ marginBottom: '20px' }}><strong>Status:</strong> {item.status}</div>
            <div style={{ marginBottom: '20px' }}><strong>Date of Approval/Rejection:</strong> {item.classAdvisorApprovalDate}</div>
            </div>
            <br/>
            <button
      onClick={() => generatePDF(item)}
      style={{
        marginRight: '10px',
        padding: '2px',
        width: '200px',
        height: '70px',
        fontSize: '25px',
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

export default ClassAdvisorHistory;

