import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, setAuthHeader } from '../utils/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/login', { username, password });
      localStorage.setItem('token', response.data.access_token); // Save token
      setAuthHeader(response.data.access_token); // Set header for all requests
      navigate('/profile');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
