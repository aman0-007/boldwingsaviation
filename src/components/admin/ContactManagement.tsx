import React, { useState, useEffect } from 'react';
import { Trash2, Eye } from 'lucide-react';
import AdminTable from './shared/AdminTable';
import AdminModal from './shared/AdminModal';
import toast from 'react-hot-toast';

interface Contact {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  message: string;
  createdAt: string;
}

const ContactManagement = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/contact');
      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      toast.error('Failed to load messages');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/contact/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete message');
        }

        toast.success('Message deleted successfully');
        setContacts(contacts.filter(contact => contact._id !== id));
      } catch (error) {
        toast.error('Failed to delete message');
      }
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (error) {
      return dateString;
    }
  };

  const columns = [
    {
      header: 'Name',
      accessor: 'name',
      cell: (contact: Contact) => (
        <span className="font-medium text-gray-900">{contact.name}</span>
      ),
    },
    { header: 'Email', accessor: 'email' },
    { header: 'Mobile', accessor: 'mobile' },
    {
      header: 'Received',
      accessor: 'createdAt',
      cell: (contact: Contact) => (
        <span className="text-gray-600">{formatDate(contact.createdAt)}</span>
      ),
    },
    {
      header: 'Actions',
      accessor: 'actions',
      cell: (contact: Contact) => (
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setSelectedContact(contact);
              setIsViewModalOpen(true);
            }}
            className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
            title="View Details"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDelete(contact._id)}
            className="p-1 text-red-600 hover:text-red-800 transition-colors"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#f9df54]"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Contact Messages</h2>
        <span className="text-sm text-gray-600">
          Total Messages: {contacts.length}
        </span>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <AdminTable columns={columns} data={contacts} />
      </div>

      <AdminModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedContact(null);
        }}
        title="Message Details"
      >
        {selectedContact && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <p className="text-gray-900">{selectedContact.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <p className="text-gray-900">{selectedContact.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
              <p className="text-gray-900">{selectedContact.mobile}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <p className="text-gray-900 whitespace-pre-wrap">{selectedContact.message}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Received On</label>
              <p className="text-gray-900">{formatDate(selectedContact.createdAt)}</p>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
};

export default ContactManagement;