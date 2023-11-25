import React, { useState, useEffect } from 'react';
import '../css/login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'react-hot-toast';
import toast from 'react-hot-toast';
import { MenuItem, TextField } from '@mui/material';

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
      console.log('Login Error', error);
      toast.error('Invalid credentials');
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
    <div className='root'>
      <div className="container">
        <div className="login-content">
          <form onSubmit={handleLogin}>
            <h2 className="title1">Welcome</h2>
            <br /><br />
            <div className="div">
              <TextField label="Role" select value={role} onChange={handleRoleChange} fullWidth>
                <MenuItem value='student'>Student</MenuItem>
                <MenuItem value='class Advisor'>Class Advisor</MenuItem>
                <MenuItem value='deputy Warden'>Deputy Warden</MenuItem>
              </TextField>
              <br />
              <br />
            </div>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <h5 className="h5">Email</h5>
                <input
                  required="true"
                  type="text"
                  className="input"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div className="div">
                <h5 className="h5">Password</h5>
                <input
                  required="true"
                  type="password"
                  className="input"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <a href="#">Forgot Password?</a>
            <button type="submit" className="btn">
              Login
            </button>
            <a href="/register">NEW Here, then Sign Up!</a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
