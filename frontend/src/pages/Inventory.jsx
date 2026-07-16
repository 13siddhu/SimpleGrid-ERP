import React, { useState, useEffect } from 'react';
import apiClient, { extractError } from '../api/client';
import ErrorBanner from '../components/ErrorBanner';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get('/products');
        setProducts(response.data);
      } catch (err) {
        setError(extractError(err));
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="p-8 text-center text-slate-500 font-medium">Loading inventory...</div>;

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-900">Current Inventory</h1>
      </div>
      
      <ErrorBanner message={error} onClear={() => setError(null)} />

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Product Name</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">SKU / ID</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Current Stock</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Default Price</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50 transition">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900">{p.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-mono">{p.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-emerald-600">{p.stock}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">${p.defaultPrice}</td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-slate-500">No products found in the database.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
