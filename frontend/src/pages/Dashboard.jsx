import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import '../styles/Dashboard.css';
import { useEffect, useState } from 'react';

import api from '../services/api';

const Dashboard = () => {

    const navigate = useNavigate();

  const { logout } = useAuth();

  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const response = await api.get(
          '/dashboard/overview'
        );

        setOverview(response.data);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            'Unable to load dashboard'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, []);

  if (loading) {
    return <h2>Loading dashboard...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
  <div className="dashboard-container">

    <div className="dashboard-header">
      <h1>LinkPulse Dashboard</h1>

      <button
        className="logout-button"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>

    <div className="stats-container">

      <div className="stat-card">
        <h3>Total Links</h3>
        <p>{overview.totalLinks}</p>
      </div>

      <div className="stat-card">
        <h3>Total Clicks</h3>
        <p>{overview.totalClicks}</p>
      </div>

      <div className="stat-card">
        <h3>Average Clicks</h3>
        <p>{overview.averageClicksPerLink}</p>
      </div>

    </div>

    <div className="top-link-section">
      <h2>Top Performing Link</h2>

      {overview.topLink ? (
        <>
          <p>
            <strong>Title:</strong>{' '}
            {overview.topLink.title || 'Untitled'}
          </p>

          <p>
            <strong>Short Code:</strong>{' '}
            {overview.topLink.short_code}
          </p>

          <p>
            <strong>Clicks:</strong>{' '}
            {overview.topLink.clicks}
          </p>
        </>
      ) : (
        <p>No links found.</p>
      )}
    </div>

    <div className="recent-links-section">

      <h2>Recent Links</h2>

      {overview.recentLinks.length === 0 ? (
        <p>No links available.</p>
      ) : (
        <table>

          <thead>
            <tr>
              <th>Title</th>
              <th>Short Code</th>
              <th>Clicks</th>
            </tr>
          </thead>

          <tbody>
            {overview.recentLinks.map((link) => (
              <tr key={link.id}>
                <td>
                  {link.title || 'Untitled'}
                </td>

                <td>
                  {link.short_code}
                </td>

                <td>
                  {link.clicks}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      )}

    </div>

  </div>
);
};

export default Dashboard;