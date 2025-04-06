import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';


const ProductForm = ({ initialData, onSubmit}) => {
  const [product, setProduct] = useState({
    price: "",
    discount: "",
    mrp: "",
    size: "",
    image: null,
    previewImage: "",
  });

  useEffect(() => {
    if (initialData) {
      setProduct({
        ...initialData,
        previewImage: initialData.image ?  `http://localhost:5000${initialData.image}` : "",
      });
    }
  },[initialData]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setProduct({
        ...product,
        image: e.target.files[0],
        previewImage: URL.createObjectURL(e.target.files[0]),
      });
    } else {
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("discount", product.discount);
    formData.append("mrp", product.mrp);
    formData.append("size", product.size);
    formData.append("total_products", product.total_products)
    if (product.image) {
      formData.append("image", product.image);
    }
    window.location.reload();

    onSubmit(formData);
  };

  return (
    <div>
    <Form onSubmit={handleSubmit}>
      <div className='m-4'>
      <Row>
        <Col>
        Product Name : <Form.Control type="text" name="name" value={product.name} placeholder="Name" onChange={handleChange} required />
        </Col>
        <Col>
        Upload Image : <Form.Control type="file" name="image" accept="image/*"  placeholder="Image" onChange={handleChange} />
        </Col>
      </Row><br></br>

      <Row>
        <Col>
        Price : <Form.Control type="number" name="price" value={product.price} placeholder="Price" onChange={handleChange} required />
        </Col>
        <Col>
        Discount : <Form.Control type="text" name="discount" value={product.discount} placeholder="Discount" onChange={handleChange} />
        </Col>
        <Col>
        MRP : <Form.Control type="number" name="mrp" value={product.mrp} placeholder="MRP" onChange={handleChange} />
        </Col>
        <Col>
        Size : <Form.Control type="text" name="size" value={product.size} placeholder="Size" onChange={handleChange} required />
        </Col>
        <Col>
        Total products : <Form.Control type="number" name="total_products" value={product.total_products} placeholder="Total products" onChange={handleChange} required />
        </Col>
      </Row>


      
      </div>
     
          {/* Product Name : <input type="text" name="name" value={product.name} placeholder="Name" onChange={handleChange} required /> */}
        
        
          {/* Price : <input type="number" name="price" value={product.price} placeholder="Price" onChange={handleChange} required />
         
          Discount : <input type="text" name="discount" value={product.discount} placeholder="Discount" onChange={handleChange} />
          
          MRP : <input type="number" name="mrp" value={product.mrp} placeholder="MRP" onChange={handleChange} required />
        
      Size : <input type="text" name="size" value={product.size} placeholder="Size" onChange={handleChange} required />

      Upload Image : <input type="file" name="image" accept="image/*"  placeholder="Image" onChange={handleChange} />
      {product.previewImage && <img src={product.previewImage} alt="Product" width="100" />} */}
      <Button type="submit" className='btn-submit'>Submit</Button>
      
      
    </Form>

      

    </div>
  )
}

export default ProductForm