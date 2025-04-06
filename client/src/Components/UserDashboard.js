import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { FaBoxOpen, FaMapMarkerAlt, FaRedo, FaQuestionCircle, FaCog, FaSignOutAlt } from "react-icons/fa";
import AccountDetails from "./AccountDetails";
import ContactUs from "./ContactUs";
import Address from "./Address";
import UserOrders from "./UserOrders";

const UserDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("Orders");
  const [user, setUser] = useState(null);


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const menuItems = [
    { name: 'Orders', icon: <FaBoxOpen className="me-2" /> },
    { name: 'Address', icon: <FaMapMarkerAlt className="me-2" /> },
    { name: 'Subscription', icon: <FaRedo className="me-2" /> },
    { name: 'FAQ/Contact Us', icon: <FaQuestionCircle className="me-2" /> },
    { name: 'Account Settings', icon: <FaCog className="me-2" /> },
    { name: 'Log Out', icon: <FaSignOutAlt className="me-2" /> },
  ];

  const renderContent = () => {
    switch (selectedTab) {
      case 'Orders':
        return <UserOrders />
      case 'Address':
        return <Address />
      case 'Subscription':
        return <h3 className="fw-bold">Your Subscription</h3>;
      case 'FAQ/Contact Us':
        return <ContactUs />;
      case 'Account Settings':
        return <AccountDetails />;
      case 'Log Out':
        localStorage.clear();
        window.location.href = "/login";
        return <h3 className="fw-bold">Logging Out...</h3>;
      default:
        return null;
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={3} className="bg-light p-4">
          {/* <h4 className="text-center">Welcome, {user?.name || `Please Sign Up `}!</h4> */}
          <div className="user">
            <h4>Welcome, {user?.name || <span>Please Sign Up <br></br> <Link to="/register" className="btn fw-bold sign-but">Sign Up</Link></span>} 🐾</h4>
          </div>
          <ListGroup variant="flush">
            {menuItems.map((item) => (
              <ListGroup.Item
                key={item.name}
                active={selectedTab === item.name}
                onClick={() => setSelectedTab(item.name)}
              >
                {item.icon} {item.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={9} className="p-4">{renderContent()}</Col>
      </Row>
    </Container>
  );
};

export default UserDashboard;