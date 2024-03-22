// import { AppBar, Box, Button, Toolbar, Typography, styled } from '@mui/material';
// import React from 'react';
// import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
// import { Link, NavLink, useNavigate } from 'react-router-dom';

// const StyledToolbar = styled(Toolbar)({
//   display: 'flex',
//   justifyContent: 'space-between',
//   backgroundColor: '#212529',
// });

// const StyledLink = styled(NavLink)({
//   textDecoration: 'none',
//   color: 'white',
//   fontSize: 23,
  
//   "&.active":
//   {
//     backgroundColor: '#38d39f',
//     borderRadius: 5,
//     padding: 5,
    
//   }
// })


// const Nav = () => {
//   const isUserSignedIn = !!localStorage.getItem('token');
//   const userRole = localStorage.getItem('role');
//   const navigate = useNavigate();

//   const handleSignOut = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
      
//     <AppBar position="fixed" >
//       <StyledToolbar>
//       <Typography variant='h5' sx={{display:"flex",justifyContent:"left", color:"white", fontFamily:"inherit"}}>ONLINE OUTPASS APPLICATION</Typography> 
//         <Box sx={{ display: 'flex', justifyContent: 'space', gap: '30px', color: 'white', padding:".8%" }}>
//           {isUserSignedIn ? (
//             <>
//               {userRole === 'student' && (
//                 <>
//                   <StyledLink to='form'>Outpass</StyledLink>
//                   <StyledLink to='dashboard'>Dashboard</StyledLink>
//                   <StyledLink to='status'>Status</StyledLink>
//                 </>
//               )}
//               {userRole === 'classAdvisor' && (
//                 <>
//                   {/* Additional links for class advisor */}
//                   <StyledLink to='advisor'>Advisor Dashboard</StyledLink>
//                   <StyledLink to='history'>History</StyledLink>
//                 </>
//               )}
//               {userRole === 'deputyWarden' && (
//                 <>
//                   {/* Additional links for deputy warden */}
//                   <StyledLink to='/deputyWarden'>Deputy Warden Dashboard</StyledLink>
//                   <StyledLink to='history'>History</StyledLink>
//                 </>
//               )}
//               <StyledLink to='/'>Home</StyledLink>
//               <Button onClick={handleSignOut}>Sign Out</Button>
//             </>
//           ) : (
//             <>
//             <StyledLink to='/'>Home</StyledLink>
//               <StyledLink to='/login'>Login</StyledLink>
//               <StyledLink to='/register'>Register</StyledLink>
              
//             </>
//           )}
          
//         </Box>
//       </StyledToolbar>
      
//     </AppBar>
//   );
// };

// export default Nav;

import React from 'react';
import { AppBar, Box, Button, Toolbar, Typography, styled } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { NavLink, useNavigate } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: '#212529',
});

const StyledLink = styled(NavLink)({
  textDecoration: 'none',
  color: 'white',
  fontSize: 23,
  
  "&.active": {
    backgroundColor: '#38d39f',
    borderRadius: 5,
    padding: 5,
  }
});

const Nav = () => {
  const isUserSignedIn = !!localStorage.getItem('token');
  const userRole = localStorage.getItem('role');
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AppBar position="fixed" >
      <StyledToolbar>
        <Typography variant='h5' sx={{display:"flex",justifyContent:"left", color:"white", fontFamily:"inherit"}}>HOSTEL OUTPASS APPLICATION</Typography> 
        <Box sx={{ display: 'flex', justifyContent: 'space', gap: '30px', color: 'white', padding:".8%" }}>
          <StyledLink to='/'>Home</StyledLink>
          {isUserSignedIn ? (
            <>
              {userRole === 'student' && (
                <>
                  <StyledLink to='form'>Outpass</StyledLink>
                  <StyledLink to='dashboard'>Dashboard</StyledLink>
                  <StyledLink to='status'>Status</StyledLink>
                </>
              )}
              {userRole === 'classAdvisor' && (
                <>
                  {/* Additional links for class advisor */}
                  <StyledLink to='advisor'>Advisor Dashboard</StyledLink>
                  <StyledLink to='/application'>Report</StyledLink>
                  <StyledLink to='history'>History</StyledLink>
                  
                </>
              )}
              {userRole === 'deputyWarden' && (
                <>
                  {/* Additional links for deputy warden */}
                  <StyledLink to='/deputyWarden'>Deputy Warden Dashboard</StyledLink>
                  <StyledLink to='/application'>Report</StyledLink>
                  <StyledLink to='history'>History</StyledLink>
                  
                </>
              )}
              <Button onClick={handleSignOut}>Sign Out</Button>
            </>
          ) : (
            <>
              <StyledLink to='/login'>Login</StyledLink>
              <StyledLink to='/register'>Register</StyledLink>
              
            </>
          )}
        </Box>
      </StyledToolbar>
    </AppBar>
  );
};

export default Nav;
