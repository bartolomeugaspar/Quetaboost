import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';

function PostsContent({ fetchStats }) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch('http://localhost:5000/api/posts/admin/all', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Tem certeza que deseja excluir este post?')) return;

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        fetchPosts();
        if (fetchStats) fetchStats();
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-PT');
  };

  return (
    <div className="posts-content-new">
      <div className="content-header-new">
        <button 
          className="create-button-new"
          onClick={() => navigate('/admin/posts/new')}
        >
          <Plus size={20} />
          Novo Post
        </button>
      </div>

      <div className="table-container-new">
        <table className="admin-table-new">
          <thead>
            <tr>
              <th>Título</th>
              <th>Categoria</th>
              <th>Status</th>
              <th>Visualizações</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.category}</td>
                <td>
                  <span className={`status-badge ${post.status}`}>
                    {post.status === 'published' ? 'Publicado' : 'Rascunho'}
                  </span>
                </td>
                <td>{post.views}</td>
                <td>{formatDate(post.created_at)}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="action-btn edit"
                      onClick={() => navigate(`/admin/posts/edit/${post.id}`)}
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      className="action-btn delete"
                      onClick={() => handleDelete(post.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PostsContent;
