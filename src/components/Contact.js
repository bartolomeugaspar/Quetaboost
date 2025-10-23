import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  Facebook,
  Instagram,
  Linkedin,
  Youtube
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        alert('✅ Mensagem enviada com sucesso! Entraremos em contacto em breve.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setError(data.error || 'Erro ao enviar mensagem. Tente novamente.');
      }
    } catch (error) {
      console.error('Error submitting contact:', error);
      setError('Erro ao enviar mensagem. Verifique sua conexão e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header">
          <h2>Contactos</h2>
          <p>Entre em contacto connosco e vamos conversar sobre o seu projeto</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-info-header">
              <h3>Informações de Contacto</h3>
              <p className="contact-intro">
                Estamos sempre disponíveis para ajudar. Entre em contacto através de qualquer 
                um dos meios abaixo ou preencha o formulário ao lado.
              </p>
            </div>

            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">
                  <Phone size={24} />
                </div>
                <div className="contact-text">
                  <h4>Telefone / WhatsApp</h4>
                  <p>
                    <a href="https://wa.me/244954931747" target="_blank" rel="noopener noreferrer" className="whatsapp-link">
                      +244 954 931 747
                    </a>
                  </p>
                  <p className="call-center">Call Center: +244 942 301 884</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <Mail size={24} />
                </div>
                <div className="contact-text">
                  <h4>Email</h4>
                  <p>
                    <a href="mailto:quetaboost@gmail.com">quetaboost@gmail.com</a>
                  </p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <MapPin size={24} />
                </div>
                <div className="contact-text">
                  <h4>Localização</h4>
                  <p>Luanda, Angola</p>
                  <p>Rua Principal, Nº 123</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <Clock size={24} />
                </div>
                <div className="contact-text">
                  <h4>Horário de Funcionamento</h4>
                  <p>Segunda - Sexta: 8:00 - 18:00</p>
                  <p>Sábado: 9:00 - 13:00</p>
                </div>
              </div>
            </div>

            <div className="social-media">
              <h4>Siga-nos nas Redes Sociais</h4>
              <div className="social-links">
                <a href="https://www.tiktok.com/@quetaboost" target="_blank" rel="noopener noreferrer" className="social-link" title="TikTok">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
                <a href="https://www.facebook.com/quetaboost" target="_blank" rel="noopener noreferrer" className="social-link" title="Facebook">
                  <Facebook size={24} />
                </a>
                <a href="https://www.instagram.com/quetaboost" target="_blank" rel="noopener noreferrer" className="social-link" title="Instagram">
                  <Instagram size={24} />
                </a>
                <a href="https://www.youtube.com/@quetaboost" target="_blank" rel="noopener noreferrer" className="social-link" title="YouTube">
                  <Youtube size={24} />
                </a>
                <a href="https://www.linkedin.com/company/quetaboost" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <h3>Envie-nos uma Mensagem</h3>
            {error && (
              <div className="error-message" style={{
                background: '#fee2e2',
                color: '#991b1b',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1rem',
                border: '1px solid #fecaca'
              }}>
                {error}
              </div>
            )}
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Nome Completo *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Telefone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Assunto *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="marketing">Marketing Digital</option>
                    <option value="comunicacao">Comunicação Estratégica</option>
                    <option value="branding">Desenvolvimento de Marcas</option>
                    <option value="consultoria">Consultoria Estratégica</option>
                    <option value="outros">Outros</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Mensagem *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Conte-nos sobre o seu projeto ou como podemos ajudar..."
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar Mensagem'} <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>Queta Boost</h3>
              <p>Impulsionando o crescimento de negócios em Angola</p>
            </div>
            <div className="footer-text">
              <p>&copy; 2025 Queta Boost. Todos os direitos reservados.</p>
              <p className="developer-credit">Desenvolvido por <span className="developer-name">Bartolomeu Gaspar</span></p>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Contact;
