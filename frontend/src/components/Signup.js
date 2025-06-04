import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('learner'); // or 'mentor'
  const [skills, setSkills] = useState('');
  const [bio, setBio] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        username,
        email,
        password,
        role,
        skills: skills.split(',').map(skill => skill.trim()), // assuming CSV input
        bio
      };
      const response = await api.post('/api/signup', payload);
      console.log('User created:', response.data);
      navigate('/login');
    } catch (err) {
      console.error('Error creating user:', err);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="mentor">Mentor</option>
          <option value="learner">Learner</option>
        </select>
        <input type="text" placeholder="Skills (comma-separated)" value={skills} onChange={(e) => setSkills(e.target.value)} required />
        <textarea placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)} required></textarea>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
