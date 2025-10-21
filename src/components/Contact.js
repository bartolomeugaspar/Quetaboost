import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  Facebook,
  Instagram,
  Linkedin
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    alert('Mensagem enviada com sucesso! Entraremos em contacto em breve.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
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
            <h3>Informações de Contacto</h3>
            <p className="contact-intro">
              Estamos sempre disponíveis para ajudar. Entre em contacto através de qualquer 
              um dos meios abaixo ou preencha o formulário ao lado.
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">
                  <Phone size={24} />
                </div>
                <div className="contact-text">
                  <h4>Telefone / WhatsApp</h4>
                  <p>
                    <a href="https://wa.me/244942301884" target="_blank" rel="noopener noreferrer" className="whatsapp-link">
                      +244 942 301 884
                    </a>
                  </p>
                  <p>+244 954 931 747</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <Mail size={24} />
                </div>
                <div className="contact-text">
                  <h4>Email</h4>
                  <p>info@quetaboost.ao</p>
                  <p>paulo@quetaboost.ao</p>
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
                <a href="#" className="social-link">
                  <Facebook size={24} />
                </a>
                <a href="#" className="social-link">
                  <Instagram size={24} />
                </a>
                <a href="#" className="social-link">
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <h3>Envie-nos uma Mensagem</h3>
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

              <button type="submit" className="btn-primary">
                Enviar Mensagem <Send size={20} />
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
