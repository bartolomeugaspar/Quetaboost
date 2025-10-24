// Configuração da API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://quetaboost-back.vercel.app';

// Log para debug (remover em produção)
console.log('🔧 API_BASE_URL:', API_BASE_URL);
console.log('🔧 process.env.REACT_APP_API_URL:', process.env.REACT_APP_API_URL);

// Endpoints da API
const API_ENDPOINTS = {
  // Autenticação
  auth: {
    login: `${API_BASE_URL}/api/auth/login`,
    register: `${API_BASE_URL}/api/auth/register`,
    me: `${API_BASE_URL}/api/auth/me`,
  },

  // Password Reset
  passwordReset: {
    request: `${API_BASE_URL}/api/password-reset/request`,
    verify: `${API_BASE_URL}/api/password-reset/verify`,
    reset: `${API_BASE_URL}/api/password-reset/reset`,
  },

  // Posts
  posts: {
    getAll: `${API_BASE_URL}/api/posts`,
    getById: (id) => `${API_BASE_URL}/api/posts/${id}`,
    getBySlug: (slug) => `${API_BASE_URL}/api/posts/slug/${slug}`,
    create: `${API_BASE_URL}/api/posts`,
    update: (id) => `${API_BASE_URL}/api/posts/${id}`,
    delete: (id) => `${API_BASE_URL}/api/posts/${id}`,
    incrementViews: (id) => `${API_BASE_URL}/api/posts/${id}/view`,
  },

  // Contatos
  contacts: {
    getAll: `${API_BASE_URL}/api/contacts`,
    getById: (id) => `${API_BASE_URL}/api/contacts/${id}`,
    create: `${API_BASE_URL}/api/contacts`,
    update: (id) => `${API_BASE_URL}/api/contacts/${id}`,
    updateStatus: (id) => `${API_BASE_URL}/api/contacts/${id}/status`,
    delete: (id) => `${API_BASE_URL}/api/contacts/${id}`,
  },

  // Usuários
  users: {
    getAll: `${API_BASE_URL}/api/users`,
    getById: (id) => `${API_BASE_URL}/api/users/${id}`,
    create: `${API_BASE_URL}/api/users`,
    update: (id) => `${API_BASE_URL}/api/users/${id}`,
    delete: (id) => `${API_BASE_URL}/api/users/${id}`,
  },

  // Logs
  logs: {
    getAll: `${API_BASE_URL}/api/logs`,
  },

  // Admin/Stats
  admin: {
    stats: `${API_BASE_URL}/api/admin/stats`,
  },
};

// Helper para fazer requisições com autenticação
const apiRequest = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Erro na requisição');
  }

  return data;
};

// Métodos HTTP
const api = {
  get: (url, options = {}) => apiRequest(url, { ...options, method: 'GET' }),
  post: (url, body, options = {}) => apiRequest(url, { ...options, method: 'POST', body: JSON.stringify(body) }),
  put: (url, body, options = {}) => apiRequest(url, { ...options, method: 'PUT', body: JSON.stringify(body) }),
  delete: (url, options = {}) => apiRequest(url, { ...options, method: 'DELETE' }),
};

export { API_BASE_URL, API_ENDPOINTS, api };
export default API_ENDPOINTS;
