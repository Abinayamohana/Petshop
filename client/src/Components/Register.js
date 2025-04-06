import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";


const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(""); // State to store success/failure message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};

//name
  if (!formData.name.trim()) errors.name = "Name is required";
//email
  if (!formData.email) 
  {
    errors.email = "Email is required";
  } 
  else if (!/^\S+@\S+\.\S+$/.test(formData.email)) 
  {
    errors.email = "Invalid email format";
  }

//phone number
  if (!formData.phonenumber)
  {
    errors.phonenumber = 'Phone number is required'
  }
  else if(!/^\d{10}$/.test(formData.phonenumber)){
    errors.phonenumber = "Invaild"

  }
  //password
  if (!formData.password) {
    errors.password = "Password is required";
  } else if (formData.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }
  if (!formData.confirmPassword) {
    errors.confirmPassword = "Confirm Password is required";
  } else if (formData.confirmPassword !== formData.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  setErrors(errors);
  return Object.keys(errors).length === 0;
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await axios.post("http://localhost:5000/api/users", {
        name: formData.name,
        email: formData.email,
        phonenumber: formData.phonenumber,
        password: formData.password,
      });

      setMessage({ type: "success", text: res.data.message });
      setFormData({ name: "", email: "",phonenumber:"", password: "", confirmPassword: "" });
      setErrors({});
      setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.error || "Registration failed" });
    }
  };

  return (
    <div className="regbg-img">
  <Container>

  <Row className="justify-content-center">
    <Col xs={12} md={8} lg={6}>
    <p className='text-muted mt-5 text-doc'> <Link to= '/'> Home </Link>/ <span className='fw-bold' >Create an account</span> </p>
    
    <p className='text-center py-3'>
      Already have an account? <Link to = '/login'>Login</Link>
    </p>
    <h4 className="fw-bold">CREATE AN ACCOUNT 🐾</h4>
    <div className='signup-underline'></div>
      
    {message && (
      <div className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"}`}>
        {message.text}
      </div>
    )}

  <Form onSubmit={handleSubmit}>
    <Form.Group className="form-inputs mt-3">
      <Form.Label>Name:</Form.Label>
      <Form.Control
        type="text"
        name="name"
        placeholder="Enter your name"
        value={formData.name}
        onChange={handleChange}
        isInvalid={!!errors.name}
      />
      <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
    </Form.Group>

    <Form.Group className="form-inputs mt-3">
      <Form.Label>Email:</Form.Label>
      <Form.Control
        type="email"
        name="email"
        placeholder="Enter Your Email"
        value={formData.email}
        onChange={handleChange}
        isInvalid={!!errors.email}
      />
      <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
    </Form.Group>

    <Form.Group className="form-inputs mt-3">
      <Form.Label>Phonenumber:</Form.Label>
      <Form.Control
        type="number"
        name="phonenumber"
        placeholder="Enter Your Phone number"
        value={formData.phonenumber}
        onChange={handleChange}
        isInvalid={!!errors.phonenumber}
      />
      <Form.Control.Feedback type="invalid">{errors.phonenumber}</Form.Control.Feedback>
    </Form.Group>

    <Form.Group className="form-inputs mt-3">
      <Form.Label>Password:</Form.Label>
      <Form.Control
        type="password"
        name="password"
        placeholder="Enter Your Password"
        value={formData.password}
        onChange={handleChange}
        isInvalid={!!errors.password}
      />
      <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
    </Form.Group>

    <Form.Group className="form-inputs mt-3">
      <Form.Label>Confirm Password:</Form.Label>
      <Form.Control
        type="password"
        name="confirmPassword"
        placeholder="Confirm Your Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        isInvalid={!!errors.confirmPassword}
      />
      <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
    </Form.Group>

    <Button
      type="submit"
      className="form-input-btn w-100 my-5 signup-btn fw-bold"
    >
      Sign Up
    </Button>

  </Form>
    </Col>
  </Row>
  </Container>
  </div>
  );
};

export default Register;
