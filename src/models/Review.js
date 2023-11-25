import React from 'react';

const Review = ({ formData }) => {
  const paragraphStyle = { padding: '8px' };

  return (
    
    <div id='download'>
    <div style={{ margin: '10px',padding:'10px' }}>
      <h2>Review Your Details</h2>
    </div >
      <p style={paragraphStyle}>First Name: {formData.firstName}</p>
      <p style={paragraphStyle}>Last Name: {formData.lastName}</p>
      <p style={paragraphStyle}>Selected Option: {formData.outpassFor}</p>
      <p style={paragraphStyle}>Starting Date: {formData.sDate}</p>
      <p style={paragraphStyle}>Ending Date Date: {formData.eDate}</p>
      <p style={paragraphStyle}>Department: {formData.Department}</p>
      <p style={paragraphStyle}>Year: {formData.Year}</p>
      <p style={paragraphStyle}>Roll No: {formData.rollNo}</p>
      <p style={paragraphStyle}>Hostel: {formData.Hostel}</p>
      <p style={paragraphStyle}>Room No: {formData.Room}</p>
      {/* Add other form fields as needed */}
      </div>
    
    
  );
};

export default Review;
