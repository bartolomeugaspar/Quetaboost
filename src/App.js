import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MainLayout from './components/MainLayout';
import BlogPost from './components/BlogPost';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import PostEditor from './components/PostEditor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/posts/new" element={<PostEditor />} />
        <Route path="/admin/posts/edit/:id" element={<PostEditor />} />
      </Routes>
    </Router>
  );
}

export default App;
