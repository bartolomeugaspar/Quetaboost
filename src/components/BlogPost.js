import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Tag, Eye } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/posts/slug/${slug}`);
      if (!response.ok) {
        throw new Error('Post not found');
      }
      const data = await response.json();
      setPost(data.post);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching post:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-PT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleBack = () => {
    navigate('/#blog');
  };

  if (loading) {
    return (
      <div className="blog-post-container">
        <div className="container">
          <div className="loading-spinner">Carregando post...</div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="blog-post-container">
        <div className="container">
          <div className="error-message">
            Post não encontrado.
          </div>
          <button className="back-button" onClick={handleBack}>
            <ArrowLeft size={20} />
            Voltar ao Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post-container">
      <div className="container">
        <button className="back-button" onClick={handleBack}>
          <ArrowLeft size={20} />
          Voltar ao Blog
        </button>

        <article className="blog-post">
          {post.image && (
            <div className="blog-post-image">
              <img src={post.image} alt={post.title} />
            </div>
          )}

          <div className="blog-post-header">
            <div className="blog-post-category">{post.category}</div>
            <h1 className="blog-post-title">{post.title}</h1>

            <div className="blog-post-meta">
              <span className="meta-item">
                <Calendar size={18} />
                {formatDate(post.created_at)}
              </span>
              <span className="meta-item">
                <Eye size={18} />
                {post.views} visualizações
              </span>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="blog-post-tags">
                <Tag size={18} />
                {post.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div 
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="blog-post-footer">
            <button className="back-button" onClick={handleBack}>
              <ArrowLeft size={20} />
              Voltar ao Blog
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}

export default BlogPost;
