import React, { useState, useEffect } from 'react';
import { FileText, Eye, Mail, Users, TrendingUp, Calendar, CheckCircle, Clock } from 'lucide-react';
import { API_ENDPOINTS, API_BASE_URL } from '../../config/api';

function DashboardContent({ stats }) {
  const [posts, setPosts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [topPosts, setTopPosts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    
    try {
      // Fetch posts
      const postsResponse = await fetch(`${API_BASE_URL}/api/posts/admin/all`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const postsData = await postsResponse.json();
      const allPosts = postsData.posts || [];
      setPosts(allPosts);
      
      // Top posts por visualizações
      const sorted = [...allPosts].sort((a, b) => b.views - a.views);
      setTopPosts(sorted.slice(0, 5));

      // Fetch contacts
      const contactsResponse = await fetch(API_ENDPOINTS.contacts.getAll, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const contactsData = await contactsResponse.json();
      setContacts(contactsData.contacts || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const publishedPosts = posts.filter(p => p.status === 'published').length;
  const draftPosts = posts.filter(p => p.status === 'draft').length;
  const newContacts = contacts.filter(c => c.status === 'novo').length;
  const readContacts = contacts.filter(c => c.status === 'lido').length;
  const respondedContacts = contacts.filter(c => c.status === 'respondido').length;
  
  // Calcular porcentagens
  const publishedPercentage = stats.totalPosts > 0 ? Math.round((publishedPosts / stats.totalPosts) * 100) : 0;
  const avgViews = stats.totalPosts > 0 ? Math.round(stats.totalViews / stats.totalPosts) : 0;

  return (
    <div className="dashboard-content-new">
      {/* Stats Cards - Linha 1 */}
      <div className="stats-grid-enhanced">
        <div className="stat-card-enhanced primary">
          <div className="stat-header">
            <div className="stat-icon-wrapper blue">
              <FileText size={24} />
            </div>
            <span className="stat-trend">+{publishedPosts}</span>
          </div>
          <div className="stat-body">
            <h3>{stats.totalPosts}</h3>
            <p>Total de Posts</p>
            <div className="stat-detail">
              <span>{publishedPosts} publicados</span>
              <span>{draftPosts} rascunhos</span>
            </div>
          </div>
        </div>

        <div className="stat-card-enhanced success">
          <div className="stat-header">
            <div className="stat-icon-wrapper green">
              <Eye size={24} />
            </div>
            <TrendingUp size={16} className="trending-icon" />
          </div>
          <div className="stat-body">
            <h3>{stats.totalViews}</h3>
            <p>Visualizações Totais</p>
            <div className="stat-detail">
              <span>Média: {Math.round(stats.totalViews / (stats.totalPosts || 1))} por post</span>
            </div>
          </div>
        </div>

        <div className="stat-card-enhanced warning">
          <div className="stat-header">
            <div className="stat-icon-wrapper orange">
              <Mail size={24} />
            </div>
            <span className="stat-badge">{newContacts} novos</span>
          </div>
          <div className="stat-body">
            <h3>{stats.totalContacts}</h3>
            <p>Contatos Recebidos</p>
            <div className="stat-detail">
              <span>{newContacts} pendentes</span>
            </div>
          </div>
        </div>

        <div className="stat-card-enhanced purple">
          <div className="stat-header">
            <div className="stat-icon-wrapper purple-icon">
              <Users size={24} />
            </div>
            <CheckCircle size={16} className="check-icon" />
          </div>
          <div className="stat-body">
            <h3>{stats.totalUsers}</h3>
            <p>Usuários Ativos</p>
            <div className="stat-detail">
              <span>Sistema ativo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Estatísticas Visuais */}
      <div className="stats-visual-section">
        <div className="stat-chart-card">
          <h3>📊 Distribuição de Posts</h3>
          <div className="chart-item">
            <div className="chart-label">
              <span>Publicados</span>
              <span className="chart-value">{publishedPosts} ({publishedPercentage}%)</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill published" style={{ width: `${publishedPercentage}%` }}></div>
            </div>
          </div>
          <div className="chart-item">
            <div className="chart-label">
              <span>Rascunhos</span>
              <span className="chart-value">{draftPosts} ({100 - publishedPercentage}%)</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill draft" style={{ width: `${100 - publishedPercentage}%` }}></div>
            </div>
          </div>
        </div>

        <div className="stat-chart-card">
          <h3>📧 Status dos Contatos</h3>
          <div className="chart-item">
            <div className="chart-label">
              <span>Novos</span>
              <span className="chart-value">{newContacts}</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill new" style={{ width: `${contacts.length > 0 ? (newContacts / contacts.length) * 100 : 0}%` }}></div>
            </div>
          </div>
          <div className="chart-item">
            <div className="chart-label">
              <span>Lidos</span>
              <span className="chart-value">{readContacts}</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill read" style={{ width: `${contacts.length > 0 ? (readContacts / contacts.length) * 100 : 0}%` }}></div>
            </div>
          </div>
          <div className="chart-item">
            <div className="chart-label">
              <span>Respondidos</span>
              <span className="chart-value">{respondedContacts}</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill responded" style={{ width: `${contacts.length > 0 ? (respondedContacts / contacts.length) * 100 : 0}%` }}></div>
            </div>
          </div>
        </div>

        <div className="stat-chart-card">
          <h3>📈 Desempenho</h3>
          <div className="performance-stats">
            <div className="perf-item">
              <span className="perf-label">Média de Visualizações</span>
              <span className="perf-value">{avgViews}</span>
            </div>
            <div className="perf-item">
              <span className="perf-label">Total de Visualizações</span>
              <span className="perf-value">{stats.totalViews}</span>
            </div>
            <div className="perf-item">
              <span className="perf-label">Taxa de Publicação</span>
              <span className="perf-value">{publishedPercentage}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Widgets Grid */}
      <div className="dashboard-widgets-enhanced">
        {/* Posts Mais Vistos */}
        <div className="widget-enhanced">
          <div className="widget-header">
            <h3><TrendingUp size={20} /> Posts Mais Vistos</h3>
          </div>
          <div className="widget-content">
            {topPosts.map((post, index) => (
              <div key={post.id} className="top-post-item">
                <span className="post-rank">#{index + 1}</span>
                <div className="post-info">
                  <span className="post-title">{post.title}</span>
                  <span className="post-category">{post.category}</span>
                </div>
                <div className="post-views">
                  <Eye size={14} />
                  <span>{post.views}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Posts Recentes */}
        <div className="widget-enhanced">
          <div className="widget-header">
            <h3><Calendar size={20} /> Posts Recentes</h3>
          </div>
          <div className="widget-content">
            {posts.slice(0, 5).map(post => (
              <div key={post.id} className="recent-post-item">
                <div className="post-info">
                  <span className="post-title">{post.title}</span>
                  <span className="post-date">
                    {new Date(post.created_at).toLocaleDateString('pt-PT')}
                  </span>
                </div>
                <span className={`status-badge-new ${post.status}`}>
                  {post.status === 'published' ? (
                    <><CheckCircle size={14} /> Publicado</>
                  ) : (
                    <><Clock size={14} /> Rascunho</>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Contatos Recentes */}
        <div className="widget-enhanced">
          <div className="widget-header">
            <h3><Mail size={20} /> Contatos Recentes</h3>
          </div>
          <div className="widget-content">
            {contacts.slice(0, 5).map(contact => (
              <div key={contact.id} className="contact-item">
                <div className="contact-info">
                  <span className="contact-name">{contact.name}</span>
                  <span className="contact-email">{contact.email}</span>
                </div>
                <span className={`contact-status ${contact.status}`}>
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
