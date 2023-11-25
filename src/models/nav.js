import { AppBar, Box, Button, Toolbar, styled } from '@mui/material';
import React from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: '#212529'
});

const StyledLink = styled(NavLink)({
  textDecoration: 'none',
  color: 'white',
  fontSize: 18,
  "&.active":
  {
    backgroundColor: '#38d39f',
    borderRadius: 5,
    padding: 7
  }
})

// ... (imports remain the same)

const Nav = () => {
  const isUserSignedIn = !!localStorage.getItem('token');
  const userRole = localStorage.getItem('role');
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '30px', color: 'white' }}>
          {isUserSignedIn ? (
            <>
              {userRole === 'student' && (
                <>
                  <StyledLink to='form'>Outpass</StyledLink>
                  <StyledLink to='dashboard'>Dashboard</StyledLink>
                  <StyledLink to='status'>Status</StyledLink>
                </>
              )}
              {userRole === 'advisor' && (
                <>
                  {/* Additional links for advisor */}
                  <StyledLink to='advisor'>Advisor Dashboard</StyledLink>
                  <StyledLink to='pending'>Pending Requests</StyledLink>
                </>
              )}
              {userRole === 'deputyWarden' && (
                <>
                  {/* Additional links for deputy warden */}
                  <StyledLink to='/DeputyWarden'>Deputy Warden Dashboard</StyledLink>
                  <StyledLink to='pending'>Pending Requests</StyledLink>
                </>
              )}
              <StyledLink to='/'>Home</StyledLink>
              <Button onClick={handleSignOut}>Sign Out</Button>
            </>
          ) : (
            <>
              <StyledLink to='/login'>Login</StyledLink>
              <StyledLink to='/register'>Register</StyledLink>
              <StyledLink to='/'>Home</StyledLink>
            </>
          )}
          <AccountCircleOutlinedIcon />
        </Box>
      </StyledToolbar>
    </AppBar>
  );
};

export default Nav;
