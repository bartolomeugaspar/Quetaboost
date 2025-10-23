import React, { useState, useEffect } from 'react';
import { FileText, Eye, Mail, Users } from 'lucide-react';

function DashboardContent({ stats }) {
  const [posts, setPosts] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    
    try {
      // Fetch posts
      const postsResponse = await fetch('http://localhost:5000/api/posts/admin/all', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const postsData = await postsResponse.json();
      setPosts(postsData.posts || []);

      // Fetch contacts
      const contactsResponse = await fetch('http://localhost:5000/api/contacts', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const contactsData = await contactsResponse.json();
      setContacts(contactsData.contacts || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="dashboard-content-new">
      <div className="stats-grid-new">
        <div className="stat-card-new">
          <div className="stat-icon"><FileText size={32} /></div>
          <div className="stat-info">
            <h3>{stats.totalPosts}</h3>
            <p>Total de Posts</p>
          </div>
        </div>
        
        <div className="stat-card-new">
          <div className="stat-icon"><Eye size={32} /></div>
          <div className="stat-info">
            <h3>{stats.totalViews}</h3>
            <p>Visualizações</p>
          </div>
        </div>
        
        <div className="stat-card-new">
          <div className="stat-icon"><Mail size={32} /></div>
          <div className="stat-info">
            <h3>{stats.totalContacts}</h3>
            <p>Contatos</p>
          </div>
        </div>
        
        <div className="stat-card-new highlight">
          <div className="stat-icon"><Users size={32} /></div>
          <div className="stat-info">
            <h3>{stats.totalUsers}</h3>
            <p>Usuários</p>
          </div>
        </div>
      </div>

      <div className="dashboard-widgets">
        <div className="widget">
          <h3>Posts Recentes</h3>
          <div className="widget-list">
            {posts.slice(0, 5).map(post => (
              <div key={post.id} className="widget-item">
                <span>{post.title}</span>
                <span className={`status-badge ${post.status}`}>
                  {post.status === 'published' ? 'Publicado' : 'Rascunho'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="widget">
          <h3>Contatos Recentes</h3>
          <div className="widget-list">
            {contacts.slice(0, 5).map(contact => (
              <div key={contact.id} className="widget-item">
                <span>{contact.name}</span>
                <span className={`status-badge ${contact.status}`}>
                  {contact.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardContent;
