import React from 'react';
import { Award, Heart, Lightbulb, Users } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="section-header">
          <h2>Sobre Nós</h2>
          <p>Conheça a nossa história e os valores que nos movem</p>
        </div>

        <div className="about-content">
          <div className="about-story">
            <h3>A Nossa História</h3>
            <p>
              A Queta Boost é uma empresa angolana de consultoria estratégica e comunicação que nasceu 
              com o objetivo de impulsionar o crescimento de negócios e empreendedores em Angola. 
              Com uma equipe experiente e apaixonada pelo que faz, oferecemos serviços especializados 
              em marketing digital, comunicação estratégica, desenvolvimento de marcas e muito mais.
            </p>
            <p>
              Com uma abordagem personalizada e inovadora, ajudamos as empresas a alcançar seus 
              objetivos e a se destacarem no mercado angolano. Acreditamos no poder da comunicação 
              eficaz e no impacto que ela pode ter nos negócios e na sociedade.
            </p>
          </div>

          <div className="leadership">
            <h3>Liderança</h3>
            <div className="leader-card">
              <div className="leader-image">
                <img 
                  src="/images/queta.jpeg" 
                  alt="Paulo Queta - Fundador & CEO" 
                  className="leader-photo"
                />
              </div>
              <div className="leader-info">
                <h4>Paulo Queta</h4>
                <p className="leader-title">Fundador & CEO</p>
                <p>
                  Empreendedor e especialista em marketing digital com uma visão clara e inovadora. 
                  Sob a sua liderança, a Queta Boost tem trabalhado com uma variedade de clientes, 
                  desde pequenas startups até grandes empresas, ajudando-as a alcançar seus objetivos 
                  e a crescer no mercado angolano.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="values-section">
          <h3>Os Nossos Valores</h3>
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon">
                <Lightbulb size={32} />
              </div>
              <h4>Inovação</h4>
              <p>Buscamos sempre soluções criativas e inovadoras para os desafios dos nossos clientes.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">
                <Award size={32} />
              </div>
              <h4>Excelência</h4>
              <p>Comprometemo-nos com a qualidade e excelência em todos os nossos serviços.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">
                <Heart size={32} />
              </div>
              <h4>Paixão</h4>
              <p>Fazemos o que amamos e amamos o que fazemos, com dedicação total aos nossos projetos.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">
                <Users size={32} />
              </div>
              <h4>Parceria</h4>
              <p>Construímos relacionamentos duradouros baseados na confiança e resultados mútuos.</p>
            </div>
          </div>
        </div>

        <div className="company-gallery">
          <h3>A Nossa Empresa</h3>
          <div className="gallery-grid">
            <div className="gallery-item">
              <img src="/images/about-image.jpeg" alt="Queta Boost - Escritório" />
            </div>
            <div className="gallery-item">
              <img src="/images/services-1.jpeg" alt="Queta Boost - Serviços" />
            </div>
            <div className="gallery-item">
              <img src="/images/services-2.jpeg" alt="Queta Boost - Projetos" />
            </div>
          </div>
        </div>

        <div className="mission-vision">
          <div className="mission-vision-grid">
            <div className="mission">
              <h3>Missão</h3>
              <p>
                Impulsionar o crescimento sustentável de negócios angolanos através de consultoria 
                estratégica e comunicação eficaz, contribuindo para o desenvolvimento económico do país.
              </p>
            </div>
            <div className="vision">
              <h3>Visão</h3>
              <p>
                Ser a empresa de referência em consultoria estratégica e comunicação em Angola, 
                reconhecida pela qualidade dos nossos serviços e pelo impacto positivo nos negócios 
                dos nossos clientes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
