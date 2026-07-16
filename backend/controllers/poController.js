import { db, generateId } from '../database/memoryDb.js';

export const listPurchaseOrders = (req, res) => {
  const poList = Array.from(db.purchaseOrders.values());
  return res.json(poList);
};

export const getPurchaseOrderById = (req, res) => {
  const { id } = req.params;
  const po = db.purchaseOrders.get(id);
  
  if (!po) {
    return res.status(404).json({ error: `Purchase Order [${id}] not found in database.` });
  }
  
  return res.json(po);
};

export const createPurchaseOrder = (req, res) => {
  const { vendorId, lineItems } = req.body;
  
  if (!vendorId || !Array.isArray(lineItems) || lineItems.length === 0) {
    return res.status(400).json({ error: 'Payload must include a valid vendorId and a non-empty lineItems array.' });
  }

  if (!db.vendors.has(vendorId)) {
    return res.status(400).json({ error: 'The provided vendorId does not exist.' });
  }

  let totalAmount = 0;
  const processedItems = [];

  for (const item of lineItems) {
    const { productId, qty, unitPrice } = item;
    
    if (!productId || typeof qty !== 'number' || qty <= 0 || typeof unitPrice !== 'number' || unitPrice < 0) {
      return res.status(400).json({ error: 'All line items must contain a valid productId, positive qty, and positive unitPrice.' });
    }
    
    if (!db.products.has(productId)) {
      return res.status(400).json({ error: `Product ID [${productId}] is invalid.` });
    }

    totalAmount += (qty * unitPrice);
    processedItems.push({ productId, qty, unitPrice });
  }

  const newPO = {
    id: generateId('po'),
    vendorId,
    status: 'draft',
    lineItems: processedItems,
    total: totalAmount
  };

  db.purchaseOrders.set(newPO.id, newPO);
  return res.status(201).json(newPO);
};

export const approvePurchaseOrder = (req, res) => {
  const { id } = req.params;
  const po = db.purchaseOrders.get(id);
  
  if (!po) return res.status(404).json({ error: 'Purchase Order not found' });

  if (po.status !== 'draft') {
    return res.status(400).json({ error: `State transition error: Cannot approve a PO currently in '${po.status}' state.` });
  }

  const APPROVAL_THRESHOLD = 500;
  const isManager = req.query.role === 'manager';

  if (po.total > APPROVAL_THRESHOLD && !isManager) {
    return res.status(403).json({ 
      error: `Manager override required for POs exceeding $${APPROVAL_THRESHOLD}. Please append ?role=manager to the request.` 
    });
  }

  po.status = 'approved';
  db.purchaseOrders.set(po.id, po);
  return res.json(po);
};

export const receivePurchaseOrder = (req, res) => {
  const { id } = req.params;
  const po = db.purchaseOrders.get(id);
  
  if (!po) return res.status(404).json({ error: 'Purchase Order not found' });

  if (po.status !== 'approved') {
    return res.status(400).json({ error: `State transition error: Only 'approved' POs can be received. Current state is '${po.status}'.` });
  }

  // Update inventory
  for (const item of po.lineItems) {
    const product = db.products.get(item.productId);
    if (product) {
      product.stock += item.qty;
      db.products.set(product.id, product);
    }
  }

  po.status = 'received';
  db.purchaseOrders.set(po.id, po);
  return res.json(po);
};
