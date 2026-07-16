import express from 'express';
import cors from 'cors';
import productsRouter from './routes/products.js';
import vendorsRouter from './routes/vendors.js';
import purchaseOrdersRouter from './routes/purchaseOrders.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productsRouter);
app.use('/api/vendors', vendorsRouter);
app.use('/api/purchase-orders', purchaseOrdersRouter);

app.get('/', (req, res) => {
  res.send('SimpleGrid ERP Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
