// LoginModal.js
import React, { useState } from 'react';
import { Modal, Paper, TextField, Button } from '@mui/material';

const LoginModal = ({ open, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Paper className='modal-content'>
        <h2 className='title1'>Welcome</h2>
        <TextField
          label='Username'
          variant='outlined'
          fullWidth
          name='username'
          value={username}
          onChange={handleInputChange}
        />
        <TextField
          label='Password'
          type='password'
          variant='outlined'
          fullWidth
          name='password'
          value={password}
          onChange={handleInputChange}
        />
        <Button variant='contained' onClick={onClose}>
          Close
        </Button>
        <Button variant='contained' onClick={onClose}>
          Login
        </Button>
      </Paper>
    </Modal>
  );
};

export default LoginModal;
