import React from 'react';
import axios from 'axios';
import ProductForm from '../ProductForm';

const AddInteractiveToy = () => {
  const handleSubmit = async (formData) => {
    try {
      await axios.post("http://localhost:5000/api/interactive_toy", formData, {
        headers: {"Content-Type":"multipart/form-data"},
      });
      alert("Product added successfully");
    }
    catch(error){
      console.error("Error Adding Product :", error);      
    }
  };
  return (
    <div>
      <h2>Add interactive Toy</h2>
      <ProductForm onSubmit={handleSubmit} />

    </div>
  )
}

export default AddInteractiveToy