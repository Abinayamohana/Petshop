import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import gift from '../icons/gift.svg';

import Store from '../Components/Store';
import Discount from '../Components/Discount';


function Home() {
  return (
    <>
    <Container>   
    <Row className='mt-4 flex-container'>
        <Col className='p-4'><h3>Flat 10% off on your first order Use Code : <span className='px-1 code'>NEW</span></h3></Col>                
        <Col className='p-4'><h3><img src={gift} className='gift' /> Get assured free gifts on your first order</h3></Col>
      </Row>
      </Container>

      {/* Shop by store */}
      <h3 style={{ textAlign:'center'}} className='mt-4'>Shop by store</h3>
      <Store />
    

    <h3 style={{ textAlign:'center'}} className='mt-4'>Offres you can't miss</h3>

    <Discount />
      
    </>
  )
}

export default Home;