import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Mail, Eye } from 'lucide-react';

function ContactsContent({ fetchStats }) {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch('http://localhost:5000/api/contacts', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setContacts(data.contacts || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleUpdateStatus = async (contactId, newStatus) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/contacts/${contactId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        fetchContacts();
        if (fetchStats) fetchStats();
      }
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-PT');
  };

  const handleViewMessage = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedContact(null);
  };

  return (
    <div className="contacts-content-new">
      <div className="content-header-new">
        <button 
          className="create-button-new"
          onClick={() => navigate('/admin/contacts/new')}
        >
          <Plus size={20} />
          Novo Contato
        </button>
      </div>

      <div className="table-container-new">
        <table className="admin-table-new">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Mensagem</th>
              <th>Status</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(contact => (
              <tr key={contact.id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone || '-'}</td>
                <td className="message-cell">{contact.message}</td>
                <td>
                  <select 
                    className={`status-select ${contact.status}`}
                    value={contact.status}
                    onChange={(e) => handleUpdateStatus(contact.id, e.target.value)}
                  >
                    <option value="new">Novo</option>
                    <option value="read">Lido</option>
                    <option value="responded">Respondido</option>
                    <option value="archived">Arquivado</option>
                  </select>
                </td>
                <td>{formatDate(contact.created_at)}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="action-btn view"
                      onClick={() => handleViewMessage(contact)}
                      title="Visualizar mensagem"
                    >
                      <Eye size={16} />
                    </button>
                    <a 
                      href={`mailto:${contact.email}`}
                      className="action-btn email"
                      title="Enviar email"
                    >
                      <Mail size={16} />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para visualizar mensagem */}
      {showModal && selectedContact && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Mensagem de {selectedContact.name}</h3>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="contact-detail">
                <strong>Nome:</strong> {selectedContact.name}
              </div>
              <div className="contact-detail">
                <strong>Email:</strong> {selectedContact.email}
              </div>
              <div className="contact-detail">
                <strong>Telefone:</strong> {selectedContact.phone || 'Não informado'}
              </div>
              <div className="contact-detail">
                <strong>Data:</strong> {formatDate(selectedContact.created_at)}
              </div>
              <div className="contact-detail">
                <strong>Status:</strong> 
                <span className={`status-badge ${selectedContact.status}`} style={{ marginLeft: '8px' }}>
                  {selectedContact.status === 'new' ? 'Novo' : 
                   selectedContact.status === 'read' ? 'Lido' :
                   selectedContact.status === 'responded' ? 'Respondido' : 'Arquivado'}
                </span>
              </div>
              <div className="contact-detail message-detail">
                <strong>Mensagem:</strong>
                <p>{selectedContact.message}</p>
              </div>
            </div>
            <div className="modal-footer">
              <a 
                href={`mailto:${selectedContact.email}`}
                className="btn-primary"
              >
                <Mail size={16} /> Responder por Email
              </a>
              <button className="btn-secondary" onClick={closeModal}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactsContent;
