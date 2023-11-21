
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/register.css';
import axios from 'axios';
import {MenuItem, TextField } from '@mui/material';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [Department, setDepartment] = useState('');
  const [hostel, setHostel] = useState('');
  const [advisor, setAdvisor] = useState('');
  const [phone, setPhone] = useState('');
  const [Year, setYear] = useState('')
  const navigate = useNavigate()


  useEffect(() => {
    fetchusers()
  }, [])

  const fetchusers = () => {
    axios
      .get('http://localhost:3001/register')
      .then((res) => {
        console.log(res.data)
      })
  }

  const handleRegister = (event) => {
    event.preventDefault()
    axios.post('http://localhost:3001/register', { username, email, password, phone, advisor, Department, Year, hostel })
      .then(() => {
        setUsername('')
        setEmail('')
        setPassword('')
        setPhone('')
        setAdvisor('')
        setDepartment('')
        setYear('')
        setHostel('')
        fetchusers()
        navigate('/login')
      })
  }


  useEffect(() => {
    // This code will run when the component mounts (similar to componentDidMount).
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

    // Cleanup function: Remove the event listeners when the component unmounts.
    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("focus", addcl);
        input.removeEventListener("blur", remcl);
      });
    };
  }, []); // The empty dependency array ensures this code runs once when the component mounts.


  return (
    <div className='root'>
      <div className="container">
        <div className="login-content">
          <form onSubmit={handleRegister}>
            <h2 className="title1">Welcome</h2>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <h5 className="h5">StudentName</h5>
                <input
                  required='true'
                  type="text"
                  className="input"
                  name="username"
                  pattern='^[a-zA-Z ]+$'
                  title='Only Letters'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div className="div">
                <h5 className="h5">Email</h5>
                <input
                  required='true'
                  type="email"
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
                  required='true'
                  type="password"
                  className="input"
                  name="password"
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <br />
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <h5 className="h5">Phone No.</h5>
                <input
                  required='true'
                  type="tel"
                  className="input"
                  name="phone"
                  maxLength={10}
                  pattern='[0-9]{10}'
                  title='Only 10 Numbers'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />

              </div>
            </div>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <h5 className="h5">Advisor Name</h5>
                <input
                  required='true'
                  type="text"
                  className="input"
                  name="advisor"
                  pattern='^[a-zA-Z ]+$'
                  title='Only Letters'
                  value={advisor}
                  onChange={(e) => setAdvisor(e.target.value)}
                />
              </div>
            </div>

            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div className="div">
                <h5 className="h5">Department</h5>
                <input
                  required='true'
                  type="text"
                  className="input"
                  name="Department"
                  value={Department}
                  pattern='^[a-zA-Z ]+$'
                  title='Only Letters'
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </div>
            </div>
            <br />
            <TextField label="Year" select value={Year} onChange={(e) => setYear(e.target.value)} fullWidth>
              <MenuItem value='1'>I</MenuItem>
              <MenuItem value='2'>II</MenuItem>
              <MenuItem value='3'>III</MenuItem>
              <MenuItem value='4'>IV</MenuItem>
              <MenuItem value='5'>V</MenuItem>
            </TextField>
            <br />
            <br />
            <TextField label="Hostel" select value={hostel} onChange={(e) => setHostel(e.target.value)} fullWidth>
              <MenuItem value='Bharathi'>Bharathi</MenuItem>
              <MenuItem value='valluvar'>valluvar</MenuItem>
              <MenuItem value='Sankar'>Sankar</MenuItem>
              <MenuItem value='Dheeran'>Dheeran</MenuItem>
              <MenuItem value='Kamban'>Kamban</MenuItem>
            </TextField>
            <br />
            <br />
            <input type="submit" className="btn" value="Register" />
            <a href="/login">Already Registered, then Login</a>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
