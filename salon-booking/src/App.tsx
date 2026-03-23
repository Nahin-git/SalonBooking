import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './core/hooks/useAuth';
import { router } from './app/router';

function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </React.StrictMode>
  );
}

export default App;
