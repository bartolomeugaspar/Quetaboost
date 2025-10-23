import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X, Bell } from 'lucide-react';

function Header({ user, sidebarOpen, setSidebarOpen, stats }) {
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/admin/dashboard') return 'Dashboard';
    if (path === '/admin/posts') return 'Gerenciar Posts';
    if (path.includes('/admin/posts/')) return 'Editor de Posts';
    if (path === '/admin/contacts') return 'Gerenciar Contatos';
    if (path.includes('/admin/contacts/')) return 'Editor de Contatos';
    if (path === '/admin/users') return 'Gerenciar Usuários';
    if (path.includes('/admin/users/')) return 'Editor de Usuários';
    return 'Painel Admin';
  };

  return (
    <header className="admin-header-new">
      <div className="header-left">
        <button 
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1>{getPageTitle()}</h1>
      </div>

      <div className="header-right">
        <button className="header-notification">
          <Bell size={20} />
          {stats.newContacts > 0 && (
            <span className="notification-badge">{stats.newContacts}</span>
          )}
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
      </div>
    </header>
  );
}

export default Header;
