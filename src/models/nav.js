import { AppBar, Box, Toolbar, styled } from '@mui/material';
import React from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { NavLink } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor:'#212529'
});

const StyledLink = styled(NavLink)({
  textDecoration:'none',
  color:'white',
  fontSize:18,
  "&.active":
  {
    backgroundColor:'#38d39f',
    borderRadius:5,
    padding:7
  }
})

const Nav = () => {
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Box sx={{display:'flex',justifyContent:'center',gap:'30px',color:'white'}}>
        <StyledLink to='/login'>Login</StyledLink>
        <StyledLink to='/register'>Register</StyledLink>
        <StyledLink to='/'>Home</StyledLink>
        <StyledLink to='form'>Outpass</StyledLink>
        <StyledLink to='dashboard'>Dashboard</StyledLink>
        <StyledLink to='status'>Status</StyledLink>
        <AccountCircleOutlinedIcon />
        </Box>
      </StyledToolbar>
    </AppBar>
  );
}

export default Nav;
