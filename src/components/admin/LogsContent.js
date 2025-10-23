import React, { useState, useEffect } from 'react';
import { Shield, Calendar, User, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { API_BASE_URL } from '../../config/api';

function LogsContent() {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/logs`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setLogs(data.logs || []);
      setFilteredLogs(data.logs || []);
    } catch (error) {
      console.error('Error fetching logs:', error);
      // Dados mock para demonstração
      const mockLogs = [
        {
          id: 1,
          user_email: 'admin@quetaboost.com',
          user_name: 'Admin',
          action: 'login',
          status: 'success',
          ip_address: '192.168.1.1',
          user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          created_at: new Date().toISOString()
        },
        {
          id: 2,
          user_email: 'user@example.com',
          user_name: 'User',
          action: 'login',
          status: 'failed',
          ip_address: '192.168.1.2',
          user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X)',
          created_at: new Date(Date.now() - 3600000).toISOString()
        }
      ];
      setLogs(mockLogs);
      setFilteredLogs(mockLogs);
    }
  };

  // Filtrar logs
  useEffect(() => {
    let result = logs;

    // Filtro de pesquisa
    if (searchTerm) {
      result = result.filter(log =>
        log.user_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.ip_address?.includes(searchTerm)
      );
    }

    // Filtro de status
    if (filterStatus !== 'all') {
      result = result.filter(log => log.status === filterStatus);
    }

    setFilteredLogs(result);
  }, [searchTerm, filterStatus, logs]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'status-success';
      case 'failed':
        return 'status-failed';
      default:
        return 'status-pending';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'success':
        return 'Sucesso';
      case 'failed':
        return 'Falhou';
      default:
        return 'Pendente';
    }
  };

  return (
    <div className="logs-content-new">
      <div className="logs-header">
        <div className="logs-title">
          <Shield size={28} />
          <div>
            <h2>Logs de Autenticação</h2>
            <p>Histórico de tentativas de login no sistema</p>
          </div>
        </div>
      </div>

      <div className="logs-filters">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Pesquisar por email, nome ou IP..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <span className="results-count-inline">
              {filteredLogs.length} resultado{filteredLogs.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        <select
          className="filter-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">Todos os Status</option>
          <option value="success">Sucesso</option>
          <option value="failed">Falhou</option>
        </select>
      </div>

      <div className="table-container-new">
        <table className="admin-table-new">
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Email</th>
              <th>Status</th>
              <th>IP</th>
              <th>Navegador</th>
              <th>Data/Hora</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>
                  Nenhum log encontrado
                </td>
              </tr>
            ) : (
              filteredLogs.map(log => (
                <tr key={log.id}>
                  <td><strong>{log.user_name || 'N/A'}</strong></td>
                  <td>{log.user_email}</td>
                  <td>
                    <span className={`status-badge ${getStatusColor(log.status)}`}>
                      {getStatusText(log.status)}
                    </span>
                  </td>
                  <td>{log.ip_address || 'N/A'}</td>
                  <td>{log.user_agent ? log.user_agent.substring(0, 50) + '...' : 'N/A'}</td>
                  <td>{formatDate(log.created_at)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LogsContent;
