// Dashboard.js
import React from 'react';
import { Grid } from '@mui/material';
import Holiday from './Holiday';
import Previous from './Previous';
import Calen from './Calen';



const Dashboard = () => {

  return (
    <Grid container spacing={3}>
      <Grid sx={{backgroundColor:'rgba(31, 38, 46, 0.5)'}} item xs={12}>
        <Calen/>
     </Grid>
      <Grid item xs={6}>
        <Holiday />
      </Grid>
      <Grid item xs={6}>
        <Previous />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
