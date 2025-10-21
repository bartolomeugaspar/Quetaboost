import React from 'react';
import { 
  Megaphone, 
  TrendingUp, 
  Palette, 
  BarChart3, 
  MessageSquare, 
  Globe,
  ArrowRight
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <TrendingUp size={40} />,
      title: "Marketing Digital",
      description: "Estratégias digitais completas para aumentar a sua presença online e gerar mais leads qualificados.",
      features: ["SEO e SEM", "Gestão de Redes Sociais", "Email Marketing", "Publicidade Online"]
    },
    {
      icon: <MessageSquare size={40} />,
      title: "Comunicação Estratégica",
      description: "Desenvolvemos estratégias de comunicação eficazes para fortalecer a sua marca e mensagem.",
      features: ["Planeamento de Comunicação", "Relações Públicas", "Comunicação Interna", "Gestão de Crise"]
    },
    {
      icon: <Palette size={40} />,
      title: "Desenvolvimento de Marcas",
      description: "Criamos identidades visuais marcantes e estratégias de branding que conectam com o seu público.",
      features: ["Identidade Visual", "Logotipos", "Manual de Marca", "Rebranding"]
    },
    {
      icon: <BarChart3 size={40} />,
      title: "Consultoria Estratégica",
      description: "Análise profunda do seu negócio para identificar oportunidades e definir estratégias de crescimento.",
      features: ["Análise de Mercado", "Planeamento Estratégico", "Consultoria de Negócios", "Análise Competitiva"]
    },
    {
      icon: <Globe size={40} />,
      title: "Presença Digital",
      description: "Criamos e optimizamos a sua presença digital para maximizar o alcance e engagement.",
      features: ["Websites Profissionais", "E-commerce", "Aplicações Mobile", "Optimização Digital"]
    },
    {
      icon: <Megaphone size={40} />,
      title: "Campanhas Publicitárias",
      description: "Desenvolvemos campanhas criativas e eficazes para promover os seus produtos e serviços.",
      features: ["Campanhas Integradas", "Publicidade Tradicional", "Marketing de Conteúdo", "Eventos e Activações"]
    }
  ];

  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="section-header">
          <h2>Nossos Serviços</h2>
          <p>Soluções completas para impulsionar o seu negócio</p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="services-cta">
          <div className="cta-content">
            <h3>Pronto para Impulsionar o Seu Negócio?</h3>
            <p>
              Entre em contacto connosco e descubra como podemos ajudar a sua empresa 
              a alcançar novos patamares de sucesso.
            </p>
            <button 
              className="btn-primary"
              onClick={() => window.open('https://wa.me/244942301884?text=Olá! Gostaria de solicitar um orçamento para os serviços da Queta Boost.', '_blank')}
            >
              Solicitar Orçamento <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
