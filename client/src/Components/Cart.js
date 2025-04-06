import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";  // Import Trash Icon

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateQuantity = (index, change) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = (updatedCart[index].quantity || 1) + change;
    if (updatedCart[index].quantity <= 0) {
      updatedCart.splice(index, 1); // Remove item if quantity is 0
    }
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const deleteItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <Container className='mt-4'>
      <h2>Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <h5>Your Cart is empty</h5>
      ) : (
        cart.map((product, index) => (
          <Card className='mb-3 shadow-sm p-3 position-relative' key={index}>
            
            {/* Trash Icon (Top-Right) */}
            <Button 
              variant="outline-danger" 
              className="position-absolute top-0 end-0 m-2" 
              onClick={() => deleteItem(index)}
              style={{ border: "none" }}
            >
              <FaTrash />
            </Button>

            <Row className='align-items-center'>
              {/* Product Image */}
              <Col md={2} className="text-center">
                <Card.Img 
                  variant='top' 
                  src={`http://localhost:5000${product.image}`} 
                  className='img-fluid' 
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}  
                />
              </Col>

              {/* Product Details */}
              <Col md={5}>
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <p className="fw-bold">
                    ₹{product.price * (product.quantity || 1)} &nbsp;
                    <span className="text-muted text-decoration-line-through">₹{product.mrp * (product.quantity || 1)}</span> &nbsp;
                    <span className="text-success">{(product.mrp * (product.quantity || 1)) - (product.price * (product.quantity || 1))} saved</span>
                  </p>
                </Card.Body>
              </Col>

              {/* Quantity Update Buttons */}
              <Col md={3} className='text-center'>
                <Button onClick={() => updateQuantity(index, -1)} variant='danger' className='me-2'>-</Button>
                <span className="fw-bold">{product.quantity || 1}</span>
                <Button onClick={() => updateQuantity(index, 1)} variant='success' className='ms-2'>+</Button>
              </Col>
            </Row>
          </Card>
        ))
      )}
      {cart.length > 0 && (
      <Button className='w-100 mt-3' onClick={() => {
      localStorage.setItem("cartSummary", JSON.stringify(cart)); 
      navigate('/checkout');
      }}>
      Proceed to Checkout
      </Button>

      )}
    </Container>
  );
};

export default Cart;
