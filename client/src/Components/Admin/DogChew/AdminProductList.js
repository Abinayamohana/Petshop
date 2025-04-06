import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



const AdminProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        setProducts(products.filter((product) => product.id !== id));
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div className="d-flex flex-wrap justify-content-around overflow-auto px-3">
      <h2>Admin Chew Toy Product List</h2>
      <table style={{ border: "1px solid black", borderCollapse: "collapse", width: "100%"}}>
        <thead style={{textAlign:"center"}}>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Price</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Discount</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>MRP</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Size</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Image</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Total Products</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td style={{ border: "1px solid black", padding: "8px" }}>{product.name}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{product.price}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{product.discount}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{product.mrp}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{product.size}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                <img src={`http://localhost:5000${product.image}`} alt={product.name} width="50" />
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{product.total_products}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
              <Link to={`/admin/edit-product/${product.id}`} className="btn-action1">Update</Link>

                <button onClick={() => handleDelete(product.id)} 
                  className="btn-action2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductList;
