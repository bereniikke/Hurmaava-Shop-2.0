// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3002',
});

export const getOrders = async (sessionId) => {
  try {
    const response = await api.get(`/orders?sessionId=${sessionId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting orders:', error);
    throw error;
  }
};

export const submitOrder = async (orderData) => {
  try {
    const response = await api.post('/submit-order', orderData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error data:', error.response.data);
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error', error.message);
    }
    throw error;
  }
};
export const getUser = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting user with ID ${userId}:`, error);
    throw error;
  }
};
