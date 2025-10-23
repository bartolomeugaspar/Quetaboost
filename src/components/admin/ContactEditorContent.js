import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Mail, User, Phone, MessageSquare, CheckCircle } from 'lucide-react';

function ContactEditorContent({ fetchStats }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    status: 'new'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode) {
      fetchContact();
    }
  }, [id]);

  const fetchContact = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:5000/api/contacts', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      const contact = data.contacts.find(c => c.id === parseInt(id));

      if (contact) {
        setFormData({
          name: contact.name,
          email: contact.email,
          phone: contact.phone || '',
          message: contact.message,
          status: contact.status
        });
      }
    } catch (error) {
      console.error('Error fetching contact:', error);
      setError('Erro ao carregar contato');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const token = localStorage.getItem('token');

    try {
      if (isEditMode) {
        const response = await fetch(`http://localhost:5000/api/contacts/${id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status: formData.status })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Erro ao atualizar contato');
        }
      } else {
        const response = await fetch('http://localhost:5000/api/contacts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Erro ao criar contato');
        }
      }

      if (fetchStats) fetchStats();
      navigate('/admin/contacts');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="editor-content-wrapper">
      <div className="editor-content-header">
        <button 
          className="back-button-inline"
          onClick={() => navigate('/admin/contacts')}
        >
          <ArrowLeft size={20} />
          Voltar para Contatos
        </button>
      </div>

      <form onSubmit={handleSubmit} className="editor-form-inline">
        <div className="form-header">
          <h2>{isEditMode ? 'Editar Contato' : 'Criar Novo Contato'}</h2>
          <p>{isEditMode ? 'Gerencie o status deste contato' : 'Adicione um novo contato ao sistema'}</p>
        </div>

        <div className="form-body">
          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}

          {isEditMode && (
            <div className="form-hint">
              <p>
                <strong>ℹ️ Informação:</strong> Os dados do contato não podem ser alterados. Apenas o status pode ser atualizado.
              </p>
            </div>
          )}

          <div className="form-section">
            <h3 className="form-section-title">
              <User size={20} />
              Informações do Contato
            </h3>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">
                  <User size={18} />
                  Nome Completo
                  <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nome completo"
                  required
                  disabled={isEditMode}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  <Mail size={18} />
                  Email
                  <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@exemplo.com"
                  required
                  disabled={isEditMode}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phone">
                <Phone size={18} />
                Telefone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+244 923 456 789"
                disabled={isEditMode}
              />
              <small>📱 Formato: +244 XXX XXX XXX</small>
            </div>
          </div>

          <div className="form-section">
            <h3 className="form-section-title">
              <MessageSquare size={20} />
              Mensagem
            </h3>

            <div className="form-group">
              <label htmlFor="message">
                Conteúdo da Mensagem
                <span className="required">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Digite a mensagem do contato..."
                rows="6"
                required
                disabled={isEditMode}
              />
              <small>💬 Mensagem enviada pelo formulário de contato</small>
            </div>
          </div>

          <div className="form-section">
            <h3 className="form-section-title">
              <CheckCircle size={20} />
              Status do Atendimento
            </h3>

            <div className="form-group">
              <label htmlFor="status">
                Status Atual
                <span className="required">*</span>
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="new">🆕 Novo - Aguardando leitura</option>
                <option value="read">👁️ Lido - Visualizado</option>
                <option value="responded">✅ Respondido - Já foi respondido</option>
                <option value="archived">📦 Arquivado - Finalizado</option>
              </select>
              <small>
                {formData.status === 'new' && '🆕 Contato recém-recebido'}
                {formData.status === 'read' && '👁️ Você já visualizou este contato'}
                {formData.status === 'responded' && '✅ Contato já foi respondido'}
                {formData.status === 'archived' && '📦 Contato arquivado e finalizado'}
              </small>
            </div>
          </div>

          {!isEditMode && (
            <div className="form-hint">
              <p>
                <strong>💡 Dica:</strong> Após salvar, você poderá gerenciar o status deste contato no painel.
              </p>
            </div>
          )}
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            className="cancel-button"
            onClick={() => navigate('/admin/contacts')}
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            className="save-button"
            disabled={loading}
          >
            <Save size={20} />
            {loading ? 'Salvando...' : isEditMode ? 'Atualizar Status' : 'Salvar Contato'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactEditorContent;
