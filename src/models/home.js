import { Avatar, Box, Grid, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import LoginModal from './demo_login';
import styled from '@emotion/styled';
import Photo from './photos';



const Home = () => {
  return (
    <>
    <h2 style={{color:'#000000', padding:'20px',backgroundColor:'white',marginBottom:'20px',borderRadius:'20px',display:'flex' , justifyContent:'center'}}>HOME PAGE</h2>
    <h3 style={{padding:'15px',display:'flex' , justifyContent:'center'}}>Online Outpass Application</h3>
      <Photo />
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography sx={{ padding: '10px', marginTop: '70px', backgroundColor: "#37474f", color: '#eeeeee',borderRadius:'0px 20px 0px 10px' }}>
            <h2 style={{padding:'10px'}}>Instructions for hostellers</h2>
            <Box sx={{color:'black', backgroundColor:'white' , padding:'20px',lineHeight:'2', borderTopLeftRadius:'10px'}}>
              1. Should be inside the Hostel before 8:30 PM<br/>
              2. No Outside Food Allowed inside the Hostel
            </Box>
          </Typography>
        </Grid>
        <Grid item xs={6}>
        <Typography sx={{ padding: '10px', marginTop: '70px', backgroundColor: "#37474f", color: '#eeeeee',borderRadius:'20px 0px 10px 0px'  }}>
            <h2 style={{padding:'10px'}}>Process to get Outpass</h2>
            <Box sx={{color:'black', backgroundColor:'white' , padding:'20px',lineHeight:'2', borderTopLeftRadius:'10px'}}>
              1. Register<br/>
              2. Login<br/>
              3. Go to Outpass section<br/>
              4. Fill The details <br/>
              5. Check and Submit the Form<br/>
              6. Check the Status of your request in Status page<br/>
            </Box>
          </Typography>

        </Grid>
      </Grid>
    </>
  )
};


export default Home