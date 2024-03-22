import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, MenuItem, Button, Typography, Paper, CssBaseline } from '@mui/material';
import { makeStyles, Container } from '@mui/material';
import axios from 'axios';
import styled from '@emotion/styled';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [hostel, setHostel] = useState('');
  const [roomNo, setroomNo] = useState('');
  const [advisor, setAdvisor] = useState('');
  const [phone, setPhone] = useState('');
  const [Year, setYear] = useState('');
  const [role, setRole] = useState('student');
  const [rollNo, setRollNo] = useState('');
  const navigate = useNavigate();

  // Validation functions
  const isAlphabetsOnly = (value) => /^[a-zA-Z ]+$/.test(value);
  const isNumeric = (value) => /^\d+$/.test(value);
  const isEmailValid = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  

  useEffect(() => {
    document.body.classList.add('lg');
    return () => {
      document.body.classList.remove('lg');
    };
  }, []);

  // Validation logic for each field
  const isUsernameValid = isAlphabetsOnly(username);
  const isPasswordValid = password.length >= 6;
  const isEmailValidValue = isEmailValid(email);
  const isAdvisorValid = isAlphabetsOnly(advisor);
  const isPhoneValid = isNumeric(phone) && phone.length === 10;
  const isRoomValid = isNumeric(roomNo) && roomNo.length <=3;

  // Overall form validity
  const isFormValid =
    isUsernameValid &&
    isPasswordValid &&
    isEmailValidValue &&
    isPhoneValid;

    
  const fetchusers = (role) => {
    axios
      .get(`http://localhost:3001/register?role=${role}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  };

  const handleRegister = async () => {
    if (isFormValid) {
      const additionalInfo = {};
      if (role === 'student' || role === 'classAdvisor') {
        additionalInfo.department = department;
      }
      if (role === 'student') {
        additionalInfo.roomNo = roomNo;
        additionalInfo.Year = Year;
        additionalInfo.rollNo = rollNo;
      }

      try {
        await axios.post(`http://localhost:3001/register?role=${role}`, {
          username,
          email,
          password,
          phone,
          advisor,
          hostel,
          role,
          ...additionalInfo,
        });

        alert('Registration successful!');

        setUsername('');
        setEmail('');
        setPassword('');
        setPhone('');
        setAdvisor('');
        setDepartment('');
        setYear('');
        setHostel('');
        setroomNo('');
        setRollNo('');
        navigate('/login');
      } catch (error) {
        alert('Registration failed. Please try again.');
        console.error('Error during registration:', error);
      }
    } else {
      alert('Please fill out the form correctly.');
    }
  };

  const handleRoleChange = (event) => {
    const selectedRole = event.target.value;
    setRole(selectedRole);
    fetchusers(selectedRole);
  };
  
  useEffect(() => {
    document.body.classList.add('lbb');
    return () => {
      document.body.classList.remove('lbb');
    };
  }, []);

  useEffect(() => {
    fetchusers(role);
  }, [role]);

  useEffect(() => {
    const inputs = document.querySelectorAll('.input');

    function addcl() {
      let parent = this.parentNode.parentNode;
      parent.classList.add('focus');
    }

    function remcl() {
      let parent = this.parentNode.parentNode;
      if (this.value === '') {
        parent.classList.remove('focus');
      }
    }

    inputs.forEach((input) => {
      input.addEventListener('focus', addcl);
      input.addEventListener('blur', remcl);
    });

    

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener('focus', addcl);
        input.removeEventListener('blur', remcl);
      });
    };
  }, []);


  return (
    <Container>
      <br/>
      <br/>
      <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3, borderRadius: '10px',width:"50%",position:"relative"
    ,left:"27%"  }}>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Online Outpass registration Page
        </Typography>

        <TextField
          label="Role"
          select
          value={role}
          onChange={handleRoleChange}
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value='student'>Student</MenuItem>
          <MenuItem value='classAdvisor'>Class Advisor</MenuItem>
          <MenuItem value='deputyWarden'>Deputy Warden</MenuItem>
        </TextField>

        <TextField
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          error={!isUsernameValid}
          helperText={!isUsernameValid ? 'Only alphabets are allowed' : ''}
        />

        {role === 'student' || role === 'deputyWarden' ? (
          <TextField
            label="Hostel"
            select
            value={hostel}
            onChange={(e) => setHostel(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          >
            <MenuItem value='Bharathi'>Bharathi</MenuItem>
            <MenuItem value='valluvar'>Valluvar</MenuItem>
            <MenuItem value='Sankar'>Sankar</MenuItem>
            <MenuItem value='Dheeran'>Dheeran</MenuItem>
            <MenuItem value='Kamban'>Kamban</MenuItem>
            <MenuItem value='ponnar'>Ponnar</MenuItem>
            <MenuItem value='ielango'>Elango</MenuItem>
          </TextField>
        ) : null}

        {role === 'student' && (
          <>
            <TextField
              label="Roll No."
              type="text"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Year"
              select
              value={Year}
              onChange={(e) => setYear(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            >
              <MenuItem value='1'>I</MenuItem>
              <MenuItem value='2'>II</MenuItem>
              <MenuItem value='3'>III</MenuItem>
              <MenuItem value='4'>IV</MenuItem>
              <MenuItem value='5'>V</MenuItem>
            </TextField>
            <TextField
              label="Advisor Name"
              type="text"
              value={advisor}
              onChange={(e) => setAdvisor(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              error={!isAdvisorValid}
              helperText={!isAdvisorValid ? 'Only alphabets are allowed' : ''}
            />
            <TextField
              label="Room no"
              type="text"
              value={roomNo}
              onChange={(e) => setroomNo(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              error={!isRoomValid}
              helperText={!isRoomValid ? 'Only Numbers are allowed' : ''}
            />
          </>
        )}

        <TextField
          label="Department"
          select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value='MCA'>MCA</MenuItem>
          <MenuItem value='MBA'>MBA</MenuItem>
          <MenuItem value='AIDS'>AIDS</MenuItem>
          <MenuItem value='MECHANICAL ENGINEERING'>MECHANICAL</MenuItem>
          <MenuItem value='CIVIL ENGINEERING'>CIVIL</MenuItem>
        </TextField>

        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          error={!isEmailValidValue}
          helperText={!isEmailValidValue ? 'Invalid email address' : ''}
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          error={!isPasswordValid}
          helperText={!isPasswordValid ? 'Password must be at least 6 characters' : ''}
        />

        <TextField
          label="Phone No."
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          error={!isPhoneValid}
          helperText={!isPhoneValid ? 'Invalid phone number' : ''}
        />

        <Button type="submit" variant="contained" fullWidth sx={{ mb: 2 }} onClick={handleRegister} disabled={!isFormValid}>
          Register
        </Button>

        <Link to="/login" variant="body2">
          Already Registered? Login
        </Link>
      </Paper>
      </Container>
  );
};

export default Register;
