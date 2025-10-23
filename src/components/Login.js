import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, LogIn, CheckCircle } from 'lucide-react';
import API_ENDPOINTS from '../config/api';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(API_ENDPOINTS.auth.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        // Traduzir mensagens de erro para português
        let errorMessage = 'Erro ao fazer login';
        if (data.error === 'Invalid credentials') {
          errorMessage = 'Email ou senha incorretos';
        } else if (data.error === 'Please provide email and password') {
          errorMessage = 'Por favor, preencha email e senha';
        } else if (data.error) {
          errorMessage = data.error;
        }
        throw new Error(errorMessage);
      }

      // Save token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Show success message
      setSuccess(true);

      // Redirect after 1.5 seconds
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {success && (
        <div className="success-modal">
          <div className="success-modal-content">
            <CheckCircle size={64} className="success-modal-icon" />
            <h2>Login Realizado!</h2>
            <p>Redirecionando para o painel...</p>
            <div className="spinner-small"></div>
          </div>
        </div>
      )}

      <div className="login-box">
        <div className="login-header">
          <LogIn size={48} className="login-icon" />
          <h2>Painel Administrativo</h2>
          <p>Faça login para acessar o painel</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">
              <Mail size={20} />
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <Lock size={20} />
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          <div className="login-footer">
            <a href="/forgot-password" className="forgot-password-link">
              Esqueci minha senha
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
