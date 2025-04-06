import { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/admin/orders")
            .then((res) => res.json())
            .then((data) => setOrders(data))
            .catch((error) => console.error("Error fetching orders:", error));
    }, []);

    return (
        <div className="mt-4">
            <h2 className="text-center mb-4">All Orders</h2>
            {orders.length === 0 ? (
                <p className="text-center text-danger">No orders found</p>
            ) : (
                <Table striped bordered hover responsive>
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>Order ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Items</th>
                            <th>Total Price (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.order_id}>
                                <td>{order.order_id}</td>
                                <td>{order.name}</td>
                                <td>{order.email}</td>
                                <td>{order.phonenumber}</td>
                                <td>{order.address}</td>
                                <td>
                                    <ul className="list-unstyled">
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

export default AdminOrders;
