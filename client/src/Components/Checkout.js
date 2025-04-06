import React, { useState, useEffect } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    address: ""
  });

  const [cartSummary, setCartSummary] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load user data from local storage
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    setUserData({
      id: storedUser.id || "", // Ensure ID is included
      name: storedUser.name || "",
      email: storedUser.email || "",
      phonenumber: storedUser.phonenumber || "",
      address: storedUser.address || ""
    });

    // Load cart summary from local storage
    const storedCart = JSON.parse(localStorage.getItem("cartSummary")) || [];
    setCartSummary(storedCart);
  }, []);

  const calculateTotalPrice = () => {
    return cartSummary.reduce((total, product) => total + product.price * (product.quantity || 1), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Save the address and cart details to the database
    const response = await fetch("http://localhost:5000/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userData, cartSummary })
    });

    if (response.ok) {
      alert("Order placed successfully!");
      navigate("/user-orders");
  } else {
      alert("Failed to save checkout details");
  }
  
  };

  return (
    <Container className="mt-4">
      <h2>Enter Your Address</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={userData.name}
            required
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={userData.email}
            required
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="phonenumber"
            value={userData.phonenumber}
            required
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            name="address"
            value={userData.address}
            onChange={(e) => setUserData({ ...userData, address: e.target.value })}
            required
          />
        </Form.Group>

        <h3>Order Summary</h3>
        {cartSummary.map((product, index) => (
          <Card className="mb-3 p-3" key={index}>
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <p>Price: ₹{product.price} x {product.quantity || 1}</p>
              <p className="fw-bold">Total: ₹{product.price * (product.quantity || 1)}</p>
            </Card.Body>
          </Card>
        ))}
        
        <h4>Total Price: ₹{calculateTotalPrice()}</h4>

        <Button type="submit" className="w-100 mt-3 mb-5">
          Place Order
        </Button>
      </Form>
    </Container>
  );
};

export default Checkout;
