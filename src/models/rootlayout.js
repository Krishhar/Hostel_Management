import React from 'react'
import Nav from './nav'
import {Outlet} from 'react-router-dom'
import { Container } from '@mui/material'

const Rootlayout = () => {
  return (
    <>
    <Nav/>
    <Container sx={{p:5}}>
    <Outlet/>
    </Container>
    </>
  )
}

export default Rootlayout