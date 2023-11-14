import React, { useEffect, useState } from 'react';
import { getOrders } from './api';

function ThankYou() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const sessionId = urlSearchParams.get('sessionId');

        if (!sessionId) {
          // Handle the case where sessionId is missing
          console.error('Session ID is missing');
          return;
        }

        const fetchedOrders = await getOrders(sessionId);
        setOrders(fetchedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      {loading ? (
        <p>Ladataan tilausta...</p>
      ) : (
        <div className="thankyou-container">
          <div className="order-info-container">
            <h1>Kiitos tilauksestanne!</h1>
            <ul>
              {orders.map((order) => (
                <li key={order._id}>
                  <h2>Tilauksen tiedot:</h2>
                  <p>Tuote: {order.productType}</p>
                  <p>Kangas: {order.fabric}</p>
                  <p>Yhteishinta: {order.totalCost} €</p>
                  <br />
                  <h2>Laskutustiedot:</h2>
                  <p>Puhelinnumero: {order.phoneNumber}</p>
                  <p>Email: {order.email}</p>
                </li>
              ))}
            </ul>
          </div>
  
          <br />
  
          <div className="payment-info-container">
            <h1>Ohjeet maksua varten:</h1>
            <p>Seuratkaa sähköpostianne. Maksuohjeet lähetetään teille seuraavana arkipäivänä.</p>
            <p>Jos maksuohjeita ei kuulu, tarkistattehan myös roskapostilaatikkonne.</p>
            <p>Ottakaa tarvittaessa meihin yhteyttä sivun ylälaidasta löytyvän "Ota yhteyttä" napin kautta.</p>
            <p>Maksun suoritettuanne, ryhdymme oitis valmistamaan Hurmaavaa vaatettanne. Valmistuksessa menee 1-2 viikkoa.</p>
            <p>Lähetämme teille sähköpostilla postin seurantakoodin, kun Hurmaava vaatteenne on postitettu.</p>
            <h1>Kiitos, kun tuet pienyrittäjää! &#9829;</h1>
          </div>
        </div>
      )}
    </div>
  );
  
       
}

export default ThankYou;
