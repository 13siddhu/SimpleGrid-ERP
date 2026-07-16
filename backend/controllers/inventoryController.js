import { db } from '../database/memoryDb.js';

export const getProducts = (req, res) => {
  // Convert Map values back to an array for the JSON response
  const productList = Array.from(db.products.values());
  return res.json(productList);
};

export const getVendors = (req, res) => {
  const vendorList = Array.from(db.vendors.values());
  return res.json(vendorList);
};
