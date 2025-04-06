import React, { useState, useEffect } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    address: ""
  });

  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  useEffect(() => {
    // Fetch user details from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    
    if (storedUser.name) {
      setUserData({
        name: storedUser.name || "",
        email: storedUser.email || "",
        phonenumber: storedUser.phonenumber || "",
        address: storedUser.address || "" // Load address from localStorage
      });
    }
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });

    if (response.ok) {
      setSuccessMessage("Address saved successfully!"); // Set success message

      // Store updated address in localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      // Refresh page after 2 seconds to reflect changes
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      setSuccessMessage("Failed to save address. Please try again."); // Set error message
    }
  };

  return (
    <Container className="mt-4">
      <h2>Enter Your Address</h2>

      {successMessage && <Alert variant="success">{successMessage}</Alert>} {/* Show success message */}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
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
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            name="address"
            value={userData.address} // Display saved address
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button type="submit" className="w-100">
          Save
        </Button>
      </Form>
    </Container>
  );
};

export default Address;
