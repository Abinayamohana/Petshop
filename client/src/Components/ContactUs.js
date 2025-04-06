import React from 'react'
import {Container, Row, Col, Card } from 'react-bootstrap';
import { ArrowRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Phone from '../icons/phone.svg';
import Email from '../icons/email.svg';
import Arrow from '../icons/arrow-up-right.svg';
import truck from '../icons/truck.gif'
import return_order from '../icons/return.gif'
const quickLinks = [
  {
    link: "/Delivery",
    icon: truck,
    title: "Track order",
    description : "View the status of your order "
  },
  {
    link: "/",
    icon : return_order,
    title : "Return order",
    description : "Return and view the items in your order"
  }
]
function ContactUs() {
  return (
    <div>
      <Container>   
        <h3 className='mt-5 mb-4'>Contact Us</h3> 
        <h5 className='fw-bold'>Quick links</h5>             
        <Row className='justify-content-center'>
          {quickLinks.map((item, index) => 
          <Col key={index} md = {6} sm={12} xs ={12} className='mb-3' >            
            <Card className='shadow-sm p-3 border-0 rounded-3 flex align-items-center' >
            
              <div className='d-flex align-items-center w-100' >
                <div className='me-3 fs-3'>
                <img src={item.icon} className='contact-img' />
                </div>
                <div className='flex-grow-1'>
                  <h6 className='fw-bold mb-1'>{item.title}</h6>
                  <p className='text-muted small mb-0'>{item.description}</p>
                </div>
                <Link
                  to={item.link}
                  key={index}
                  
                >
                <ArrowRight className='text-primary fs-4' />
                </Link>
              </div>              
            </Card>            
          </Col>
          )}

        </Row> <br></br>

{/* //get in touch */}
  <h5 className='fw-bold'>Get in touch</h5> 
  <p>If you have any inquiries, feel free to</p>
  {/* Call */}
    <div className='shadow-sm p-3 border-0 rounded-3 d-flex align-items-center'>
      <div className='d-flex align-items-center w-100'>
        <div className='me-3 fs-5'>
        <img src={Phone}
          alt='Navigate'
          
        />
        </div>
        <div className='flex-grow-1'>
        <p className='mb-0'>Call us at <span className='fw-bold'>9942403895</span> </p>
        </div>
        <img src={Arrow}
          alt='Navigate'
          className="text-success fs-4"
        />
      </div>
    </div>

    {/* email */}
    
    <div className='shadow-sm p-3 border-0 rounded-3 d-flex align-items-center'>
    
      <div className='d-flex align-items-center w-100'>
        <div className='me-3 fs-5'>
        <img src={Email}
          alt='Navigate'
          
        />
        </div>
        <div className='flex-grow-1'>
        <p className='mb-0'>Email us at <span className='fw-bold'><a href='https://mail.google.com/' >abinayamohana18@gmail.com</a></span> </p>
        </div>
        <a href='https://mail.google.com/' className='txt-decor'>
        <img src={Arrow}
          alt='Navigate'
          className="text-success fs-4"
        /> </a>
      </div>
    </div>
   </Container>

  </div>
  )
}

export default ContactUs