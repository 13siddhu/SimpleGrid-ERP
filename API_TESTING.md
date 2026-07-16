# API Testing Guide

You can use the following `curl` commands to manually test the backend API endpoints. Ensure that your backend server is running (`npm run dev` in the `/backend` folder) before executing these commands.

The backend runs on `http://localhost:3001`.

---

### 1. View Inventory (Products)
Fetches the list of products and their current stock levels.
```bash
curl -X GET http://localhost:3001/api/products
```

### 2. View Vendors
Fetches the list of available vendors.
```bash
curl -X GET http://localhost:3001/api/vendors
```

### 3. Create a Purchase Order (Draft)
Creates a new PO in the "draft" status. The backend will automatically calculate the total price.
```bash
curl -X POST http://localhost:3001/api/purchase-orders \
  -H "Content-Type: application/json" \
  -d '{
    "vendorId": "vend-101",
    "lineItems": [
      {
        "productId": "prod-901",
        "qty": 10,
        "unitPrice": 200
      }
    ]
  }'
```
*(Note: Keep track of the returned `id`, e.g., `po-1234abcd`, for the next commands.)*

### 4. View All Purchase Orders
Fetches the list of all created purchase orders.
```bash
curl -X GET http://localhost:3001/api/purchase-orders
```

### 5. View a Specific Purchase Order
Replace `po-1234abcd` with the actual ID returned from Step 3.
```bash
curl -X GET http://localhost:3001/api/purchase-orders/po-1234abcd
```

### 6. Approve the Purchase Order
Moves the PO from "draft" to "approved". 
*Note: Since the total for the PO above is $2,000 (which is > $500), it requires the `?role=manager` flag to succeed.*
```bash
curl -X POST "http://localhost:3001/api/purchase-orders/po-1234abcd/approve?role=manager"
```

### 7. Receive the Purchase Order
Moves the PO from "approved" to "received" and automatically increases the product's inventory stock.
```bash
curl -X POST http://localhost:3001/api/purchase-orders/po-1234abcd/receive
```

### 8. Verify Inventory Increased
Run the products command again to verify that `prod-901`'s stock has increased by 10.
```bash
curl -X GET http://localhost:3001/api/products
```
