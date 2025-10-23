import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  FileText, 
  Mail, 
  Users, 
  LogOut
} from 'lucide-react';

function Sidebar({ sidebarOpen, stats }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <img src="/images/services-2.jpeg" alt="Queta Boost" />
          {sidebarOpen && <h2>QuetaBoost</h2>}
        </div>
      </div>

      <nav className="sidebar-nav">
        <button 
          className={isActive('/admin/dashboard') ? 'active' : ''}
          onClick={() => navigate('/admin/dashboard')}
        >
          <BarChart3 size={20} />
          {sidebarOpen && <span>Dashboard</span>}
        </button>
        
        <button 
          className={isActive('/admin/posts') ? 'active' : ''}
          onClick={() => navigate('/admin/posts')}
        >
          <FileText size={20} />
          {sidebarOpen && <span>Posts</span>}
          {sidebarOpen && <span className="badge">{stats.totalPosts}</span>}
        </button>
        
        <button 
          className={isActive('/admin/contacts') ? 'active' : ''}
          onClick={() => navigate('/admin/contacts')}
        >
          <Mail size={20} />
          {sidebarOpen && <span>Contatos</span>}
          {sidebarOpen && stats.newContacts > 0 && (
            <span className="badge badge-alert">{stats.newContacts}</span>
          )}
        </button>
        
        <button 
          className={isActive('/admin/users') ? 'active' : ''}
          onClick={() => navigate('/admin/users')}
        >
          <Users size={20} />
          {sidebarOpen && <span>Usuários</span>}
          {sidebarOpen && <span className="badge">{stats.totalUsers}</span>}
        </button>
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="sidebar-logout">
          <LogOut size={20} />
          {sidebarOpen && <span>Sair</span>}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
