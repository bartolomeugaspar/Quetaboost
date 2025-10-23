import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';

function PostEditor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    image: '',
    category: 'Geral',
    tags: '',
    status: 'draft'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:5000/api/posts/admin/all`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      const post = data.posts.find(p => p.id === parseInt(id));

      if (post) {
        setFormData({
          title: post.title,
          content: post.content,
          excerpt: post.excerpt,
          image: post.image || '',
          category: post.category,
          tags: post.tags ? post.tags.join(', ') : '',
          status: post.status
        });
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      setError('Erro ao carregar post');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const token = localStorage.getItem('token');

    // Process tags
    const tagsArray = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    const postData = {
      ...formData,
      tags: tagsArray
    };

    try {
      const url = isEditMode 
        ? `http://localhost:5000/api/posts/${id}`
        : 'http://localhost:5000/api/posts';

      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao salvar post');
      }

      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-editor-container">
      <div className="container">
        <div className="editor-header">
          <button 
            className="back-button"
            onClick={() => navigate('/admin/dashboard')}
          >
            <ArrowLeft size={20} />
            Voltar
          </button>
          <h1>{isEditMode ? 'Editar Post' : 'Novo Post'}</h1>
        </div>

        <form onSubmit={handleSubmit} className="post-editor-form">
          {error && (
            <div className="error-message">{error}</div>
          )}

          <div className="form-group">
            <label htmlFor="title">Título *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Digite o título do post"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Categoria</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Geral">Geral</option>
                <option value="Marketing Digital">Marketing Digital</option>
                <option value="Comunicação">Comunicação</option>
                <option value="Estratégia">Estratégia</option>
                <option value="Branding">Branding</option>
                <option value="Redes Sociais">Redes Sociais</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="draft">Rascunho</option>
                <option value="published">Publicado</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="image">URL da Imagem</label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://exemplo.com/imagem.jpg"
            />
          </div>

          <div className="form-group">
            <label htmlFor="excerpt">Resumo</label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Breve resumo do post (opcional)"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Conteúdo *</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Digite o conteúdo completo do post (HTML permitido)"
              rows="15"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags (separadas por vírgula)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="marketing, digital, estratégia"
            />
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-button"
              onClick={() => navigate('/admin/dashboard')}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="save-button"
              disabled={loading}
            >
              <Save size={20} />
              {loading ? 'Salvando...' : 'Salvar Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostEditor;
