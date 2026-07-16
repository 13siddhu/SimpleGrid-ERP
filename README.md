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

## Design Decisions

- Used a **controller-based architecture** to keep routes clean and business logic organized.
- Chose JavaScript **Map objects** for the in-memory database because they provide faster lookups than arrays.
- Created a centralized API layer on the frontend for cleaner API handling and better error management.
- Added validation for Purchase Order state transitions to prevent invalid actions such as receiving a draft PO.

## AI Usage

AI tools were used mainly to speed up frontend scaffolding and UI development. The core backend logic, API design, state validation, and inventory update workflows were implemented and reviewed manually.

## Notes

Since the application uses an in-memory database, all data is reset whenever the backend server restarts. In a production environment, this would be replaced with a persistent database such as PostgreSQL.
```