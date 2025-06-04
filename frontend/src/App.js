import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // default export
import Signup from './components/Signup'; // default export
import Login from './components/Login'; // default export
import Profile from './components/Profile'; // default export
import Dashboard from './components/Dashboard'; // default export
import SessionList from './components/SessionList'; // default export
import MessageBoard from './components/MessageBoard'; // default export

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sessions" element={<SessionList />} />
        <Route path="/messages" element={<MessageBoard />} />
      </Routes>
    </Router>
  );
};

export default App;
