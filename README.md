# Queta Boost - Website Profissional

Website profissional para a **Queta Boost**, empresa angolana de consultoria estratégica e comunicação digital, liderada por Paulo Queta.

## 🌟 Sobre o Projeto

Website moderno, elegante e totalmente responsivo desenvolvido em React, com design sofisticado em **preto e dourado**, refletindo a identidade visual da marca Queta Boost.

### Seções Principais

- **🏠 Home**: Hero section com imagem de fundo impactante e introdução da empresa
- **👥 Sobre Nós**: História da empresa, liderança (Paulo Queta), valores, missão e visão
- **💼 Nossos Serviços**: 6 serviços principais com descrições detalhadas
  - Marketing Digital
  - Comunicação Estratégica
  - Desenvolvimento de Marcas
  - Consultoria Estratégica
  - Presença Digital.
  - Campanhas Publicitárias
- **📞 Contactos**: Informações de contacto, formulário e integração com WhatsApp

## ✨ Características

- ✅ **Design Sofisticado**: Paleta de cores preta e dourada
- ✅ **100% Responsivo**: Otimizado para desktop, tablet e mobile
- ✅ **Navegação Suave**: Scroll suave entre seções
- ✅ **WhatsApp Integrado**: Botão direto para contacto via WhatsApp
- ✅ **Menu Hambúrguer Elegante**: Menu mobile com animações suaves
- ✅ **Galeria de Imagens**: Showcase visual da empresa
- ✅ **Animações Modernas**: Transições e efeitos elegantes
- ✅ **SEO-Friendly**: Estrutura otimizada para motores de busca
- ✅ **Performance Otimizada**: Carregamento rápido

## 🎨 Paleta de Cores

```css
--primary-color: #1a1a1a      /* Preto elegante */
--gold-color: #c9a05f         /* Dourado */
--secondary-color: #d4a574    /* Bronze */
--accent-color: #4a9b9f       /* Azul esverdeado */
```

## 🛠️ Tecnologias Utilizadas

- **React 18** - Framework JavaScript
- **CSS3** - Estilização com variáveis customizadas
- **Lucide React** - Biblioteca de ícones moderna
- **Google Fonts (Inter)** - Tipografia profissional
- **WhatsApp API** - Integração para contacto direto

## 🚀 Como Executar

### 1. Instalar Dependências
```bash
npm install
```

### 2. Executar em Modo de Desenvolvimento
```bash
npm start
```
O website estará disponível em `http://localhost:3000`

### 3. Criar Build de Produção
```bash
npm run build
```

## 📁 Estrutura do Projeto

```
QuetaBoot/
├── public/
│   ├── images/              # Imagens do site
│   │   ├── hero-background.jpeg
│   │   ├── logo.jpeg
│   │   ├── about-image.jpeg
│   │   └── ...
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Home.js          # Página inicial com hero
│   │   ├── About.js         # Sobre nós e valores
│   │   ├── Services.js      # Serviços oferecidos
│   │   └── Contact.js       # Contactos e footer
│   ├── images/              # Imagens importadas
│   ├── App.js               # Componente principal
│   ├── App.css              # Estilos principais
│   ├── index.js             # Ponto de entrada
│   └── index.css            # Estilos globais
├── package.json
└── README.md
```

## 🎯 Funcionalidades Principais

### WhatsApp Integration
- Botão "Solicitar Orçamento" abre WhatsApp diretamente
- Número: **+244 942 301 884**
- Mensagem pré-preenchida para facilitar contacto

### Navegação Responsiva
- Menu desktop elegante com fundo preto
- Menu hambúrguer mobile com animação bounce
- Links com hover dourado

### Hero Section
- Imagem de fundo profissional
- Texto posicionado à direita (desktop)
- Centralizado em mobile
- Overlay escuro para legibilidade

## 🎨 Personalização

### Alterar Cores
Edite as variáveis CSS em `src/App.css`:
```css
:root {
  --primary-color: #1a1a1a;
  --gold-color: #c9a05f;
  /* ... outras cores */
}
```

### Alterar Conteúdo
- **Textos**: Edite os componentes em `src/components/`
- **Imagens**: Substitua as imagens em `public/images/`
- **Serviços**: Modifique o array `services` em `Services.js`

### Configurar WhatsApp
Altere o número em `Services.js`:
```javascript
onClick={() => window.open('https://wa.me/SEU_NUMERO', '_blank')}
```

## 📱 Responsividade

### Breakpoints
- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px
- **Mobile Small**: < 480px

### Otimizações Mobile
- Menu hambúrguer compacto
- Texto centralizado no hero
- Cards empilhados verticalmente
- Imagens otimizadas
- Botões em largura total

## 🌐 Deploy

### Plataformas Recomendadas
- **Netlify** (Recomendado)
- **Vercel**
- **GitHub Pages**
- **Heroku**

### Deploy Rápido (Netlify)
```bash
npm run build
# Arraste a pasta 'build' para netlify.com
```

## 📞 Informações de Contacto

- **WhatsApp**: +244 942 301 884
- **Telefone**: +244 954 931 747
- **Email**: quetaboost@gmail.com
- **Localização**: Luanda, Angola

## 👨‍💻 Desenvolvedor

**Bartolomeu Gaspar**

## 📄 Licença

© 2025 Queta Boost. Todos os direitos reservados.

---

**Queta Boost** - Impulsionando o crescimento de negócios em Angola 🇦🇴
