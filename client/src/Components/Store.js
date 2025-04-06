import React from 'react'
import { Link } from "react-router-dom";
import { Container, Row, Col, } from 'react-bootstrap';
// stylesheet
import '../Css/myStyles.css';

// Image
import dogfood from '../Images/dogfood.jpg';
import catfood from '../Images/catfood.jpg';
import pharmacy from '../Images/pharmacy.jpg';
import festival from '../Images/festival.jpg';
import toys from '../Images/toys.jpg';
const categories = [
  
  {
    name: "Toys Store",
    image: toys,
    link: "/toys"
  },
  {
    name: "Dog Food",
    image: dogfood,
    link:"/dog-food",
  },
  {
    name: "Cat Food",
    image: catfood,
    link: "/cat-food",
  },
  {
    name: "Pharmacy",
    image: pharmacy,
    link: "/pharmacy",
  },
  {
    name: "Festival Store",
    image: festival,
    link: "/festivalstore"
  },
];

const Store = () => {
  return (
    <Container className="mt-4">
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
          className='w-full h-40 object-cover food'
        />
        <div className='p-3'>
          <h3 className='text-lg font-bold cardTitle'>{category.name}</h3>
        </div>
        </Link>
        </Col>
          
      ))}
       </Row>

       </Container>
  )
}

export default Store;