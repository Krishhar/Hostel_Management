import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/register.css';
import axios from 'axios';
import { MenuItem, TextField } from '@mui/material';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [hostel, setHostel] = useState('');
  const [advisor, setAdvisor] = useState('');
  const [phone, setPhone] = useState('');
  const [Year, setYear] = useState('');
  const [role, setRole] = useState('student'); // New state for role
  const [rollNo, setRollNo] = useState(''); // New state for rollNo
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


  const handleRegister = async (event) => {
    event.preventDefault();
    console.log('Role:', role);

    const additionalInfo = {};
    if (role === 'student' || role === 'classAdvisor') {
      additionalInfo.department = department;
    }
    if (role === 'student') {
      additionalInfo.Year = Year;
      additionalInfo.rollNo = rollNo;
    }

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


    setUsername('');
    setEmail('');
    setPassword('');
    setPhone('');
    setAdvisor('');
    setDepartment('');
    setYear('');
    setHostel('');
    setRollNo('');
    fetchusers(role); // Pass the role to the fetchusers function
    navigate('/login');
  };


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

  const handleRoleChange = (event) => {
    const selectedRole = event.target.value;
    setRole(selectedRole);
    fetchusers(selectedRole); // Pass the selected role to fetchusers
  };


  useEffect(() => {
    fetchusers(role);
  }, [role]);


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
                <h5 className="h5">Name</h5>
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
            <TextField label="Role" select value={role} onChange={handleRoleChange} fullWidth>
              <MenuItem value='student'>Student</MenuItem>
              <MenuItem value='classAdvisor'>Class Advisor</MenuItem>
              <MenuItem value='deputyWarden'>Deputy Warden</MenuItem>
            </TextField>
            <br />
            {(role === 'student' || role === 'deputyWarden') && (
              <>
                <br />
                <TextField label="Hostel" select value={hostel} onChange={(e) => setHostel(e.target.value)} fullWidth>
                  <MenuItem value='Bharathi'>Bharathi</MenuItem>
                  <MenuItem value='valluvar'>valluvar</MenuItem>
                  <MenuItem value='Sankar'>Sankar</MenuItem>
                  <MenuItem value='Dheeran'>Dheeran</MenuItem>
                  <MenuItem value='Kamban'>Kamban</MenuItem>
                  <MenuItem value='ponnar'>Ponnar</MenuItem>
                  <MenuItem value='ielango'>Ielango</MenuItem>
                </TextField>
                <br />
              </>
            )}
            {role === 'student' && (
              <>
                <br />
                <div className="input-div one">
                  <div className="i">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="div">
                    <h5 className="h5">Roll No.</h5>
                    <input
                      required={role === 'student'} // Make it required only for students
                      type="text"
                      className="input"
                      name="rollNo"
                      pattern='^[a-zA-Z0-9]+$'
                      title='Alphanumeric characters only'
                      value={rollNo}
                      onChange={(e) => setRollNo(e.target.value)}
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
              </>
            )}

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


            {/* Show Year and rollNo fields only if the role is 'student' */}


            {role === 'student' || role === 'classAdvisor' ? (
              <div>
                <TextField label="department" select value={department} onChange={(e) => setDepartment(e.target.value)} fullWidth>
                  <MenuItem value='MCA'>MCA</MenuItem>
                  <MenuItem value='MBA'>MBA</MenuItem>
                  <MenuItem value='AIDS'>AIDS</MenuItem>
                  <MenuItem value='MECHANICAL ENGINEERING'>MECHANICAL</MenuItem>
                  <MenuItem value='CIVIL ENGINEERING'>CIVIL</MenuItem>
                </TextField>
              </div>
            ) : null}

            <br />

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