import React, { useState } from "react";
import { Form, Button, InputGroup, Container, Row, Col } from "react-bootstrap";

const Delivery = () => {
  const [placeholder, setPlaceholder] = useState("");

  const handlePlaceholderChange = (event) => {
    setPlaceholder(event.target.value);
  };
 
  // Track orders
  return (
    <Container className = "d-flex justify-content-center align-items-center " >
      
      <Row>
        <Col xs={12} md={12} lg={12} className="mx-auto" >   
      <fieldset className="delivery ms-5 p-4">
      <h3 className="mb-5 mt-3">Track Your Order</h3>
        
        {/* Radio Buttons */}
        <div className="d-flex justify-content-center mb-3 mt-4" >
          {/* Search By Label */}
          
        <label className="mb-3 d-block fw-bold">Search By : </label>
        <div className="form-check form-check-inline ms-5">
          <input
            className="form-check-input delivery-ratio "
            type="radio"
            name="searchOption"
            id="orderId"
            value="Enter Your Order ID/No"
            onChange={handlePlaceholderChange}
          />
          <label className="form-check-label" htmlFor="orderId">
            Order ID/No
          </label>
        </div>

        <div className="form-check form-check-inline">
          <input
            className="form-check-input delivery-ratio"
            type="radio"
            name="searchOption"
            id="trackingId"
            value="Enter Your Tracking ID/AWB"
            onChange={handlePlaceholderChange}
          />
          <label className="form-check-label" htmlFor="trackingId">
            Tracking ID/AWB
          </label>
        </div>
        </div>

        {/* Search Input */}
       
        <InputGroup className="mb-3 w-100 mx-auto">
        
          <Form.Control
            type="text"
            id="dynamic-placeholder"
            placeholder={placeholder}
            aria-label="Order Tracking Input"
            className="text-center"
          />
          <Button className="track-button" type="button">
            Track Your Order
          </Button>
          
        </InputGroup>
        
        {/* Status Message */}
        <p className="text-muted">Check the current status of your shipment.</p>
      </fieldset>
      </Col> 
      </Row>
    </Container>
  );
};

export default Delivery;
