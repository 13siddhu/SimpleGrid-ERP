import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient, { extractError } from '../api/client';
import ErrorBanner from '../components/ErrorBanner';

const PurchaseOrders = () => {
  const navigate = useNavigate();
  const [pos, setPos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPOs = async () => {
    try {
      const response = await apiClient.get('/purchase-orders');
      // Sort to show newest first
      setPos(response.data.reverse());
    } catch (err) {
      setError(extractError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPOs();
  }, []);

  const handleApprove = async (id, asManager = false) => {
    setError(null);
    try {
      const url = asManager ? `/purchase-orders/${id}/approve?role=manager` : `/purchase-orders/${id}/approve`;
      await apiClient.post(url);
      fetchPOs(); // refresh list
    } catch (err) {
      setError(extractError(err));
    }
  };

  const handleReceive = async (id) => {
    setError(null);
    try {
      await apiClient.post(`/purchase-orders/${id}/receive`);
      fetchPOs();
    } catch (err) {
      setError(extractError(err));
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'draft': return <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full uppercase">Draft</span>;
      case 'approved': return <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full uppercase">Approved</span>;
      case 'received': return <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full uppercase">Received</span>;
      default: return null;
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500 font-medium">Loading POs...</div>;

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-900">Purchase Orders</h1>
        <button 
          onClick={() => navigate('/purchase-orders/new')}
          className="bg-slate-900 hover:bg-slate-800 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition"
        >
          + New PO
        </button>
      </div>

      <ErrorBanner message={error} onClear={() => setError(null)} />

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">PO ID</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Vendor</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {pos.map((po) => (
              <tr key={po.id} className="hover:bg-slate-50 transition">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-medium text-slate-900">{po.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{po.vendorId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900">${po.total.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{getStatusBadge(po.status)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2 flex justify-end">
                  {po.status === 'draft' && (
                    <>
                      <button onClick={() => handleApprove(po.id, false)} className="text-blue-600 hover:text-blue-900 bg-blue-50 px-3 py-1 rounded">Approve</button>
                      <button onClick={() => handleApprove(po.id, true)} className="text-purple-600 hover:text-purple-900 bg-purple-50 px-3 py-1 rounded">Approve (Mgr)</button>
                    </>
                  )}
                  {po.status === 'approved' && (
                    <button onClick={() => handleReceive(po.id)} className="text-emerald-600 hover:text-emerald-900 bg-emerald-50 px-3 py-1 rounded">Receive Goods</button>
                  )}
                  {po.status === 'received' && (
                    <span className="text-slate-400 italic text-xs pt-1">Complete</span>
                  )}
                </td>
              </tr>
            ))}
            {pos.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-slate-500">No purchase orders found. Create one to get started!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseOrders;
