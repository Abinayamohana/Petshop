import React from 'react';
import Container from 'react-bootstrap/Container';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
// stylesheet
import '../Css/myStyles.css';

// logo
import logo from '../Images/logo.jpg';

// Nav bar Icons
import HomeIcon from '../icons/homeicon.svg';
import Del from '../icons/del.svg';
import Phone from '../icons/phone.svg';
import Contact from '../icons/contact.svg';
import Cart from '../icons/cart.svg';
//  Link
import {Link} from 'react-router-dom';
import ShopByBreed from './ShopByBreed';

function Header() {
  return (
   
    <>

{/* //Navigation */}
<nav className="navbar navbar-button">
    <div className="container-fluid">
      <img src= {logo} alt="Logo" className="ms-5 logo-button" />
      <form className="d-flex">
    
        <input className="form-control me-2 input-button" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn search-button" type="submit">Search</button> 
        </form> 
        <form className="d-flex">
        <Link to = "/">
            <img 
              src={HomeIcon} 
              alt='Navigate'
              className='icon-button ms-3 mt-2'              
            />
            
        </Link>

        <Link to = "/contactUs">
            <img 
              src={Phone}
              alt='Navigate'
              className = 'icon-button ms-3 mt-2'
            />
            
        </Link>

        <Link to = "/Delivery">
            <img 
              src={Del} 
              alt='Navigate'
              className='icon-button ms-3 mt-2'              
            />
            
        </Link>        
        
        <Link to = "/UserDashboard">
            <img 
              src={Contact} 
              alt='Navigate'
              className='icon-button ms-3 mt-2'
            />
        </Link>

        <Link to = "/cart">
            <img 
              src={Cart} 
              alt='Navigate'
              className='icon-button ms-3 mt-2 me-4'
            />
        </Link>
        </form> 
         
            
    </div>
  </nav>

  <Navbar expand="lg" className="nav-button" sticky='top'>
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100 d-flex justify-content-between">
            <NavDropdown title="Dogs" id="nav-dogs"></NavDropdown>
            <NavDropdown title="Cats" id="nav-cats"></NavDropdown>
            <NavDropdown title="Shop By Breed" id="nav-breed"><ShopByBreed /></NavDropdown>
            <NavDropdown title="Henlo" id="nav-henlo"></NavDropdown>
            <NavDropdown title="Pharmacy" id="nav-pharmacy"></NavDropdown>
            <NavDropdown title="Small Animals" id="nav-dogs-2"></NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
  </Navbar>
  
  </>
  
  )
}

export default Header;