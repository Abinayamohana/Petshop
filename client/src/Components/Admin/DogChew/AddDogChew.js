// import React, { useState } from "react";
// import axios from "axios";

// const AddDogChew = () => {
//   const [product, setProduct] = useState({
//     name: "",
//     price: "",
//     discount: "",
//     mrp: "",
//     size: "",
//     image: null,
//   });

//   const handleChange = (e) => {
//     if (e.target.name === "image") {
//       setProduct({ ...product, image: e.target.files[0] });
//     } else {
//       setProduct({ ...product, [e.target.name]: e.target.value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("name", product.name);
//     formData.append("price", product.price);
//     formData.append("discount", product.discount);
//     formData.append("mrp", product.mrp);
//     formData.append("size", product.size);
//     formData.append("image", product.image);

//     try {
//       const res = await axios.post("http://localhost:5000/api/products", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       alert("Product added successfully!");
//     } catch (error) {
//       console.error("Error adding product:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Add Product</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
//         <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
//         <input type="text" name="discount" placeholder="Discount" onChange={handleChange} />
//         <input type="number" name="mrp" placeholder="MRP" onChange={handleChange} required />
//         <input type="text" name="size" placeholder="Size" onChange={handleChange} required />
//         <input type="file" name="image" accept="image/*" onChange={handleChange} required />
//         <button type="submit">Add Product</button>
//       </form>
//     </div>
//   );
// };
// export default AddDogChew

import React, { useState } from 'react';
import axios from 'axios';
import ProductForm  from '../ProductForm';

const AddDogChew = () => {

  const handleSubmit = async (formData) => {
    try {
      await axios.post("http://localhost:5000/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product added successfully");
    }
    catch(error){
      console.error("Error Adding Product :", error);

    }
  };

  return (
    <div>
      <h2>Add Chew Toy</h2>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  )
}

export default AddDogChew