import React, { useState, useEffect } from 'react';
import { getOrders } from './api';

function ThankYou() {
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    // Fetch orders when the component mounts
    const fetchOrders = async () => {
      try {
        const ordersData = await getOrders();
        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts

  return (
    <div>
      <h1>Kiitos tilauksestanne!</h1>
      
      {/* Display order information for each order */}
      {orders.map((order, index) => (
        <div key={index} className="thankyou-container">
          <h2>Tilauksenne:</h2>
          <p>Tuote: {order.productType}</p>
          <p>Kangas: {order.fabric}</p>
          <p>Yhteishinta: {order.totalCost} €</p>
          <br />

          <h2>Laskutustiedot:</h2>
          <p>Puh: {order.phoneNumber}</p>
          <p>Email: {order.email}</p>
        </div>
      ))}

      <div className="payment-info-container">
        {/* Your existing thank you information */}
      </div>

      <footer>
        <p>&copy; Hurmaava Design Studio</p>
      </footer>
    </div>
  );
}

export default ThankYou;
