import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  // Fetch user information and sessions on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch user profile
        const userResponse = await api.get('/api/profile');
        setUserInfo(userResponse.data);

        // Fetch upcoming sessions
        const sessionResponse = await api.get('/api/sessions');
        setSessions(sessionResponse.data);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      }
    };

    fetchDashboardData();
  }, []);

  // Render user info and upcoming sessions
  return (
    <div>
      <h2>Dashboard</h2>

      {/* User Info */}
      {userInfo ? (
        <div>
          <h3>Welcome, {userInfo.username}!</h3>
          <p>Email: {userInfo.email}</p>
          <p>Skills: {userInfo.skills.join(', ')}</p>
          <p>Bio: {userInfo.bio}</p>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}

      {/* Upcoming Sessions */}
      <div>
        <h3>Upcoming Sessions</h3>
        {sessions.length > 0 ? (
          <ul>
            {sessions.map((session) => (
              <li key={session.id}>
                <h4>{session.title}</h4>
                <p>{session.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming sessions available.</p>
        )}
      </div>

      {/* Navigation Links */}
      <div>
        <button onClick={() => navigate('/sessions')}>See All Sessions</button>
        <button onClick={() => navigate('/messages')}>Message Board</button>
      </div>
    </div>
  );
};

export default Dashboard;
