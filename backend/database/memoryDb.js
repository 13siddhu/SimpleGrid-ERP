import crypto from 'crypto';

// Using Maps for O(1) lookup performance instead of standard arrays
export const db = {
  products: new Map(),
  vendors: new Map(),
  purchaseOrders: new Map()
};

// Seed custom data
db.products.set('prod-901', { id: 'prod-901', name: 'Industrial Steel Beam', stock: 150, defaultPrice: 200 });
db.products.set('prod-902', { id: 'prod-902', name: 'Titanium Screws (100pk)', stock: 500, defaultPrice: 45 });
db.products.set('prod-903', { id: 'prod-903', name: 'Hydraulic Press Module', stock: 12, defaultPrice: 1200 });

db.vendors.set('vend-101', { id: 'vend-101', name: 'Apex Manufacturing Co.' });
db.vendors.set('vend-102', { id: 'vend-102', name: 'Stark Industries LLC' });
db.vendors.set('vend-103', { id: 'vend-103', name: 'Global Tech Suppliers' });

// ID Generator
export const generateId = (prefix) => `${prefix}-${crypto.randomBytes(4).toString('hex')}`;
