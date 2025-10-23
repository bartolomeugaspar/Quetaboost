import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Mail } from 'lucide-react';

function ContactsContent({ fetchStats }) {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);

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
                  <a 
                    href={`mailto:${contact.email}`}
                    className="action-btn email"
                  >
                    <Mail size={16} />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ContactsContent;
