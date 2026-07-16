import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Inventory from './pages/Inventory';
import PurchaseOrders from './pages/PurchaseOrders';
import CreatePO from './pages/CreatePO';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Inventory />} />
        <Route path="purchase-orders" element={<PurchaseOrders />} />
        <Route path="purchase-orders/new" element={<CreatePO />} />
      </Route>
    </Routes>
  );
}

export default App;
