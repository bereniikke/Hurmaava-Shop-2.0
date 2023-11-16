// Dashboard.js
import React, { useState, useEffect } from 'react';
import './App.css';

function Dashboard() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    fetch('http://localhost:3002/orders')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched orders:', data);
  
        // Sort orders by date in descending order (newest first)
        const sortedOrders = data.sort((a, b) => new Date(b.date) - new Date(a.date));
  
        setOrders(sortedOrders);
      })
      .catch(error => console.error('Error fetching orders:', error));
  };
  

  useEffect(() => {
    // Fetch orders initially
    fetchOrders();

    // Fetch orders every 5 seconds (adjust as needed)
    const intervalId = setInterval(fetchOrders, 600000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>
      <h2>Tilaukset:</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Pvm</th>
            <th>Puhnro</th>
            <th>Email</th>
            <th>Tuote</th>
            <th>Kangas</th>
            <th>Yhteishinta</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{new Date(order.date).toLocaleDateString()}</td>
              <td>{order.phoneNumber}</td>
              <td>{order.email}</td>
              <td>{order.productType}</td>
              <td>{order.fabric}</td>
              <td>{order.totalCost}</td>
              <td>{order.done ? 'Done' : 'Pending'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
