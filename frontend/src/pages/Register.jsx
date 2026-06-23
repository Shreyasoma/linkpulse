import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../services/api';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError('');
    setSuccess('');

    try {
      const response = await api.post(
        '/auth/register',
        formData
      );

      setSuccess(response.data.message);

      setTimeout(() => {
        navigate('/');
      }, 1500);

    } catch (error) {
      setError(
        error.response?.data?.message ||
        'Registration failed'
      );
    }
  };

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

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
          Register
        </button>
      </form>

      {success && <p>{success}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Register;