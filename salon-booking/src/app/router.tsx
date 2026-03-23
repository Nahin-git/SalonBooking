import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PublicLayout } from '../layout/PublicLayout';
import { AdminLayout } from '../layout/AdminLayout';
import { ProtectedRoute } from '../core/components/ProtectedRoute';

// Feature Pages
import { Login } from '../features/auth/pages/Login';
import { Dashboard } from '../features/dashboard/pages/Dashboard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        index: true,
        // A simple placeholder for the public home page
        element: (
          <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
            <h1>Welcome to Salon Booking</h1>
            <p>Book your next appointment with ease.</p>
          </div>
        ),
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      // You can add more protected routes here
      // { path: 'bookings', element: <Bookings /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />, // Fallback for 404
  },
]);
