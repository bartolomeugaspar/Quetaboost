import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MainLayout from './components/MainLayout';
import BlogPost from './components/BlogPost';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import AdminLayout from './components/admin/AdminLayout';
import DashboardContent from './components/admin/DashboardContentNew';
import PostsContent from './components/admin/PostsContent';
import ContactsContent from './components/admin/ContactsContent';
import UsersContent from './components/admin/UsersContent';
import LogsContent from './components/admin/LogsContent';
import PostEditorContent from './components/admin/PostEditorContent';
import UserEditorContent from './components/admin/UserEditorContent';
import ContactEditorContent from './components/admin/ContactEditorContent';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        {/* Admin Routes with Layout (Sidebar + Header fixos) */}
        <Route path="/admin/dashboard" element={<AdminLayout><DashboardContent /></AdminLayout>} />
        
        {/* Posts */}
        <Route path="/admin/posts" element={<AdminLayout><PostsContent /></AdminLayout>} />
        <Route path="/admin/posts/new" element={<AdminLayout><PostEditorContent /></AdminLayout>} />
        <Route path="/admin/posts/edit/:id" element={<AdminLayout><PostEditorContent /></AdminLayout>} />
        
        {/* Contacts */}
        <Route path="/admin/contacts" element={<AdminLayout><ContactsContent /></AdminLayout>} />
        <Route path="/admin/contacts/new" element={<AdminLayout><ContactEditorContent /></AdminLayout>} />
        <Route path="/admin/contacts/edit/:id" element={<AdminLayout><ContactEditorContent /></AdminLayout>} />
        
        {/* Users */}
        <Route path="/admin/users" element={<AdminLayout><UsersContent /></AdminLayout>} />
        <Route path="/admin/users/new" element={<AdminLayout><UserEditorContent /></AdminLayout>} />
        <Route path="/admin/users/edit/:id" element={<AdminLayout><UserEditorContent /></AdminLayout>} />
        
        {/* Logs */}
        <Route path="/admin/logs" element={<AdminLayout><LogsContent /></AdminLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
