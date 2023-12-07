import React, { useEffect, useState } from 'react';
import { Button, TextField, MenuItem, Typography, Container, CssBaseline, Paper, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import 'react-hot-toast';
import toast from 'react-hot-toast';
import axios from 'axios';

const LoginModal = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const navigate = useNavigate();

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
    } catch (error) {
      alert('Invalid credentials');
    }
  };
  

  useEffect(() => {
    fetchusers(role);
  }, [role]);

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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3, borderRadius: '10px' }}>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Welcome
        </Typography>
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
