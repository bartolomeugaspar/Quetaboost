import React, { useState, useEffect } from 'react';
import { 
  FileText, Eye, Mail, Users, TrendingUp, Calendar, 
  CheckCircle, Clock, ArrowUp, Activity,
  BarChart3, PieChart, MessageSquare, Star
} from 'lucide-react';
import {
  BarChart, Bar, PieChart as RechartsPie, Pie, Cell,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts';
import './DashboardNew.css';

function DashboardContentNew({ stats }) {
  const [posts, setPosts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [topPosts, setTopPosts] = useState([]);
  const [viewsData, setViewsData] = useState([]);
  const [contactsData, setContactsData] = useState([]);

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
      const allPosts = postsData.posts || [];
      setPosts(allPosts);
      
      // Top posts por visualizações
      const sorted = [...allPosts].sort((a, b) => b.views - a.views);
      setTopPosts(sorted.slice(0, 5));

      // Preparar dados para gráfico de visualizações (últimos 7 posts)
      const recentPosts = allPosts.slice(0, 7).reverse();
      const viewsChartData = recentPosts.map(post => ({
        name: post.title.substring(0, 15) + '...',
        views: post.views,
        date: new Date(post.created_at).toLocaleDateString('pt-PT', { day: '2-digit', month: 'short' })
      }));
      setViewsData(viewsChartData);

      // Fetch contacts
      const contactsResponse = await fetch('http://localhost:5000/api/contacts', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const contactsDataRes = await contactsResponse.json();
      const allContacts = contactsDataRes.contacts || [];
      setContacts(allContacts);

      // Preparar dados para gráfico de contatos por status
      const statusCounts = {
        novo: allContacts.filter(c => c.status === 'novo').length,
        lido: allContacts.filter(c => c.status === 'lido').length,
        respondido: allContacts.filter(c => c.status === 'respondido').length,
        arquivado: allContacts.filter(c => c.status === 'arquivado').length,
      };
      
      const contactsPieData = [
        { name: 'Novos', value: statusCounts.novo, color: '#f59e0b' },
        { name: 'Lidos', value: statusCounts.lido, color: '#3b82f6' },
        { name: 'Respondidos', value: statusCounts.respondido, color: '#10b981' },
        { name: 'Arquivados', value: statusCounts.arquivado, color: '#6b7280' },
      ];
      setContactsData(contactsPieData);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const publishedPosts = posts.filter(p => p.status === 'published').length;
  const draftPosts = posts.filter(p => p.status === 'draft').length;
  const newContacts = contacts.filter(c => c.status === 'novo').length;
  const avgViews = stats.totalPosts > 0 ? Math.round(stats.totalViews / stats.totalPosts) : 0;

  // Dados para gráfico de posts por categoria
  const categoryCounts = {};
  posts.forEach(post => {
    const cat = post.category || 'Sem categoria';
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });
  
  const categoryData = Object.entries(categoryCounts).map(([name, value]) => ({
    name,
    posts: value
  }));

  return (
    <div className="dashboard-container">
      {/* Welcome Card */}
      <div className="welcome-card">
        <div className="welcome-content">
          <div className="welcome-icon">
            <Activity size={32} />
          </div>
          <div className="welcome-text">
            <h2>Bem-vindo ao Painel Queta Boost</h2>
            <p>Acompanhe o desempenho do seu blog, gerencie contatos e visualize estatísticas em tempo real. Sistema totalmente operacional com {stats.totalPosts} posts publicados e {stats.totalViews} visualizações totais.</p>
          </div>
        </div>
        <div className="welcome-stats">
          <div className="welcome-stat-item">
            <span className="welcome-stat-value">{publishedPosts}</span>
            <span className="welcome-stat-label">Posts Ativos</span>
          </div>
          <div className="welcome-stat-divider"></div>
          <div className="welcome-stat-item">
            <span className="welcome-stat-value">{stats.totalViews}</span>
            <span className="welcome-stat-label">Total de Views</span>
          </div>
          <div className="welcome-stat-divider"></div>
          <div className="welcome-stat-item">
            <span className="welcome-stat-value">{newContacts}</span>
            <span className="welcome-stat-label">Novos Contatos</span>
          </div>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="stats-grid">
        {/* Total Posts Card */}
        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-icon blue">
              <FileText size={24} />
            </div>
            <div className="stat-trend">
              <ArrowUp size={16} />
              <span>{publishedPosts}</span>
            </div>
          </div>
          <h3 className="stat-value">{stats.totalPosts}</h3>
          <p className="stat-label">Total de Posts</p>
          <div className="stat-details">
            <span className="stat-detail-badge green">
              {publishedPosts} publicados
            </span>
            <span className="stat-detail-badge gray">
              {draftPosts} rascunhos
            </span>
          </div>
        </div>

        {/* Total Views Card */}
        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-icon green">
              <Eye size={24} />
            </div>
            <div className="stat-trend">
              <TrendingUp size={16} />
              <span>+12%</span>
            </div>
          </div>
          <h3 className="stat-value">{stats.totalViews.toLocaleString()}</h3>
          <p className="stat-label">Visualizações Totais</p>
          <div className="stat-details">
            <span className="stat-detail-badge gray">
              Média: {avgViews} por post
            </span>
          </div>
        </div>

        {/* Total Contacts Card */}
        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-icon orange">
              <Mail size={24} />
            </div>
            {newContacts > 0 && (
              <div className="stat-badge">
                {newContacts} novos
              </div>
            )}
          </div>
          <h3 className="stat-value">{stats.totalContacts}</h3>
          <p className="stat-label">Contatos Recebidos</p>
          <div className="stat-details">
            {newContacts > 0 ? (
              <span className="stat-detail-badge orange">{newContacts} aguardando resposta</span>
            ) : (
              <span className="stat-detail-badge green">Todos respondidos ✓</span>
            )}
          </div>
        </div>

        {/* Total Users Card */}
        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-icon purple">
              <Users size={24} />
            </div>
            <CheckCircle className="stat-trend" size={20} style={{ color: '#10b981' }} />
          </div>
          <h3 className="stat-value">{stats.totalUsers}</h3>
          <p className="stat-label">Usuários Ativos</p>
          <div className="stat-details">
            <span className="stat-detail-badge green">Sistema operacional</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        {/* Views Chart */}
        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-icon blue">
              <BarChart3 size={20} />
            </div>
            <h3>Visualizações por Post</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={viewsData}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="views" 
                stroke="#3b82f6" 
                fillOpacity={1} 
                fill="url(#colorViews)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Metrics */}
        <div className="performance-card">
          <div className="chart-card-header">
            <div className="chart-icon" style={{ background: '#fed7aa', color: '#ea580c' }}>
              <Star size={20} />
            </div>
            <h3>Métricas de Desempenho</h3>
          </div>
          <div className="performance-metrics">
            <div className="performance-item">
              <div className="performance-item-header">
                <span className="performance-label">Taxa de Publicação</span>
                <span className="performance-value">
                  {stats.totalPosts > 0 ? Math.round((publishedPosts / stats.totalPosts) * 100) : 0}%
                </span>
              </div>
              <div className="performance-progress">
                <div 
                  className="performance-progress-fill"
                  style={{ width: `${stats.totalPosts > 0 ? (publishedPosts / stats.totalPosts) * 100 : 0}%` }}
                ></div>
              </div>
            </div>

            <div className="performance-item">
              <div className="performance-item-header">
                <span className="performance-label">Engajamento Médio</span>
                <span className="performance-value">{avgViews}</span>
              </div>
              <p className="performance-description">visualizações por post</p>
            </div>

            <div className="performance-item">
              <div className="performance-item-header">
                <span className="performance-label">Taxa de Resposta</span>
                <span className="performance-value">
                  {stats.totalContacts > 0 ? Math.round(((stats.totalContacts - newContacts) / stats.totalContacts) * 100) : 0}%
                </span>
              </div>
              <p className="performance-description">contatos respondidos</p>
            </div>
          </div>
        </div>

        {/* Category Bar Chart */}
        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-icon green">
              <Activity size={20} />
            </div>
            <h3>Posts por Categoria</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="posts" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Lists Section */}
      <div className="lists-grid">
        {/* Top Posts */}
        <div className="list-card">
          <div className="list-card-header">
            <div className="list-icon purple">
              <TrendingUp size={20} />
            </div>
            <h3>Posts Mais Vistos</h3>
          </div>
          <div className="list-items">
            {topPosts.map((post, index) => (
              <div key={post.id} className="list-item">
                <div className="list-item-rank">
                  {index + 1}
                </div>
                <div className="list-item-content">
                  <p className="list-item-title">{post.title}</p>
                  <p className="list-item-subtitle">{post.category}</p>
                </div>
                <div className="list-item-meta">
                  <Eye size={14} />
                  <span>{post.views}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Posts */}
        <div className="list-card">
          <div className="list-card-header">
            <div className="list-icon blue">
              <Calendar size={20} />
            </div>
            <h3>Posts Recentes</h3>
          </div>
          <div className="list-items">
            {posts.slice(0, 5).map(post => (
              <div key={post.id} className="list-item">
                <div className="list-item-content">
                  <p className="list-item-title">{post.title}</p>
                  <p className="list-item-date">
                    {new Date(post.created_at).toLocaleDateString('pt-PT', { 
                      day: '2-digit', 
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                {post.status === 'published' ? (
                  <CheckCircle style={{ color: '#10b981', flexShrink: 0 }} size={16} />
                ) : (
                  <Clock style={{ color: '#9ca3af', flexShrink: 0 }} size={16} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Contacts */}
        <div className="list-card">
          <div className="list-card-header">
            <div className="list-icon orange">
              <MessageSquare size={20} />
            </div>
            <h3>Contatos Recentes</h3>
          </div>
          <div className="list-items">
            {contacts.slice(0, 5).map(contact => (
              <div key={contact.id} className="list-item">
                <div className="list-item-content">
                  <p className="list-item-title">{contact.name}</p>
                  <p className="list-item-subtitle">{contact.email}</p>
                </div>
                <span className={`list-item-status ${contact.status}`}>
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

export default DashboardContentNew;
