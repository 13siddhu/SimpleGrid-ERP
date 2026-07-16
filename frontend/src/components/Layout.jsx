import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-slate-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex-shrink-0 font-bold text-xl tracking-tight text-blue-400">
                SimpleGrid ERP
              </div>
              <div className="flex space-x-4">
                <NavLink 
                  to="/" 
                  className={({isActive}) => isActive ? "bg-slate-800 px-3 py-2 rounded-md text-sm font-medium" : "hover:bg-slate-700 px-3 py-2 rounded-md text-sm font-medium transition"}
                >
                  Inventory
                </NavLink>
                <NavLink 
                  to="/purchase-orders" 
                  className={({isActive}) => isActive ? "bg-slate-800 px-3 py-2 rounded-md text-sm font-medium" : "hover:bg-slate-700 px-3 py-2 rounded-md text-sm font-medium transition"}
                >
                  Purchase Orders
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
