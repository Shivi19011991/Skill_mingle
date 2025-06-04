import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';

const MessageBoard = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.get('/api/messages');
        setMessages(response.data);
      } catch (err) {
        console.error('Error fetching messages:', err);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div>
      <h2>Messages</h2>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <p>{message.sender.username}: {message.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageBoard;
