import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PublicLayout } from '../layout/PublicLayout';
import { CustomerLayout } from '../layout/CustomerLayout';
// import { MainLayout } from '../layout/MainLayout';
import { AuthLayout } from '../layout/AuthLayout';
import { ProtectedRoute } from '../core/components/ProtectedRoute';

// Feature Pages
import { Login } from '../features/auth/pages/Login';
import { Register } from '../features/auth/pages/Register';
import { Dashboard } from '../features/dashboard/pages/Dashboard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />, // Redirect root to login
  },
  {
    element: <PublicLayout />,
    children: [
      {
        path: 'home',
        element: (
          <div style={{ padding: '4rem 2rem', textAlign: 'center', minHeight: '60vh' }}>
            <h1>Welcome to Salon Booking</h1>
            <p>Book your next appointment with ease.</p>
          </div>
        ),
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <CustomerLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'salon/:id',
        element: (
          <div style={{ padding: '4rem 2rem', textAlign: 'center', minHeight: '60vh' }}>
            <h2>Salon Details</h2>
            <p>This is where the salon details and booking calendar will go.</p>
            <button 
              onClick={() => window.history.back()}
              style={{ padding: '0.8rem 1.6rem', marginTop: '2rem', background: '#333', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
            >
              Go Back
            </button>
          </div>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />, // Fallback for 404
  },
]);


