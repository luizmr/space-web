import React from 'react';
import {Navbar, Form, FormControl, Button, Nav} from 'react-bootstrap'
import {Routes} from './routes'
import earth from './assets/images/earth.png'

function App() {
  return (
    <>
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">
        <img src={earth} alt="earth" style={{maxWidth: '50px'}} className="mr-3"/>
        Navbar
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="home">Home</Nav.Link>
        <Nav.Link href="/">Features</Nav.Link>
        <Nav.Link href="home">Pricing</Nav.Link>
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-info">Search</Button>
      </Form>
    </Navbar>
    <Routes />
    </>
  );
}

export default App;
