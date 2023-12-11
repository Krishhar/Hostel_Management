import React, { useEffect } from 'react';
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';
import { Button } from '@mui/material';

const Review = ({ formData }) => {
  const paragraphStyle = { padding: '8px' };

  const handleDownload = () => {
    const formHtml = document.getElementById('download');
    console.log(formHtml)

    if (formHtml) {
      const pdf = new jsPDF();
      pdf.text(20, 20, 'Outpass Form Review');

      // Convert HTML content to PDF
      html2pdf(formHtml, {
        margin: 10,
        filename: 'outpass_form.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      }).save();
    }
  };

  useEffect(() => {
    document.body.classList.add('revbg');
    return () => {
      document.body.classList.remove('revbg');
    };
  }, []);

  return (

    <>
      <div style={{ margin: '10px', padding: '10px' }}>
        <h2>Review Your Details</h2>
        <div id='download'>
          <p style={paragraphStyle}>First Name: {formData.firstName}</p>
          <p style={paragraphStyle}>Email: {localStorage.getItem('email')}</p>
          <p style={paragraphStyle}>Selected Option: {formData.outpassFor}</p>
          <p style={paragraphStyle}>Starting Date: {formData.sDate}</p>
          <p style={paragraphStyle}>Ending Date Date: {formData.eDate}</p>
          <p style={paragraphStyle}>Department: {formData.Department}</p>
          <p style={paragraphStyle}>Year: {formData.Year}</p>
          <p style={paragraphStyle}>Roll No: {formData.rollNo}</p>
          <p style={paragraphStyle}>Hostel: {formData.Hostel}</p>
          <p style={paragraphStyle}>Room No: {formData.Room}</p>
          <p style={paragraphStyle}> Deputy Warden Seal</p>
          </div>
          {/* Add other form fields as needed */}
          <div sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              onClick={handleDownload}
              sx={{ mt: 3, ml: 1 }}
            >
              Download Form
            </Button>
          </div>
       
        </div>
      </>


      );
};

      export default Review;
