# SimpleGrid ERP – Purchase Orders & Inventory

A simple ERP-style application built to manage Purchase Orders and track inventory updates. Users can create, approve, and receive purchase orders while ensuring valid state transitions throughout the workflow.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, React Router
- **Backend:** Node.js, Express.js
- **Database:** In-memory JavaScript Maps

## Running the Project

### Backend

```bash
cd backend
npm install
npm run dev
```

Runs on: `http://localhost:3001`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on: `http://localhost:5173`

## Project Structure

```text
simplegrid-erp-task/
│
├── API_TESTING.md                 # cURL commands for manual testing
├── README.md                      
│
├── backend/
│   ├── server.js                  # Entry point for Express API
│   ├── database/
│   │   └── memoryDb.js            # In-memory Map datastore & dummy data
│   ├── controllers/
│   │   ├── inventoryController.js # Handles product & vendor logic
│   │   └── poController.js        # Core PO business rules & state validation
│   └── routes/
│       ├── products.js            # Express routing for products
│       ├── vendors.js             # Express routing for vendors
│       └── purchaseOrders.js      # Express routing for POs
│
└── frontend/
    ├── index.html
    ├── tailwind.config.js         # Tailwind v4 configuration
    ├── postcss.config.js
    └── src/
        ├── App.jsx                # React Router setup
        ├── main.jsx               # React DOM entry point
        ├── index.css              # Tailwind imports
        ├── api/
        │   └── client.js          # Axios centralized API client & error extractor
        ├── components/
        │   ├── Layout.jsx         # App navigation shell
        │   └── ErrorBanner.jsx    # Reusable component for backend 4xx errors
        └── pages/
            ├── Inventory.jsx      # UI for viewing product stock
            ├── PurchaseOrders.jsx # UI for listing POs & approving/receiving
            └── CreatePO.jsx       # Form for creating new Purchase Orders
```

## Design Decisions

- Used a **controller-based architecture** to keep routes clean and business logic organized.
- Chose JavaScript **Map objects** for the in-memory database because they provide faster lookups than arrays.
- Created a centralized API layer on the frontend for cleaner API handling and better error management.
- Added validation for Purchase Order state transitions to prevent invalid actions such as receiving a draft PO.

## AI Usage

AI tools were used mainly to speed up frontend scaffolding and UI development. The core backend logic, API design, state validation, and inventory update workflows were implemented and reviewed manually.

## API Testing

For manual endpoint validation without the UI, please refer to the [`API_TESTING.md`](./API_TESTING.md) file included in the root of this repository. It contains a complete list of ready-to-use `cURL` commands to test the entire lifecycle of a Purchase Order.

## Notes

Since the application uses an in-memory database, all data is reset whenever the backend server restarts. In a production environment, this would be replaced with a persistent database such as PostgreSQL.
```