import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export const PublicLayout: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <header style={{ padding: '1rem 2rem', background: '#333', color: '#fff', display: 'flex', justifyContent: 'space-between' }}>
        <h2>Salon SaaS</h2>
        <nav>
          <Link to="/" style={{ color: '#fff', marginRight: '1rem', textDecoration: 'none' }}>Home</Link>
          <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</Link>
        </nav>
      </header>
      
      <main style={{ flex: 1, background: '#f5f5f5' }}>
        <Outlet />
      </main>
      
      <footer style={{ padding: '1rem', textAlign: 'center', background: '#222', color: '#aaa', fontSize: '0.9rem' }}>
        &copy; {new Date().getFullYear()} Salon Booking SaaS. All rights reserved.
      </footer>
    </div>
  );
};
