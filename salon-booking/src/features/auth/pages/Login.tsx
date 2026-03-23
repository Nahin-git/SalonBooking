import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../core/hooks/useAuth';
// import api from '../../../core/api/axios'; // Uncomment to use real API

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate an API call
      // const response = await api.post('/auth/login', { email: 'admin@salon.com', password: 'password' });
      // login(response.data.token, response.data.user);
      
      setTimeout(() => {
        // Mock successful login
        login('mock-jwt-token-12345', { id: '1', name: 'Admin User', email: 'admin@salon.com' });
        navigate(from, { replace: true });
      }, 1000);
      
    } catch (error) {
      console.error('Login failed', error);
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <h1>Salon Booking Login</h1>
      <p>Sign in to access the dashboard</p>
      
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
        <input type="email" placeholder="Email" required defaultValue="admin@salon.com" style={{ padding: '0.5rem' }} />
        <input type="password" placeholder="Password" required defaultValue="password" style={{ padding: '0.5rem' }} />
        <button type="submit" disabled={loading} style={{ padding: '0.5rem', cursor: 'pointer', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>
          {loading ? 'Logging in...' : 'Simulate Login'}
        </button>
      </form>
    </div>
  );
};
