
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/register.css';
import axios from 'axios';

const Register = () => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [email, setEmail] = useState('');
const [Department, setDepartment] = useState('');
const [hostel, setHostel] = useState('');
const navigate = useNavigate()

useEffect(()=>{
fetchusers()
},[])

const fetchusers = () =>{
  axios
  .get('http://localhost:3001/register')
  .then((res)=>{
    console.log(res.data)
  })
}

const handleRegister = (event)=>{
  event.preventDefault()    
  axios.post('http://localhost:3001/register',{username,password,confirmPassword,email,Department,hostel})
  .then(()=>{
    setUsername('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setDepartment('')
    setHostel('')
    fetchusers()
    navigate('/login')
  })
}
  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;

  //   if (name === 'username') {
  //     setUsername(value);
  //   } else if (name === 'password') {
  //     setPassword(value);
  //   }
  //   else if (name === 'confirmPassword'){
  //     setConfirmPassword(value)
  //   }
  //   else if (name === 'email'){
  //     setEmail(value)
  //   }
  //   else if (name === 'Department'){
  //     setDepartment(value)
  //   }
  //   else if (name === 'hostel'){
  //     setHostel(value)
  //   }

  // };

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
                <h5 className="h5">Username</h5>
                <input
                  type="text"
                  className="input"
                  name="username"
                  value={username}
                  onChange = {(e)=>setUsername(e.target.value)}
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
                  type="password"
                  className="input"
                  name="password"
                  value={password}
                  onChange = {(e)=>setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div className="div">
                <h5 className="h5">confirmPassword</h5>
                <input
                  type="password"
                  className="input"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange = {(e)=>setConfirmPassword(e.target.value)}
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
                  type="text"
                  className="input"
                  name="email"
                  value={email}
                  onChange = {(e)=>setEmail(e.target.value)}
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
                  type="text"
                  className="input"
                  name="Department"
                  value={Department}
                  onChange = {(e)=>setDepartment(e.target.value)}
                />
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div className="div">
                <h5 className="h5">Hostel</h5>
                <input
                  type="text"
                  className="input"
                  name="hostel"
                  value={hostel}
                  onChange = {(e)=>setHostel(e.target.value)}
                />
              </div>
            </div>
            <a href="#">Forgot Password?</a>
            <input type="submit" className="btn" value="Login" />
            <a href="/login">NEW Here, then Sign Up!</a>
          </form>
        </div>
      </div>
    </div>
  );
};


export default Register;
