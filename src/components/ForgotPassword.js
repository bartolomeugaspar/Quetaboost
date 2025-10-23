import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [resetLink, setResetLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:5000/api/password-reset/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao solicitar recuperação');
      }

      // Sempre mostrar sucesso (mesmo se email não existir - por segurança)
      setSuccess(true);
      
      // Em desenvolvimento, mostrar o link APENAS se foi gerado
      if (data.dev_link) {
        setResetLink(data.dev_link);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {!success ? (
          <>
            <div className="login-header">
              <Mail size={48} className="login-icon" />
              <h2>Recuperar Senha</h2>
              <p>Digite seu email para receber instruções</p>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <button 
                type="submit" 
                className="login-button"
                disabled={loading}
              >
                {loading ? 'Enviando...' : 'Enviar Link de Recuperação'}
              </button>

              <div className="login-footer">
                <Link to="/admin" className="forgot-password-link">
                  <ArrowLeft size={16} /> Voltar ao Login
                </Link>
              </div>
            </form>
          </>
        ) : (
          <div className="success-container">
            <CheckCircle size={48} className="success-icon" />
            <h2>Solicitação Enviada!</h2>
            <p className="success-message">
              Se o email estiver cadastrado, você receberá um link para redefinir sua senha.
            </p>

            {resetLink ? (
              <>
                
                <a href={resetLink} className="reset-link-button">
                  Acessar Link de Reset
                </a>
              </>
            ) : (
              <div className="warning-box">
                <p className="warning-text">
                  ⚠️ <strong>Modo Dev:</strong> Email não encontrado no sistema.
                </p>
              </div>
            )}

            <div className="login-footer">
              <Link to="/admin" className="forgot-password-link">
                <ArrowLeft size={16} /> Voltar ao Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
