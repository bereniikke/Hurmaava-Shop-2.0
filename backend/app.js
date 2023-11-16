const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const env = require('../env');
const Order = require('./models/orders');

const mongodbUri = env.MONGODB_URI;

mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
const port = 3002;

app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use(express.json());

app.use(express.static('../frontend/public'));

app.get('/orders', async (req, res) => {
  try {
    const db = mongoose.connection;
    const currentSessionId = req.query.sessionId;
    console.log('Received sessionId:', currentSessionId);

    let orders;

    if (currentSessionId) {
      // If a session ID is provided, fetch orders for that session
      orders = await Order.find({ sessionId: currentSessionId });
    } else {
      // If no session ID is provided, fetch all orders
      orders = await Order.find();
    }

    console.log('Fetched orders:', orders);

    res.status(200).json(orders.map(order => ({ ...order.toObject(), done: order.done || false })));
    //                                           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not fetch the documents' });
  }
});


function calculateProductPrice(productType) {
  const productPrices = {
    takki: 100,  
    liivi: 65,  
  };

  return productPrices[productType] || 0;
}

function calculateFabricPrice(fabric) {
  const fabricPrices = {
    'pinkit kukat': 10,  
    'värikäs': 15,  
    'keltainen': 12,  
    'oma kangas': 0,  
  };

  return fabricPrices[fabric] || 0;
}

app.post(
  '/submit-order',
  [
    body('productType').notEmpty(),
    body('fabric').notEmpty(),
    body('phoneNumber').notEmpty(),
    body('email').notEmpty().isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { productType, fabric, phoneNumber, email } = req.body;

      const productPrice = calculateProductPrice(productType);
      const fabricPrice = calculateFabricPrice(fabric);
      const shippingCost = 6.90;
      const totalCost = productPrice + fabricPrice + shippingCost;

      const { sessionId } = req.body;

      const newOrder = new Order({
        productType,
        fabric,
        phoneNumber,
        email,
        totalCost,
        date: Date.now(),
        sessionId,
        done: false,
      });

      const savedOrder = await newOrder.save();

      const orderDetails = {
        productType: savedOrder.productType,
        fabric: savedOrder.fabric,
        phoneNumber: savedOrder.phoneNumber,
        email: savedOrder.email,
        totalCost,
        done: savedOrder.done,
      };

      res.status(201).json({ order: orderDetails, message: 'Order submitted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Could not save the order' });
    }
  }
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
