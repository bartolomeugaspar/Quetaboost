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
  BarChart3,
  Users,
  Menu,
  X,
  Settings,
  Bell
} from 'lucide-react';

function AdminDashboardNew() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalViews: 0,
    totalContacts: 0,
    newContacts: 0,
    totalUsers: 0
  });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

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

      // Fetch users
      const usersResponse = await fetch('http://localhost:5000/api/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const usersData = await usersResponse.json();
      setUsers(usersData.users || []);

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
    if (!window.confirm('Tem certeza que deseja excluir este post?')) return;

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) fetchData();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleUpdateContactStatus = async (contactId, newStatus) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/contacts/${contactId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) fetchData();
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Tem certeza que deseja excluir este usuário?')) return;

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        fetchData();
      } else {
        const data = await response.json();
        alert(data.error || 'Erro ao deletar usuário');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-PT');
  };

  if (loading) {
    return <div className="admin-loading">Carregando...</div>;
  }

  return (
    <div className="admin-dashboard-new">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <img src="/images/services-2.jpeg" alt="Queta Boost" />
            {sidebarOpen && <h2>QuetaBoost</h2>}
          </div>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={activeTab === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveTab('dashboard')}
          >
            <BarChart3 size={20} />
            {sidebarOpen && <span>Dashboard</span>}
          </button>
          
          <button 
            className={activeTab === 'posts' ? 'active' : ''}
            onClick={() => setActiveTab('posts')}
          >
            <FileText size={20} />
            {sidebarOpen && <span>Posts</span>}
            {sidebarOpen && <span className="badge">{stats.totalPosts}</span>}
          </button>
          
          <button 
            className={activeTab === 'contacts' ? 'active' : ''}
            onClick={() => setActiveTab('contacts')}
          >
            <Mail size={20} />
            {sidebarOpen && <span>Contatos</span>}
            {sidebarOpen && stats.newContacts > 0 && (
              <span className="badge badge-alert">{stats.newContacts}</span>
            )}
          </button>
          
          <button 
            className={activeTab === 'users' ? 'active' : ''}
            onClick={() => setActiveTab('users')}
          >
            <Users size={20} />
            {sidebarOpen && <span>Usuários</span>}
            {sidebarOpen && <span className="badge">{stats.totalUsers}</span>}
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-settings">
            <Settings size={20} />
            {sidebarOpen && <span>Configurações</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="admin-main-wrapper">
        {/* Header */}
        <header className="admin-header-new">
          <div className="header-left">
            <button 
              className="sidebar-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1>
              {activeTab === 'dashboard' && 'Dashboard'}
              {activeTab === 'posts' && 'Gerenciar Posts'}
              {activeTab === 'contacts' && 'Gerenciar Contatos'}
              {activeTab === 'users' && 'Gerenciar Usuários'}
            </h1>
          </div>

          <div className="header-right">
            <button className="header-notification">
              <Bell size={20} />
              {stats.newContacts > 0 && <span className="notification-dot"></span>}
            </button>
            
            <div className="header-user">
              <div className="user-avatar">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="user-info">
                <span className="user-name">{user?.name}</span>
                <span className="user-role">{user?.role}</span>
              </div>
            </div>

            <button onClick={handleLogout} className="logout-button-new">
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="admin-content-new">
          {activeTab === 'dashboard' && (
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
          )}

          {activeTab === 'posts' && (
            <div className="posts-content-new">
              <div className="content-header-new">
                <button 
                  className="create-button-new"
                  onClick={() => navigate('/admin/posts/new')}
                >
                  <Plus size={20} />
                  Novo Post
                </button>
              </div>

              <div className="table-container-new">
                <table className="admin-table-new">
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
            <div className="contacts-content-new">
              <div className="content-header-new">
                <button 
                  className="create-button-new"
                  onClick={() => navigate('/admin/contacts/new')}
                >
                  <Plus size={20} />
                  Novo Contato
                </button>
              </div>

              <div className="table-container-new">
                <table className="admin-table-new">
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

          {activeTab === 'users' && (
            <div className="users-content-new">
              <div className="content-header-new">
                <button 
                  className="create-button-new"
                  onClick={() => navigate('/admin/users/new')}
                >
                  <Plus size={20} />
                  Novo Usuário
                </button>
              </div>

              <div className="table-container-new">
                <table className="admin-table-new">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Email</th>
                      <th>Papel</th>
                      <th>Data de Criação</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.id}>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>
                          <span className={`role-badge ${u.role}`}>
                            {u.role === 'admin' ? 'Administrador' : 'Usuário'}
                          </span>
                        </td>
                        <td>{formatDate(u.created_at)}</td>
                        <td>
                          <div className="action-buttons">
                            <button 
                              className="action-btn edit"
                              onClick={() => navigate(`/admin/users/edit/${u.id}`)}
                            >
                              <Edit size={16} />
                            </button>
                            {u.id !== user?.id && (
                              <button 
                                className="action-btn delete"
                                onClick={() => handleDeleteUser(u.id)}
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </div>
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
    </div>
  );
}

export default AdminDashboardNew;
