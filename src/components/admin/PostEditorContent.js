import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Save, 
  X,
  Eye, 
  Image as ImageIcon, 
  Tag, 
  Folder,
  AlertCircle,
  Send,
  FileText
} from 'lucide-react';

function PostEditorContent({ fetchStats }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    image: '',
    category: '',
    tags: '',
    status: 'draft'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showSettings, setShowSettings] = useState(false);

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
          excerpt: post.excerpt || '',
          image: post.image || '',
          category: post.category || '',
          tags: Array.isArray(post.tags) ? post.tags.join(', ') : '',
          status: post.status
        });
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      setError('Erro ao carregar post');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Update character counts
    if (name === 'title' || name === 'excerpt' || name === 'content') {
      setCharCounts({
        ...charCounts,
        [name]: value.length
      });
    }
  };

  const categories = [
    'Marketing Digital',
    'Redes Sociais',
    'SEO',
    'Branding',
    'Estratégia',
    'Comunicação',
    'Publicidade',
    'Design',
    'Conteúdo',
    'Outro'
  ];

  const getStatusInfo = (status) => {
    switch(status) {
      case 'published':
        return { icon: CheckCircle, text: 'Publicado', color: '#10b981' };
      case 'draft':
        return { icon: Clock, text: 'Rascunho', color: '#f59e0b' };
      default:
        return { icon: AlertCircle, text: 'Indefinido', color: '#6b7280' };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const token = localStorage.getItem('token');

    const postData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
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

      if (fetchStats) fetchStats();
      navigate('/admin/posts');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const statusInfo = getStatusInfo(formData.status);
  const StatusIcon = statusInfo.icon;

  return (
    <div className="editor-content-wrapper">
      <div className="editor-content-header">
        <div className="header-actions">
          <button 
            className="back-button-inline"
            onClick={() => navigate('/admin/posts')}
          >
            <ArrowLeft size={20} />
            Voltar para Posts
          </button>

          <button 
            type="button"
            className="preview-button"
            onClick={() => setShowPreview(!showPreview)}
          >
            <Eye size={20} />
            {showPreview ? 'Editar' : 'Preview'}
          </button>
        </div>

        <div className="post-status-badge" style={{ borderColor: statusInfo.color }}>
          <StatusIcon size={18} style={{ color: statusInfo.color }} />
          <span style={{ color: statusInfo.color }}>{statusInfo.text}</span>
        </div>
      </div>

      {showPreview ? (
        <div className="post-preview-container">
          <div className="preview-card">
            <div className="preview-header">
              <h2>Preview do Post</h2>
              <button 
                className="close-preview"
                onClick={() => setShowPreview(false)}
              >
                ✕
              </button>
            </div>
            
            {formData.image && (
              <div className="preview-image">
                <img src={formData.image} alt={formData.title} />
              </div>
            )}
            
            <div className="preview-content">
              <div className="preview-meta">
                {formData.category && (
                  <span className="preview-category">{formData.category}</span>
                )}
                {formData.tags && (
                  <div className="preview-tags">
                    {formData.tags.split(',').map((tag, i) => (
                      <span key={i} className="preview-tag">{tag.trim()}</span>
                    ))}
                  </div>
                )}
              </div>
              
              <h1 className="preview-title">{formData.title || 'Título do Post'}</h1>
              
              {formData.excerpt && (
                <p className="preview-excerpt">{formData.excerpt}</p>
              )}
              
              <div 
                className="preview-body" 
                dangerouslySetInnerHTML={{ __html: formData.content || '<p>Conteúdo do post...</p>' }}
              />
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="editor-form-inline post-editor-enhanced">
        <div className="form-header">
          <h2>{isEditMode ? 'Editar Post' : 'Criar Novo Post'}</h2>
          <p>Preencha os dados abaixo para {isEditMode ? 'atualizar' : 'criar'} o post</p>
        </div>

        <div className="form-body">
          {error && (
            <div className="error-message">
              <AlertCircle size={20} />
              {error}
            </div>
          )}

          {/* Título */}
          <div className="form-section">
            <h3 className="form-section-title">
              <FileText size={20} />
              Título e Identificação
            </h3>

            <div className="form-group">
              <label htmlFor="title">
                Título do Post
                <span className="required">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Digite um título atraente e descritivo"
                required
                maxLength="100"
                className="input-large"
              />
              <div className="input-footer">
                <small>💡 Use um título claro e objetivo (máx. 100 caracteres)</small>
                <span className={`char-counter ${charCounts.title > 80 ? 'warning' : ''} ${charCounts.title > 95 ? 'danger' : ''}`}>
                  {charCounts.title}/100
                </span>
              </div>
            </div>
          </div>

          {/* Categoria e Status */}
          <div className="form-section">
            <h3 className="form-section-title">
              <Folder size={20} />
              Organização
            </h3>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">
                  <Folder size={18} />
                  Categoria
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <small>📁 Ajuda a organizar e filtrar os posts</small>
              </div>

              <div className="form-group">
                <label htmlFor="status">
                  <CheckCircle size={18} />
                  Status de Publicação
                  <span className="required">*</span>
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                  className="status-select-enhanced"
                >
                  <option value="draft">📝 Rascunho (não visível)</option>
                  <option value="published">✅ Publicado (visível no site)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="tags">
                <Tag size={18} />
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="marketing, digital, estratégia, redes sociais"
              />
              <small>🏷️ Separe as tags com vírgulas para melhor organização</small>
            </div>
          </div>

          {/* Imagem */}
          <div className="form-section">
            <h3 className="form-section-title">
              <ImageIcon size={20} />
              Imagem de Destaque
            </h3>

            <div className="form-group">
              <label htmlFor="image">
                <ImageIcon size={18} />
                URL da Imagem
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://exemplo.com/imagem.jpg"
              />
              <small>🖼️ Recomendado: 1200x630px para melhor visualização</small>
            </div>

            {formData.image && (
              <div className="image-preview">
                <p className="preview-label">Preview da Imagem:</p>
                <img src={formData.image} alt="Preview" onError={(e) => e.target.style.display = 'none'} />
              </div>
            )}
          </div>

          {/* Resumo */}
          <div className="form-section">
            <h3 className="form-section-title">
              <FileText size={20} />
              Resumo
            </h3>

            <div className="form-group">
              <label htmlFor="excerpt">
                Resumo do Post
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="Escreva um breve resumo que aparecer á na listagem de posts..."
                rows="4"
                maxLength="300"
              />
              <div className="input-footer">
                <small>📝 Resumo atraente que aparece nas listagens (máx. 300 caracteres)</small>
                <span className={`char-counter ${charCounts.excerpt > 250 ? 'warning' : ''} ${charCounts.excerpt > 290 ? 'danger' : ''}`}>
                  {charCounts.excerpt}/300
                </span>
              </div>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="form-section">
            <h3 className="form-section-title">
              <FileText size={20} />
              Conteúdo Completo
            </h3>

            <div className="form-group">
              <label htmlFor="content">
                Conteúdo do Post
                <span className="required">*</span>
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Escreva o conteúdo completo do post aqui. HTML é permitido para formatação..."
                rows="15"
                required
                className="content-editor"
              />
              <div className="input-footer">
                <small>✍️ HTML permitido: &lt;p&gt;, &lt;h2&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;ol&gt;, &lt;a&gt;</small>
                <span className="char-counter">
                  {charCounts.content} caracteres
                </span>
              </div>
            </div>

            <div className="editor-tips">
              <strong>💡 Dicas de Formatação:</strong>
              <ul>
                <li>&lt;p&gt;Parágrafo&lt;/p&gt;</li>
                <li>&lt;h2&gt;Subtítulo&lt;/h2&gt;</li>
                <li>&lt;strong&gt;Negrito&lt;/strong&gt;</li>
                <li>&lt;em&gt;Itálico&lt;/em&gt;</li>
                <li>&lt;a href="url"&gt;Link&lt;/a&gt;</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            className="cancel-button"
            onClick={() => navigate('/admin/posts')}
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            className="save-button"
            disabled={loading}
          >
            <Save size={20} />
            {loading ? 'Salvando...' : isEditMode ? 'Atualizar Post' : 'Publicar Post'}
          </button>
        </div>
      </form>
      )}
    </div>
  );
}

export default PostEditorContent;
