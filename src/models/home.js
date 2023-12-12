import { Avatar, Box, Container, Grid, Paper, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import imge from "../css/logo.png"
import d from "../css/bg2.png"


const Home = () => {

  useEffect(() => {
    document.body.classList.add('hbg');
    return () => {
      document.body.classList.remove('hbg');
    };
  }, []);

  return (

    <Container sx={{ backgroundImage: `url(${d})`, border: "1px dotted", borderRadius: "10px", padding: "10px", fontFamily: "inherit", position: "absolute", top: "100px" }}>
      <img
        src={`${imge}`}
        alt="College Logo"
        style={{ width: "100%" }}
      />
      <h2 style={{ color: '#000000', padding: '20px', backgroundColor: 'white', marginBottom: '20px', borderRadius: '20px', display: 'flex', justifyContent: 'center' }}>HOME</h2>
      <Typography sx={{
        padding: '10px', marginTop: '70px', background: "#FBD3E9",
        background: "-webkit-linear-gradient(to right, #BB377D, #FBD3E9)",
        background: "linear-gradient(to right, #BB377D, #FBD3E9)",
        color: '#eeeeee', borderRadius: '20px 0px 10px 0px'
      }}>
        <h2 style={{ padding: '10px', fontSize: '1.5em'
}}>Process to get Outpass</h2>
        <Box sx={{ color: 'black', backgroundColor: 'white', padding: '20px', lineHeight: '2', borderTopLeftRadius: '10px' }}>
          1. Register<br />
          2. Login<br />
          3. Go to Outpass section<br />
          4. Fill The details <br />
          5. Check and Submit the Form<br />
          6. Check the Status of your request in Status page<br />
        </Box>
      </Typography>
      <Typography sx={{ padding: '10px', marginTop: '70px', backgroundColor: "#37474f", color: '#eeeeee', borderRadius: '0px 20px 0px 10px' }}>
        <h2 style={{ padding: '10px' }}>Instructions for hostellers</h2>
        <Box sx={{ color: 'black', backgroundColor: 'white', padding: '20px', lineHeight: '2', borderTopLeftRadius: '10px' }}>
          1. Should be inside the Hostel before 8:30 PM<br />
          2. No Outside Food Allowed inside the Hostel<br />
          3. Every Hosteller should not be out of the college after 7:30 Pm
        </Box>
      </Typography>



    </Container>
  )
};


export default Home