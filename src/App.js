import React, { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';
import UserDashboard from './pages/UserDashboard';

function App() {
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || '');

  useEffect(() => {
    if (userRole) {
      localStorage.setItem('userRole', userRole);
    } else {
      localStorage.removeItem('userRole');
    }
  }, [userRole]);

  return (
    <Router>
      <Routes>
        {/* Login page */}
        <Route path="/login" element={<LoginPage setUserRole={setUserRole} />} />

        {/* Redirect root to appropriate dashboard if logged in */}
        <Route
          path="/"
          element={
            userRole
              ? userRole === 'admin'
                ? <Navigate to="/AdminDashboard" replace />
                : <Navigate to="/UserDashboard" replace />
              : <Navigate to="/login" replace />
          }
        />

        {/* Admin dashboard */}
        <Route
          path="/AdminDashboard"
          element={userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/login" replace />}
        />

        {/* User dashboard */}
        <Route
          path="/UserDashboard"
          element={userRole === 'user' ? <UserDashboard /> : <Navigate to="/login" replace />}
        />

        {/* Fallback for unmatched routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
