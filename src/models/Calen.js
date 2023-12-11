// Modify your Calendar component
import React from 'react';
import '../css/Calender.css'; // Import your CSS file for styling

const Calendar = () => {
  // Get the current date
  const currentDate = new Date();
  // Set the calendar to start from the current month
  const startMonth = currentDate.getMonth();
  // Create an array for the next 6 months
  const months = Array.from({ length: 5 }, (_, index) => new Date(currentDate.getFullYear(), startMonth + index, 1));

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="calendar-container">
      {months.map((month, index) => (
        <div key={index} className="month">
          <h3>{month.toLocaleString('default', { month: 'long' })}</h3>

          {/* Display weekdays row */}
          <div className="weekdays-row">
            {weekdays.map((weekday, index) => (
              <div key={index} className="weekday">
                {weekday}
              </div>
            ))}
          </div>

          <div className="days-container">
            {Array.from({ length: new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate() }, (_, day) => {
              const date = new Date(month.getFullYear(), month.getMonth(), day + 1);
              const isSunday = date.getDay() === 0;
              return (
                <div key={day} className={`day ${isSunday ? 'sunday' : ''}`}>
                  {day + 1}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Calendar;
