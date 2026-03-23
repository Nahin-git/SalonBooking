import React from 'react';
import { useAuth } from '../../../core/hooks/useAuth';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard Overview</h1>
      <p>Welcome back, {user?.name || 'User'}!</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
        <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
          <h3>Today's Bookings</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>12</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
          <h3>Active Ads</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>3</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
          <h3>Total Revenue</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>$1,250</p>
        </div>
      </div>
    </div>
  );
};
