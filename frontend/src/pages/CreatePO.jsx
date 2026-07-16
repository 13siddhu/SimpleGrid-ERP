import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient, { extractError } from '../api/client';
import ErrorBanner from '../components/ErrorBanner';

const CreatePO = () => {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  
  // Form State
  const [vendorId, setVendorId] = useState('');
  const [lineItems, setLineItems] = useState([{ productId: '', qty: 1, unitPrice: 0 }]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vRes, pRes] = await Promise.all([
          apiClient.get('/vendors'),
          apiClient.get('/products')
        ]);
        setVendors(vRes.data);
        setProducts(pRes.data);
      } catch (err) {
        setError(extractError(err));
      }
    };
    fetchData();
  }, []);

  const addLineItem = () => {
    setLineItems([...lineItems, { productId: '', qty: 1, unitPrice: 0 }]);
  };

  const updateLineItem = (index, field, value) => {
    const newItems = [...lineItems];
    newItems[index][field] = value;

    // Auto-fill price if product is selected
    if (field === 'productId') {
      const selectedProduct = products.find(p => p.id === value);
      if (selectedProduct) {
        newItems[index].unitPrice = selectedProduct.defaultPrice;
      }
    }

    setLineItems(newItems);
  };

  const removeLineItem = (index) => {
    setLineItems(lineItems.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      // Convert qty and price to numbers
      const payloadItems = lineItems.map(item => ({
        ...item,
        qty: Number(item.qty),
        unitPrice: Number(item.unitPrice)
      }));

      await apiClient.post('/purchase-orders', {
        vendorId,
        lineItems: payloadItems
      });
      
      navigate('/purchase-orders');
    } catch (err) {
      setError(extractError(err));
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-900">Create Purchase Order</h1>
        <button 
          onClick={() => navigate('/purchase-orders')}
          className="text-slate-500 hover:text-slate-800 font-medium"
        >
          Cancel
        </button>
      </div>

      <ErrorBanner message={error} onClear={() => setError(null)} />

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">Select Vendor</label>
          <select 
            required
            value={vendorId}
            onChange={(e) => setVendorId(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          >
            <option value="">-- Choose a vendor --</option>
            {vendors.map(v => (
              <option key={v.id} value={v.id}>{v.name} ({v.id})</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-end mb-2">
            <label className="block text-sm font-medium text-slate-700">Line Items</label>
            <button 
              type="button" 
              onClick={addLineItem}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium bg-blue-50 px-3 py-1 rounded-md"
            >
              + Add Item
            </button>
          </div>
          
          <div className="space-y-3">
            {lineItems.map((item, index) => (
              <div key={index} className="flex space-x-3 items-center bg-slate-50 p-3 rounded-lg border border-slate-200">
                <select 
                  required
                  value={item.productId}
                  onChange={(e) => updateLineItem(index, 'productId', e.target.value)}
                  className="flex-1 border border-slate-300 rounded p-2 text-sm bg-white"
                >
                  <option value="">Select product...</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
                
                <div className="w-24">
                  <input 
                    type="number" 
                    min="1" 
                    required
                    placeholder="Qty"
                    value={item.qty}
                    onChange={(e) => updateLineItem(index, 'qty', e.target.value)}
                    className="w-full border border-slate-300 rounded p-2 text-sm bg-white"
                  />
                </div>

                <div className="w-32 relative">
                  <span className="absolute left-3 top-2 text-slate-500 text-sm">$</span>
                  <input 
                    type="number" 
                    min="0" 
                    step="0.01"
                    required
                    placeholder="Price"
                    value={item.unitPrice}
                    onChange={(e) => updateLineItem(index, 'unitPrice', e.target.value)}
                    className="w-full pl-6 border border-slate-300 rounded p-2 text-sm bg-white"
                  />
                </div>

                {lineItems.length > 1 && (
                  <button 
                    type="button" 
                    onClick={() => removeLineItem(index)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-slate-200 flex justify-end">
          <button 
            type="submit"
            className="bg-blue-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-700 transition shadow-sm"
          >
            Create PO
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePO;
