import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

function AdminLayout({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalViews: 0,
    totalContacts: 0,
    newContacts: 0,
    totalUsers: 0
  });

  useEffect(() => {
    checkAuth();
    fetchStats();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/admin');
      return;
    }

    setUser(JSON.parse(userData));
  };

  const fetchStats = async () => {
    const token = localStorage.getItem('token');
    
    try {
      // Fetch posts
      const postsResponse = await fetch('http://localhost:5000/api/posts/admin/all', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const postsData = await postsResponse.json();

      // Fetch contacts
      const contactsResponse = await fetch('http://localhost:5000/api/contacts', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const contactsData = await contactsResponse.json();

      // Fetch users
      const usersResponse = await fetch('http://localhost:5000/api/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const usersData = await usersResponse.json();

      // Calculate stats
      const totalViews = (postsData.posts || []).reduce((sum, post) => sum + post.views, 0);
      const newContacts = (contactsData.contacts || []).filter(c => c.status === 'new').length;

      setStats({
        totalPosts: postsData.posts?.length || 0,
        totalViews,
        totalContacts: contactsData.contacts?.length || 0,
        newContacts,
        totalUsers: usersData.users?.length || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  if (!user) {
    return <div className="admin-loading">Carregando...</div>;
  }

  return (
    <div className="admin-dashboard-new">
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
        stats={stats} 
      />
      
      <div className={`admin-main-wrapper ${sidebarOpen ? '' : 'sidebar-closed'}`}>
        <Header 
          user={user} 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen}
          stats={stats}
        />
        
        <main className="admin-content-new">
          {React.cloneElement(children, { stats, fetchStats })}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
