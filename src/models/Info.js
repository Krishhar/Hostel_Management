import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MenuItem } from '@mui/material';

const Info = ({ onChange }) => {
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastname] = useState('');
  const [outpassFor, setoutpassFor] = useState('');
  const [sDate, setsDate] = useState('');
  const [eDate, seteDate] = useState('');
  const [Dept, setDept] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [Year, setYear] = useState('');
  const [Hostel, setHostel] = useState('');
  const [Room, setRoom] = useState('');

  useEffect(() => {
    fetchusers();
  }, []);

  const fetchusers = () => {
    axios.get('http://localhost:3001/form').then((res) => {
      console.log(res.data);
    });
  };

  const handleform = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:3001/form', {
        firstName,
        lastName,
        outpassFor,
        sDate,
        eDate,
        Dept,
        rollNo,
        Year,
        Hostel,
        Room,
      })
      .then(() => {
        setfirstName('');
        setlastname('');
        setoutpassFor('');
        setsDate('');
        seteDate('');
        setDept('');
        setRollNo('');
        setYear('');
        setHostel('');
        setRoom('');
        fetchusers();
      });
  };

  function getToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const [errors, setErrors] = React.useState({
    firstName: '',
    lastName: '',
    Year: '',
    // Add more fields as needed
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Basic validation checks
    let error = '';
    if (name === 'firstName' || name === 'lastName' || name === 'Department' || name === 'Room') {
      error = value.trim() === '' ? 'This field is required' : '';
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    onChange({ [name]: value });

    switch (name) {
      case 'outpassFor':
        setoutpassFor(value);
        break;
      case 'sDate':
        setsDate(value);
        break;
      case 'eDate':
        seteDate(value);
        break;
      case 'Dept':
        setDept(value);
        break;
      case 'Year':
        setYear(value);
        break;
      case 'Hostel':
        setHostel(value);
        break;
      case 'Room':
        setRoom(value);
        break;
      default:
        break;
    }
  

    // Validate date for start and end date
    if (name === 'sDate' || name === 'eDate') {
      validateDate();
    }
  };

  const validateDate = () => {
    const startDate = document.getElementById('sDate').value;
    const endDate = document.getElementById('eDate').value;

    // Validate start date
    if (startDate && startDate < getToday()) {
      alert('Please select a valid start date (today or future date).');
      document.getElementById('sDate').value = getToday();
    }

    // Validate end date
    if (endDate && endDate < getToday()) {
      alert('Please select a valid end date (today or future date).');
      document.getElementById('eDate').value = getToday();
    }

    // Ensure end date is not earlier than start date
    if (startDate && endDate && startDate > endDate) {
      alert('End date cannot be earlier than start date.');
      document.getElementById('eDate').value = startDate;
    }
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Outpass form
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required="true"
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange={handleInputChange}
            error={Boolean(errors.firstName)}
            helperText={errors.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            onChange={handleInputChange}
            error={Boolean(errors.lastName)}
            helperText={errors.lastName}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12}>
            <TextField
              label="outpass For"
              name="outpassFor"
              select
              value={outpassFor}
              onChange={handleInputChange}
              fullWidth
            >
              <MenuItem value="Staying in hostel">Staying in hostel</MenuItem>
              <MenuItem value="Going to Competition">Going to Competition</MenuItem>
              <MenuItem value="Going to Home">Going to Home</MenuItem>
            </TextField>
          </Grid>


        </Grid>
        <Grid item xs={12} sm={6} sx={{ fontSize: '15px' }}>
          Starting Date:
          <input
            required
            type="date"
            id="sDate"
            name="sDate"
            label="Starting date"
            onChange={handleInputChange}
            min={getToday()}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6} sx={{ fontSize: '15px' }}>
          Ending Date:
          <input
            required
            type="date"
            id="eDate"
            name="eDate"
            label="Ending date"
            onChange={handleInputChange}
            min={getToday()}
            fullWidth
          />
        

        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="Dept"
            name="Department"
            label="Department"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField label="Year" id='Year' name='Year' select value={Year} onChange={handleInputChange} fullWidth>
              <MenuItem value='1'>I</MenuItem>
              <MenuItem value='2'>II</MenuItem>
              <MenuItem value='3'>III</MenuItem>
              <MenuItem value='4'>IV</MenuItem>
              <MenuItem value='5'>V</MenuItem>
            </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="rollNo"
            name="rollNo"
            label="Roll No"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField label="Hostel" id='Hostel' name='Hostel' select value={Hostel} onChange={handleInputChange} fullWidth>
              <MenuItem value='Bharathi'>Bharathi</MenuItem>
              <MenuItem value='valluvar'>valluvar</MenuItem>
              <MenuItem value='Sankar'>Sankar</MenuItem>
              <MenuItem value='Dheeran'>Dheeran</MenuItem>
              <MenuItem value='Kamban'>Kamban</MenuItem>
            </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="room"
            name="Room"
            label="Room No"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
        </Grid>

      </Grid>

    </React.Fragment>
  );
}

export default Info;