import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError('');

    try {
      const response = await api.post(
        '/auth/login',
        formData
      );

      login(response.data.token);

      navigate('/dashboard');

    } catch (error) {
      setError(
        error.response?.data?.message ||
        'Login failed'
      );
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit">
          Login
        </button>
      </form>

      {error && <p>{error}</p>}

      <Link to="/register">
        Create Account
      </Link>
    </div>
  );
};

export default Login;