import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';

const SessionList = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await api.get('/api/sessions');
        setSessions(response.data);
      } catch (err) {
        console.error('Error fetching sessions:', err);
      }
    };

    fetchSessions();
  }, []);

  return (
    <div>
      <h2>Sessions</h2>
      <ul>
        {sessions.map((session) => (
          <li key={session.id}>
            <p>{session.title}</p>
            <p>{session.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SessionList;
