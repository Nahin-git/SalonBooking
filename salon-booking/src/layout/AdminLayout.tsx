import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../core/hooks/useAuth';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <aside style={{ width: '250px', background: '#2c3e50', color: '#ecf0f1', padding: '2rem 1rem' }}>
        <h2>Admin Panel</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
          <Link to="/dashboard" style={{ color: '#ecf0f1', textDecoration: 'none' }}>Dashboard</Link>
          {/* Add more links here like Bookings, Customers, Settings */}
        </nav>
      </aside>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ padding: '1rem 2rem', background: '#fff', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>Hello, {user?.name || 'Admin'}</span>
            <button 
              onClick={handleLogout}
              style={{ padding: '0.4rem 0.8rem', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Logout
            </button>
          </div>
        </header>

        <main style={{ flex: 1, padding: '2rem', background: '#ecf0f1' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
