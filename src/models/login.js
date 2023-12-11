import React, { useEffect, useState } from 'react';
import { Button, TextField, MenuItem, Typography, Container, CssBaseline, Paper, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import 'react-hot-toast';
import toast from 'react-hot-toast';
import axios from 'axios';
import "../index.css"

const LoginModal = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const navigate = useNavigate();

  const win = window.sessionStorage;

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

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', { email, password, role });
      const token = response.data.token;
      toast.success('Login successful');
      setEmail('');
      setPassword('');
      navigate('/');
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('email',email)
    } catch (error) {
      alert('Invalid credentials');
    }
  };
  
  useEffect(() => {
    document.body.classList.add('rbb');
    return () => {
      document.body.classList.remove('rbb');
    };
  }, []);

  useEffect(() => {
    if(win.getItem('email'))
    setEmail(win.getItem('email'))

  }, [win,email]);

  useEffect(() => {
    win.getItem('email',email)
        fetchusers(role);
  }, [role,email,win]);

  useEffect(() => {
    const inputs = document.querySelectorAll(".input");

    function addcl() {
      let parent = this.parentNode.parentNode;
      parent.classList.add("focus");
    }

    function remcl() {
      let parent = this.parentNode.parentNode;
      if (this.value === "") {
        parent.classList.remove("focus");
      }
    }

    inputs.forEach((input) => {
      input.addEventListener("focus", addcl);
      input.addEventListener("blur", remcl);
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("focus", addcl);
        input.removeEventListener("blur", remcl);
      });
    };
  }, []);

  const handleRoleChange = (event) => {
    const selectedRole = event.target.value;
    setRole(selectedRole);
    fetchusers(selectedRole);
  };


  return (
    <Container>
      <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3, borderRadius: '10px',position:'absolute', top:"250px",
    width:'300px',left:"40%" }}>
        <Typography component="h1" variant="h4" sx={{ mb: 2, fontFamily:"inherit" }}>
          Login
        </Typography>
        <br/>
        <TextField
          label="Role"
          select
          fullWidth
          value={role}
          onChange={handleRoleChange}
          sx={{ mb: 2 }}
        >
          <MenuItem value="student">Student</MenuItem>
          <MenuItem value="classAdvisor">Class Advisor</MenuItem>
          <MenuItem value="deputyWarden">Deputy Warden</MenuItem>
        </TextField>
        <TextField
          required
          type="text"
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          required
          type="password"
          label="Password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button type="button" variant="contained" fullWidth onClick={handleLogin} sx={{ mb: 2 }}>
          Login
        </Button>
        <Link href="/register" variant="body2">
          {"Don't have an account? Sign Up"}
        </Link>
      </Paper>
    </Container>
  );
};

export default LoginModal;
