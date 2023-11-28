const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// AWS configuration
AWS.config.update({ region: 'us-east-1' });

// DynamoDB
const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Endpoint for placing an order
app.post('/api/order/cart', async (req, res) => {
  try {
    // Extract request payload
    const { customerId, items } = req.body;

    // Calculate total amount
    const totalAmount = calculateTotalAmount(items);

    // Generate order ID
    const orderId = `ORDER-${Date.now()}`;

    // Save order details to DynamoDB
    const orderParams = {
      TableName: 'OrdersTable',
      Item: {
        orderId,
        customerId,
        items,
        tax,
        subTotalAmount,
        totalAmount,
        status: 'pending',
      },
    };

    await dynamoDB.put(orderParams).promise();
    
    // Respond with the order details
    res.status(201).json({
      orderId,
      tax,
      subTotalAmount,
      totalAmount,
      status: 'pending',
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

function calculateTotalAmount(items) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}
