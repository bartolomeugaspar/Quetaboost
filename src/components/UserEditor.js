import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, User } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';

function UserEditor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode) {
      fetchUser();
    }
  }, [id]);

  const fetchUser = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(API_ENDPOINTS.users.getById(id), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();

      if (data.user) {
        setFormData({
          name: data.user.name,
          email: data.user.email,
          password: '', // Don't show password
          role: data.user.role
        });
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setError('Erro ao carregar usuário');
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

    // Prepare data
    const userData = {
      name: formData.name,
      email: formData.email,
      role: formData.role
    };

    // Only include password if it's provided
    if (formData.password) {
      userData.password = formData.password;
    }

    try {
      const url = isEditMode 
        ? API_ENDPOINTS.users.update(id)
        : API_ENDPOINTS.users.create;

      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao salvar usuário');
      }

      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-editor-container">
      <div className="editor-header">
        <button 
          className="back-button"
          onClick={() => navigate('/admin/dashboard')}
        >
          <ArrowLeft size={20} />
          Voltar
        </button>
        <h1>
          <User size={32} />
          {isEditMode ? 'Editar Usuário' : 'Novo Usuário'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="user-editor-form">
        <div className="form-header">
          <h2>{isEditMode ? 'Atualizar Informações' : 'Criar Novo Usuário'}</h2>
          <p>Preencha os dados abaixo para {isEditMode ? 'atualizar' : 'criar'} o usuário</p>
        </div>

        <div className="form-body">
          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}

          <div className="form-section">
            <h3 className="form-section-title">
              <User size={20} />
              Informações Pessoais
            </h3>

            <div className="form-group">
              <label htmlFor="name">
                Nome Completo
                <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Digite o nome completo"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                Email
                <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="usuario@exemplo.com"
                required
              />
              <small>Este email será usado para fazer login</small>
            </div>
          </div>

          <div className="form-section">
            <h3 className="form-section-title">
              <Save size={20} />
              Segurança
            </h3>

            <div className="form-group">
              <label htmlFor="password">
                Senha {isEditMode && '(opcional)'}
                {!isEditMode && <span className="required">*</span>}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={isEditMode ? "Deixe em branco para manter" : "Digite a senha"}
                required={!isEditMode}
              />
              <small>
                {isEditMode 
                  ? '💡 Deixe em branco para manter a senha atual'
                  : '🔒 Mínimo 6 caracteres, use letras e números'
                }
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="role">
                Papel no Sistema
                <span className="required">*</span>
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="user">Usuário</option>
                <option value="admin">Administrador</option>
              </select>
              <small>
                ⚡ Administradores têm acesso total ao painel de controle
              </small>
            </div>
          </div>

          {!isEditMode && (
            <div className="form-hint">
              <p>
                <strong>💡 Dica:</strong> Após criar o usuário, ele poderá fazer login com o email e senha fornecidos.
              </p>
            </div>
          )}
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            className="cancel-button"
            onClick={() => navigate('/admin/dashboard')}
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            className="save-button"
            disabled={loading}
          >
            <Save size={20} />
            {loading ? 'Salvando...' : isEditMode ? 'Atualizar Usuário' : 'Criar Usuário'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserEditor;
