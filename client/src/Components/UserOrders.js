import { useEffect, useState } from "react";
import { Table, Alert } from "react-bootstrap";

const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const user = JSON.parse(localStorage.getItem("user")); // Assuming user data is stored in localStorage

    useEffect(() => {
        if (!user || !user.id) return;

        fetch(`http://localhost:5000/api/user/orders/${user.id}`)
            .then((res) => res.json())
            .then((data) => setOrders(data))
            .catch((error) => console.error("Error fetching user orders:", error));
    }, [user]);

    return (
        <div className="mt-4">
            <h2 className="text-center mb-4">My Orders</h2>
            {orders.length === 0 ? (
                <Alert variant="danger" className="text-center">
                    No orders found
                </Alert>
            ) : (
    <Table striped bordered hover responsive>
    <thead className="bg-success text-white">
      <tr>
          <th>Order ID</th>
          <th>Items</th>
          <th>Total Price (₹)</th>
      </tr>
    </thead>
    <tbody>
      {orders.map((order) => (
      <tr key={order.order_id}>
        <td>{order.order_id}</td>
        <td>
          <ul className="list-unstyled mb-0">
            {order.items.map((item, index) => (
              <li key={index}>
                  <strong>{item.product_name}</strong> - ₹{item.price} x {item.quantity}
              </li>
            ))}
          </ul>
        </td>
        <td className="fw-bold">₹{order.total_price}</td>
      </tr>
  ))}
    </tbody>
    </Table>
)}
</div>
);
};

export default UserOrders;
