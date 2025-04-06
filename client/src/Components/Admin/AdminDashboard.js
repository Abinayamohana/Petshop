import React, { useState } from 'react'
import { Container, ListGroup, Row, Col } from 'react-bootstrap'
import AdminUsers from './AdminUsers';
import AddDogChew from './DogChew/AddDogChew';
import AdminProductList from './DogChew/AdminProductList';
import AddInteractiveToy from './InteractiveToy/AddInteractiveToy';
import AdminOrders from './AdminOrders';

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("User Details");

  const menuItems = [
    { name: 'User Details'},
    { name: 'Add Dogchew products'},
    { name: 'Add Interactive Toy'},
    { name: 'Product List'},
    { name: 'Orders Details'}, 
    { name: 'Log Out'}   
  ];

  const renderContent = () => {
    switch (selectedTab) {
      case 'User Details':
        return <AdminUsers />
      case 'Add Dogchew products':
        return <AddDogChew />
      case 'Add Interactive Toy':
        return <AddInteractiveToy />
      case 'Product List':
        return <AdminProductList />
      case 'Orders Details':
        return <AdminOrders />
      case 'Log Out':
        localStorage.clear();
        window.location.href = '/login';
        return <h3 className='fw-bold'>Logging Out...</h3>
      default:
        return null;
    }
  }
  return (
    <Container fluid >
      <Row>
        <Col md={3} className="bg-light p-4">
        <ListGroup variant = "flush">
          {menuItems.map((item) => (
            <ListGroup.Item
               key = {item.name}
               active = {selectedTab === item.name }
               onClick={()=> setSelectedTab(item.name)}
            >
              {item.name}
            </ListGroup.Item>
          ))} 
        </ListGroup>
        </Col>
        <Col md={9} className ='p-4'>{renderContent()}</Col>
      </Row>

    </Container>
  )
}

export default AdminDashboard