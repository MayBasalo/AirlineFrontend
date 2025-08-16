import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/LoginPage.css';

const LoginPage = ({ setUserRole }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, redirect automatically
    const role = localStorage.getItem('userRole');
    if (role) {
      navigate(role === 'admin' ? '/AdminDashboard' : '/UserDashboard', { replace: true });
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === 'user' && password === 'user') {
      localStorage.setItem('userRole', 'user');
      setUserRole('user');
      navigate('/UserDashboard', { replace: true });
    } else if (username === 'admin' && password === 'admin') {
      localStorage.setItem('userRole', 'admin');
      setUserRole('admin');
      navigate('/AdminDashboard', { replace: true });
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Username</label>
          <input
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
