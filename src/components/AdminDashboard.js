import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, 
  FileText, 
  Mail, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  BarChart3
} from 'lucide-react';
import { API_ENDPOINTS, API_BASE_URL } from '../config/api';

function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalViews: 0,
    totalContacts: 0,
    newContacts: 0
  });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    fetchData();
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

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    
    try {
      // Fetch posts
      const postsResponse = await fetch(`${API_BASE_URL}/api/posts/admin/all`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const postsData = await postsResponse.json();
      setPosts(postsData.posts || []);

      // Fetch contacts
      const contactsResponse = await fetch(API_ENDPOINTS.contacts.getAll, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const contactsData = await contactsResponse.json();
      setContacts(contactsData.contacts || []);

      // Calculate stats
      const totalViews = (postsData.posts || []).reduce((sum, post) => sum + post.views, 0);
      const newContacts = (contactsData.contacts || []).filter(c => c.status === 'new').length;

      setStats({
        totalPosts: postsData.posts?.length || 0,
        totalViews,
        totalContacts: contactsData.contacts?.length || 0,
        newContacts
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin');
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Tem certeza que deseja excluir este post?')) {
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(API_ENDPOINTS.posts.delete(postId), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleUpdateContactStatus = async (contactId, newStatus) => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(API_ENDPOINTS.contacts.update(contactId), {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-PT');
  };

  if (loading) {
    return <div className="admin-loading">Carregando...</div>;
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-content">
          <h1>Painel Administrativo</h1>
          <div className="admin-user-info">
            <span>Olá, {user?.name}</span>
            <button onClick={handleLogout} className="logout-button">
              <LogOut size={20} />
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="admin-nav">
        <button 
          className={activeTab === 'dashboard' ? 'active' : ''}
          onClick={() => setActiveTab('dashboard')}
        >
          <BarChart3 size={20} />
          Dashboard
        </button>
        <button 
          className={activeTab === 'posts' ? 'active' : ''}
          onClick={() => setActiveTab('posts')}
        >
          <FileText size={20} />
          Posts ({stats.totalPosts})
        </button>
        <button 
          className={activeTab === 'contacts' ? 'active' : ''}
          onClick={() => setActiveTab('contacts')}
        >
          <Mail size={20} />
          Contatos ({stats.newContacts})
        </button>
      </nav>

      {/* Main Content */}
      <main className="admin-main">
        {activeTab === 'dashboard' && (
          <div className="dashboard-content">
            <h2>Estatísticas</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <FileText size={32} />
                <h3>{stats.totalPosts}</h3>
                <p>Total de Posts</p>
              </div>
              <div className="stat-card">
                <Eye size={32} />
                <h3>{stats.totalViews}</h3>
                <p>Total de Visualizações</p>
              </div>
              <div className="stat-card">
                <Mail size={32} />
                <h3>{stats.totalContacts}</h3>
                <p>Total de Contatos</p>
              </div>
              <div className="stat-card highlight">
                <Mail size={32} />
                <h3>{stats.newContacts}</h3>
                <p>Novos Contatos</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'posts' && (
          <div className="posts-content">
            <div className="content-header">
              <h2>Gerenciar Posts</h2>
              <button 
                className="create-button"
                onClick={() => navigate('/admin/posts/new')}
              >
                <Plus size={20} />
                Novo Post
              </button>
            </div>

            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Categoria</th>
                    <th>Status</th>
                    <th>Visualizações</th>
                    <th>Data</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map(post => (
                    <tr key={post.id}>
                      <td>{post.title}</td>
                      <td>{post.category}</td>
                      <td>
                        <span className={`status-badge ${post.status}`}>
                          {post.status === 'published' ? 'Publicado' : 'Rascunho'}
                        </span>
                      </td>
                      <td>{post.views}</td>
                      <td>{formatDate(post.created_at)}</td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="action-btn edit"
                            onClick={() => navigate(`/admin/posts/edit/${post.id}`)}
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            className="action-btn delete"
                            onClick={() => handleDeletePost(post.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="contacts-content">
            <h2>Gerenciar Contatos</h2>

            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Mensagem</th>
                    <th>Status</th>
                    <th>Data</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map(contact => (
                    <tr key={contact.id}>
                      <td>{contact.name}</td>
                      <td>{contact.email}</td>
                      <td>{contact.phone || '-'}</td>
                      <td className="message-cell">{contact.message}</td>
                      <td>
                        <select 
                          className={`status-select ${contact.status}`}
                          value={contact.status}
                          onChange={(e) => handleUpdateContactStatus(contact.id, e.target.value)}
                        >
                          <option value="new">Novo</option>
                          <option value="read">Lido</option>
                          <option value="responded">Respondido</option>
                          <option value="archived">Arquivado</option>
                        </select>
                      </td>
                      <td>{formatDate(contact.created_at)}</td>
                      <td>
                        <a 
                          href={`mailto:${contact.email}`}
                          className="action-btn email"
                        >
                          <Mail size={16} />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
