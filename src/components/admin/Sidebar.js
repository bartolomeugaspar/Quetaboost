import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  FileText, 
  Mail, 
  Users, 
  LogOut
} from 'lucide-react';

function Sidebar({ sidebarOpen, stats, setSidebarOpen }) {
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
  
  const handleNavigate = (path) => {
    navigate(path);
    // Fechar sidebar no mobile após navegação
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };
  
  // Fechar sidebar ao clicar fora dela no mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (window.innerWidth <= 768 && sidebarOpen) {
        const sidebar = document.querySelector('.admin-sidebar');
        const toggleButton = document.querySelector('.sidebar-toggle');
        
        if (sidebar && !sidebar.contains(event.target) && !toggleButton.contains(event.target)) {
          setSidebarOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen, setSidebarOpen]);

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
          onClick={() => handleNavigate('/admin/dashboard')}
        >
          <BarChart3 size={20} />
          {sidebarOpen && <span>Dashboard</span>}
        </button>
        
        <button 
          className={isActive('/admin/posts') ? 'active' : ''}
          onClick={() => handleNavigate('/admin/posts')}
        >
          <FileText size={20} />
          {sidebarOpen && <span>Posts</span>}
          {sidebarOpen && <span className="badge">{stats.totalPosts}</span>}
        </button>
        
        <button 
          className={isActive('/admin/contacts') ? 'active' : ''}
          onClick={() => handleNavigate('/admin/contacts')}
        >
          <Mail size={20} />
          {sidebarOpen && <span>Contatos</span>}
          {sidebarOpen && stats.newContacts > 0 && (
            <span className="badge badge-alert">{stats.newContacts}</span>
          )}
        </button>
        
        <button 
          className={isActive('/admin/users') ? 'active' : ''}
          onClick={() => handleNavigate('/admin/users')}
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
