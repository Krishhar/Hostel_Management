import { Box, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';

const BASE_CALENDAR_URL = "https://www.googleapis.com/calendar/v3/calendars";
const BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY =
  "Indian Holidays,en.indian#holiday@group.v.calendar.google.com"; // Calendar Id for Indian holidays
const API_KEY = "AIzaSyCOZvxxG4DADA0TC7eyJyheBbGbV7hURj0";
const CALENDAR_REGION = "en.india"; // Set the region to India

const Holiday = () => {
  const [upcomingHolidays, setUpcomingHolidays] = useState([]);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await fetch(`${BASE_CALENDAR_URL}/${BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY}/events?key=${API_KEY}`);
        const data = await response.json();
        const holidays = data.items.map((holiday) => ({
          name: holiday.summary,
          date: holiday.start.date,
        }));
        setUpcomingHolidays(holidays);
      } catch (error) {
        console.error('Error fetching holidays:', error);
      }
    };

    fetchHolidays();
  }, []);

  return (
    <Box sx={{ margin: '10px', padding: '20px', border: '1px double green', backgroundColor: '#dedede' }}>
      <Typography variant="p">Upcoming Holidays:</Typography>
      <ul>
        {upcomingHolidays.map((holiday, index) => (
          <li key={index}>
            <Typography>
              {holiday.name} - {holiday.date}
            </Typography>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default Holiday;
