import React from 'react';
import { ArrowRight, TrendingUp, Users, Target } from 'lucide-react';

const Home = () => {
  return (
    <section id="home" className="home-section">
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Impulsionamos o <span className="highlight">Crescimento</span> do Seu Negócio
          </h1>
          <p className="hero-subtitle">
            Consultoria estratégica e comunicação especializada para empreendedores e empresas em Angola. 
            Transformamos ideias em resultados concretos.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">
                <Users size={32} />
              </div>
              <h3>50+</h3>
              <p>Clientes Satisfeitos</p>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <Target size={32} />
              </div>
              <h3>100+</h3>
              <p>Projetos Concluídos</p>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <TrendingUp size={32} />
              </div>
              <h3>5+</h3>
              <p>Anos de Experiência</p>
            </div>
          </div>
        </div>
      </div>

      {/* Company Introduction */}
      <div className="intro-section">
        <div className="container">
          <div className="intro-content">
            <h2>Bem-vindos à Queta Boost</h2>
            <p>
              Somos uma empresa angolana de consultoria estratégica e comunicação, dedicada a 
              impulsionar o crescimento de negócios e empreendedores em Angola. Com uma equipe 
              experiente e apaixonada, oferecemos soluções personalizadas e inovadoras.
            </p>
            <p>
              Acreditamos no poder da comunicação eficaz e no impacto transformador que ela pode 
              ter nos negócios e na sociedade angolana.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
