import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  X,
  Image as ImageIcon, 
  Tag, 
  Folder,
  Check,
  Settings,
  Save,
  Send,
  AlertCircle
} from 'lucide-react';
import { API_ENDPOINTS, API_BASE_URL } from '../../config/api';

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
  const [isSaved, setIsSaved] = useState(true);

  useEffect(() => {
    if (isEditMode) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${API_BASE_URL}/api/posts/admin/all`, {
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
    setIsSaved(false);
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
        ? API_ENDPOINTS.posts.update(id)
        : API_ENDPOINTS.posts.create;

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
      setIsSaved(true);
      setTimeout(() => navigate('/admin/posts'), 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    setFormData({ ...formData, status: 'published' });
    await handleSubmit(new Event('submit'));
  };

  const handleSaveDraft = async () => {
    setFormData({ ...formData, status: 'draft' });
    await handleSubmit(new Event('submit'));
  };

  return (
    <div className="post-editor-enhanced">
      <form onSubmit={handleSubmit} className="editor-form-modern">
        {/* Header com ações */}
       

        {error && (
          <div className="editor-alert error">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* Editor Principal */}
        <div className="editor-workspace">
          <div className="editor-main-content">
            {/* Título */}
            <div className="title-section">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Título do seu post..."
                className="title-input"
                autoFocus
              />
            </div>

            {/* Imagem de Capa */}
            {formData.image && (
              <div className="cover-image-section">
                <img src={formData.image} alt="Capa" />
                <button
                  type="button"
                  className="btn-remove-cover"
                  onClick={() => setFormData({ ...formData, image: '' })}
                >
                  <X size={16} />
                </button>
              </div>
            )}

            {/* Resumo */}
            <div className="excerpt-section">
              <label>Resumo do Post <span className="required">*</span></label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="Escreva um breve resumo que aparecerá nas listagens..."
                rows="2"
                maxLength="300"
                required
              />
              <span className="char-count">{formData.excerpt.length}/300</span>
            </div>

            {/* Conteúdo */}
            <div className="content-section">
              <label>Conteúdo do Post <span className="required">*</span></label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Escreva o conteúdo do seu post aqui. Você pode usar HTML para formatação..."
                rows="12"
                required
              />
            </div>
          </div>

          {/* Sidebar de Configurações */}
          <div className="editor-sidebar visible">
            <div className="sidebar-header">
              <h3>
                <Settings size={20} />
                Configurações
              </h3>
            </div>

            <div className="sidebar-content">
              {/* Imagem */}
              <div className="config-group">
                <label>
                  <ImageIcon size={18} />
                  Imagem de Capa <span className="required">*</span>
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://exemplo.com/imagem.jpg"
                  required
                />
                <small>Recomendado: 1200x630px</small>
              </div>

              {/* Categoria */}
              <div className="config-group">
                <label>
                  <Folder size={18} />
                  Categoria <span className="required">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div className="config-group">
                <label>
                  <Tag size={18} />
                  Tags <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="marketing, digital, seo"
                  required
                />
                <small>Separe com vírgulas</small>
              </div>

              {/* Status */}
              <div className="config-group">
                <label>Status de Publicação</label>
                <div className="status-options">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="status"
                      value="draft"
                      checked={formData.status === 'draft'}
                      onChange={handleChange}
                    />
                    <span>📝 Rascunho</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="status"
                      value="published"
                      checked={formData.status === 'published'}
                      onChange={handleChange}
                    />
                    <span>✅ Publicado</span>
                  </label>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="config-group">
                <div className="action-buttons-row">
                  <button
                    type="submit"
                    className="btn-save-draft-sidebar"
                    onClick={() => setFormData({ ...formData, status: 'draft' })}
                    disabled={loading}
                  >
                    <Save size={18} />
                    Rascunho
                  </button>
                  <button
                    type="submit"
                    className="btn-publish-sidebar"
                    onClick={() => setFormData({ ...formData, status: 'published' })}
                    disabled={loading || !formData.title || !formData.excerpt || !formData.content || !formData.image || !formData.category || !formData.tags}
                  >
                    <Send size={18} />
                    {formData.status === 'published' ? 'Atualizar' : 'Publicar'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
export default PostEditorContent;