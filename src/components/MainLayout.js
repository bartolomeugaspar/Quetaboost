import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, ChevronUp, Shield } from 'lucide-react';
import Home from './Home';
import About from './About';
import Services from './Services';
import Blog from './Blog';
import Contact from './Contact';

function MainLayout() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <img src="/images/services-2.jpeg" alt="Queta Boost" className="logo-img" />
            <h2>QuetaBoost</h2>
          </div>
          
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <button className="nav-link" onClick={() => scrollToSection('home')}>
              Home
            </button>
            <button className="nav-link" onClick={() => scrollToSection('about')}>
              Sobre Nós
            </button>
            <button className="nav-link" onClick={() => scrollToSection('services')}>
              Nossos Serviços
            </button>
            <button className="nav-link" onClick={() => scrollToSection('blog')}>
              Blog
            </button>
            <button className="nav-link" onClick={() => scrollToSection('contact')}>
              Contactos
            </button>
            <button className="nav-link" onClick={() => navigate('/admin')}>
              Admin
            </button>
          </div>

          <div className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Home />
        <About />
        <Services />
        <Blog />
        <Contact />
      </main>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button className="scroll-top" onClick={scrollToTop}>
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  );
}

export default MainLayout;
