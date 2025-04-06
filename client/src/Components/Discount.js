import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const discountOffers = [
  { code: "NEWTAILS", discount: "Extra 10% off", minAmount: "₹1500" },
  { code: "SAVE30", discount: "Flat ₹30 off", minAmount: "₹1000" },
  { code: "SAVE100", discount: "Flat ₹100 off", minAmount: "₹2500" },
  { code: "SAVE225", discount: "Flat ₹225 off", minAmount: "₹5000" },
  { code: "SAVE500", discount: "Flat ₹500 off", minAmount: "₹10,000" },
];

const Discount = () => {
  return (
    <Container className="mt-4">
      <Row className="d-flex flex-nowrap justify-content-around overflow-auto px-3">
        {/* flex-nowrap is used  for scrolling */}
        {discountOffers.map((offer, index) => (
          <Col key={index} xs={10} sm={6} md={4} lg={2} className="px-2">
            <Card className="discount-card text-center">
              <div className="discount-code">{offer.code}</div>
              <Card.Body>
                <Card.Title>{offer.discount}</Card.Title>
                <Card.Text>on orders above {offer.minAmount}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Discount;
