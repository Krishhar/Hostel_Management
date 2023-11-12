// Review.js
import React from 'react';

const Review = ({ formData }) => {
  return (
    <div>
      <h2>Review Your Details</h2>
      <p>First Name: {formData.firstName}</p>
      <p>Last Name: {formData.lastName}</p>
      <p>Selected Option: {formData.selectedOption}</p>
      <p>Department: {formData.Dept}</p>
      <p>Year: {formData.Year}</p>
      <p>Roll No: {formData['Roll no']}</p>
      <p>Hostel: {formData.hostel}</p>
      <p>Room No: {formData.room}</p>
      {/* Add other form fields as needed */}
    </div>
  );
};

export default Review;
