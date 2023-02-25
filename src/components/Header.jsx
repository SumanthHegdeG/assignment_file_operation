import React from 'react'
import { Container, Navbar } from 'react-bootstrap'

const Header = () => {
  return (
    <Navbar bg='dark' variant='dark'>
      <Container className='justify-content-center'>
        <Navbar.Brand>CSV Import</Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default Header
