# OrderFlowAPI

**REST API design**

## Cart Service:

Endpoint: Post /api/order/cart.json

Example request:
```
{
 "customerId": "8080",
  "items": [
    {"productId": "1234", "quantity": 2},
    {"productId": "2345", "quantity": 1}
  ]
}
```

Example response:
```
{
  "cartId": "456",
  "tax":36.0,
  "subTotalAmount": 164.0,
  "totalAmount": 200.0
}
```


## Billing Service:

Event: InvoiceCreated
Action: The backend issues an invoice

Endpoint: Post /api/order/invoice.json

Example request:
```
{
   "customerId": "8080",
   "cartId": "456",
   "tax":36.0,
   "subTotalAmount": 164.0,
   "totalAmount": 200.0,
    "items": [
      {"productId": "1", "quantity": 2, "price":50},
      {"productId": "2", "quantity": 1, "price":100}
     ],
    "name":"Lital Hay",
    "phone":"0545870006",
    "shipping_address":"17 boulevard, 123 apt 6 Brooklyn NY"
}
```

Example response:
```
{
  "invoiceId": "789",
  "cartId": "456",
  "customerId": "8080",
  "totalAmount": 200.0
}
```

## Payment Service
Event: PaymentProcessed
Action: The backend bills the customer using pre-approved 3rd party billing partner (e.g. stripe / PayPal / etc.)

Endpoint: Post /api/order/payment.json

Example request:
```
{
   "customerId": "8080",
   "invoiceId": "789",
   "totalAmount": 200.0
}
```

Example response:
```
{
  "transactionId": 1071573807,
  "credit_card": {
      "first_name": "Bob",
      "last_name": "Norman",
      "first_digits": "424242",
      "last_digits": "4242",
      "brand": "visa",
      "expiry_month": 9,
      "expiry_year": 2024,
      "customer_id": 8080
    },
    "payment": {
      "completed_at": 2023-10-12T07:05:27-04:00,
      "created_at": "2023-10-12T07:05:27-04:00",
      "currency": "USD",
      "presentment_currency": "USD",
      "customer_id": 8080,
      "amount": "200.0"
    }
}
```


## Shipment Service:

Event: OrderShipped
Action: Ships the goods and provides a tracking number.

Endpoint: Post /api/order/shipping.json

Example request:
```
{
   "cartId": "456",
   "name":"Lital Hay",
   "phone":"0545870006",
   "shipping_address":"17 boulevard, 123 apt 6 Brooklyn NY"
}
```

Example response:
```
{
 "tracking_number":12345678
}
```

