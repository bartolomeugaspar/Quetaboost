import React, { useState, useEffect } from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/posts`);
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setPosts(data.posts || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching posts:', err);
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

  const handleReadMore = (slug) => {
    window.location.href = `/blog/${slug}`;
  };

  if (loading) {
    return (
      <section id="blog" className="section">
        <div className="container">
          <h2 className="section-title">Blog</h2>
          <div className="loading-spinner">Carregando posts...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="blog" className="section">
        <div className="container">
          <h2 className="section-title">Blog</h2>
          <div className="error-message">
            Erro ao carregar posts. Por favor, tente novamente mais tarde.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="section">
      <div className="container">
        <h2 className="section-title">Blog</h2>
        <p className="section-subtitle">
          Insights, tendências e estratégias para impulsionar o seu negócio
        </p>

        {posts.length === 0 ? (
          <div className="no-posts">
            <p>Nenhum post disponível no momento.</p>
          </div>
        ) : (
          <div className="blog-grid">
            {posts.map((post) => (
              <article key={post.id} className="blog-card">
                {post.image && (
                  <div className="blog-card-image">
                    <img src={post.image} alt={post.title} />
                    <div className="blog-card-category">{post.category}</div>
                  </div>
                )}
                
                <div className="blog-card-content">
                  <h3 className="blog-card-title">{post.title}</h3>
                  
                  <div className="blog-card-meta">
                    <span className="meta-item">
                      <Calendar size={16} />
                      {formatDate(post.created_at)}
                    </span>
                    <span className="meta-item">
                      <Eye size={16} />
                      {post.views} visualizações
                    </span>
                  </div>

                  <p className="blog-card-excerpt">{post.excerpt}</p>

                  {post.tags && post.tags.length > 0 && (
                    <div className="blog-card-tags">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <button 
                    className="blog-card-button"
                    onClick={() => handleReadMore(post.slug)}
                  >
                    Ler mais
                    <ArrowRight size={18} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Blog;
