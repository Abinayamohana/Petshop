import React from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Carousel, } from 'react-bootstrap';

import fesBanner from '../festival/fesBanner.jpg';
import unwrap from '../festival/unwrap.jpg';

// Image
import dresses from '../festival/dresses.jpg';
import petfood from '../festival/petfood.jpg';
import kurtas from '../festival/kurtas.jpg';
import bowties from '../festival/bowties.jpg';
import shirts from '../festival/shirts.jpg';

//care essentials
import anxiety from '../festival/anxiety.jpg';
import shampoos from '../festival/shampoos.jpg';
import diet from '../festival/diet.jpg';
import indoor from '../festival/indoor.jpg';
import treats from '../festival/treats.jpg';
import travel from '../festival/travel.jpg';
const categories = [
  {
    image: dresses,
    link:"/dog-food",
  },
  {
    image: petfood,
    link:"/dog-food",
  },
  {
    image: kurtas,
    link:"/dog-food",
  },
  {
    image: bowties,
    link:"/dog-food",
  },
  {
    image: shirts,
    link:"/dog-food",
  },
];

const careEssential = [
  {
    image: anxiety,
    link:"/dog-food",
  },
  {
    image: shampoos,
    link:"/dog-food",
  },
  {
    image: diet,
    link:"/dog-food",
  },
  {
    image: indoor,
    link:"/dog-food",
  },
  {
    image: treats,
    link:"/dog-food",
  },
  {
    image: travel,
    link:"/dog-food",
  },
];
const Festivalstore = () => {
  return (
    <>
    <img src={fesBanner} className='cover' />
    <div style={{backgroundColor:"rgb(250, 236, 158)"}}>
      <Row className="d-flex flex-nowrap justify-content-around overflow-auto px-3">
      {categories.map((category, index) => (
        <Col key={index} xs={10} sm={6} md={4} lg={2} className="px-2">
         
        <Link
          to = {category.link}          
          className='w-48 shadow-lg rounded-lg overflow-hidden text-center transform hover:scale-105 transition'
         >
        <img
          src={category.image}
          alt={category.image}
          className='w-full fes-cover '
        />
        
        </Link>
        </Col>
          
      ))}
       </Row>
       </div>

    <img src={unwrap} className='cover' />

    {/* care essentials */}
    <Container className="mt-4">
      <Row className="d-flex flex-nowrap justify-content-around overflow-auto px-3">
        
          
      {careEssential.map((item, index) => (
        <Col key={index} xs={10} sm={6} md={4} lg={2} className="px-2">
         
        <Link
          to = {item.link}          
          className='w-48 shadow-lg rounded-lg overflow-hidden text-center transform hover:scale-105 transition'
         >
        <img
          src={item.image}
          alt={item.image}
          className='w-full fes mb-4'
        />
        
        </Link>
        
        </Col>
          
      ))}
       </Row>
       </Container>
       
    </>
  )
}

export default Festivalstore