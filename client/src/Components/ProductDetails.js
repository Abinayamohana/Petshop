import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Toast, ToastBody } from "react-bootstrap";
import '../Css/myStyles.css';

import sparkle from '../icons/sparkle.gif'

const ProductDetails = () => {

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Available Products</h2>
      <Row>
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="chew-card shadow-sm">
              <Card.Img 
                variant="top" 
                src={`http://localhost:5000${product.image}`} 
                className="img-fluid img-chew"
              />

              <Card.Body>
                <Card.Title className="chew-card-title">{product.name}</Card.Title>

                <div className='price-section'>
                  <span className='text-danger fw-bold'> &#8377;{product.price}</span>
                  <small className='fw-bold'>MRP</small>
                  <small className='text-muted text-decoration-line-through'>&#8377;{product.mrp}</small>
                  <span className='badge bg-success ms-2'>{product.discount}</span>

                </div>

                <div className="size-code mt-3">{product.size}</div>
                
              </Card.Body>
              <Button className="btn addToCart" onClick={() => addToCart(product)}>Add To Cart</Button>

            </Card>
          </Col>
        ))}
      </Row>

      {/* Success Toast Message */}
      <Toast
      onClose={() => setShowToast(false)}
      show = {showToast}
      delay={3000}
      autohide
      className="position-fixed bottom-0 end-0 m-3 text-black"
      style={{backgroundColor: "#e78585"}}
      >
      <ToastBody>
      <img 
    src={sparkle} 
    alt="Success" 
    width="40" 
    height="40" 
    // className="me-2"
  />
        Product added successfully! 
        <Button variant="light" className="ms-2" onClick={() => navigate('/cart')}>Go To Cart</Button> </ToastBody>

      </Toast>
    </Container>
  );
};

export default ProductDetails;
