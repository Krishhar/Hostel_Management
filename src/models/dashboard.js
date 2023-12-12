// Dashboard.js
import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import Previous from './Previous';
import Calen from './Calen';



const Dashboard = () => {

  useEffect(() => {
    document.body.classList.add('dashbg');
    return () => {
      document.body.classList.remove('dashbg');
    };
  }, []);

  return (
    <Grid container spacing={3} sx={{position:"relative",top:"100px"}}>
      <Grid item xs={12}>
        <Calen/>
     </Grid>
      <Grid item xs={12}>
        <Previous />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
