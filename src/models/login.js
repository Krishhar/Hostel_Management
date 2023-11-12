import React, { useState, useEffect } from 'react';
import '../css/login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginModal = () => {
  const [user, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    Fetchusers();
  }, []);

  const Fetchusers = () => {
    axios
      .get('http://localhost:3001/register')
      .then((res) => {
        console.log(res.data);
      });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', { email, password });
      const token = response.data.token;
      alert('Login successful');
      setEmail('');
      setPassword('');
      Fetchusers();
      navigate('/');
      window.location.reload();
      localStorage.setItem('token', token);
    } catch (error) {
      console.log('Login Error', error);
    }
  };

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
          <form onSubmit={handleLogin}>
            <h2 className="title1">Welcome</h2>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
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
            <a href="#">Forgot Password?</a>
            <button type="submit" className="btn">Login</button>
            <a href="/register">NEW Here, then Sign Up!</a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
