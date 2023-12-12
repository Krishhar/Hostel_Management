import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Info from './Info';
import Review from './Review';
import axios from 'axios';
// import jsPDF from 'jspdf';
// import html2pdf from 'html2pdf.js';
import imge from "../css/k.png"

const steps = ['Information', 'Review your Details'];

export default function Aform() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    outpassFor: '',
    sDate: '',
    eDate: '',
    Department: '',
    rollNo: '',
    Year: '',
    Hostel: '',
    Room: '',
  });

  // const handleDownload = () => {
  //   const formHtml = document.getElementById('download');
  //   console.log(formHtml)

  //   if (formHtml) {
  //     const pdf = new jsPDF();
  //     pdf.text(20, 20, 'Outpass Form Review');

  //     // Convert HTML content to PDF
  //     html2pdf(formHtml, {
  //       margin: 10,
  //       filename: 'outpass_form.pdf',
  //       image: { type: 'jpeg', quality: 0.98 },
  //       html2canvas: { scale: 2 },
  //       jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  //     }).save();
  //   }
  // };



  const validateFormData = (formData) => {
    return (
      formData.firstName !== '' &&
      formData.email !== '' &&
      formData.Department !== '' &&
      formData.outpassFor !== '' &&
      formData.sDate !== '' &&
      formData.eDate !== '' &&
      formData.rollNo !== '' &&
      formData.Year !== '' &&
      formData.Hostel !== '' &&
      formData.Room !== ''
    );
  };

  // useEffect(() => {
  //   fetchusers()
  // }, [])

  // const fetchusers = () => {
  //   axios
  //     .get('http://localhost:3001/form')
  //     .then((res) => {
  //       console.log(res.data)
  //     })
  // }

  const handleNext = () => {
    if (validateFormData(formData)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      alert('Please fill in all required fields before proceeding.');
    }
  };
  // const handleNext = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleForm = (event) => {
    event.preventDefault();

    // Assuming formData is defined somewhere in your component state
    axios
      .post('http://localhost:3001/form', formData)
      .then(() => {
        console.log('Form submitted successfully');
        setFormData({
          firstName: '',
          email: '',
          outpassFor: '',
          sDate: '',
          eDate: '',
          Department: '',
          rollNo: '',
          Year: '',
          Hostel: '',
          Room: '',
        });
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
        alert('An error occurred while submitting the form. Please try again.');
        console.log(error);
      });
  };

  const handleFormChange = (data) => {
    setFormData({ ...formData, ...data });
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Info onChange={handleFormChange} />;
      case 1:
        return <Review formData={formData} />;
      default:
        throw new Error('Unknown step');
    }
  };

  return (

    <>

      <Container component="main" maxWidth="md" sx={{ mb: 4 , }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, borderRadius: '10px', border:"7px groove #00719079" }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', background: "linear-gradient( 135deg, #FFA8A8 10%, #FCFF00 100%)" }}>
            <div style={{ width: '100px', height: '105px', borderRadius: '50%', overflow: 'hidden', }}>
              <img src={`${imge}`} alt="College Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', padding: "1px" }} />
            </div>

          </div>
          <br />
          <Typography component="h1" variant="h4" align="center" sx={{ fontFamily: "inherit" }}>
            KEC Outpass Form
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Successfully Submitted
              </Typography>
              <Typography variant="subtitle1">
                Your Application is Submitted Successfully. You can View the Status of your Application in the Status Page. Have a Nice day
              </Typography>
              {/* <div sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  onClick={handleDownload}
                  sx={{ mt: 3, ml: 1 }}
                >
                  Download Form
                </Button>
              </div> */}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <div sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={activeStep === steps.length - 1 ? handleForm : handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                </Button>
              </div>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </>

  );
}
