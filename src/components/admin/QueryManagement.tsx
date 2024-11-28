import React, { useState, useEffect } from 'react';
import { Check, X, RefreshCw, Eye } from 'lucide-react';
import AdminTable from './shared/AdminTable';
import AdminModal from './shared/AdminModal';
import toast from 'react-hot-toast';

interface Query {
  _id: string;
  courseId: {
    _id: string;
    title: string;
  };
  name: string;
  email: string;
  contact: string;
  query: string;
  status: 'pending' | 'contacted' | 'closed';
  createdAt: string;
}

const QueryManagement = () => {
  const [queries, setQueries] = useState<Query[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedQuery, setSelectedQuery] = useState<Query | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/queries');
      const data = await response.json();
      setQueries(data);
    } catch (error) {
      toast.error('Failed to fetch queries');
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/queries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      toast.success('Status updated successfully');
      fetchQueries();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const deleteQuery = async (id: string) => {
    if (confirm('Are you sure you want to delete this query?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/queries/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete query');
        }

        toast.success('Query deleted successfully');
        setQueries(queries.filter(query => query._id !== id));
      } catch (error) {
        toast.error('Failed to delete query');
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'contacted':
        return 'bg-blue-100 text-blue-800';
      case 'closed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const columns = [
    { 
      header: 'Course', 
      accessor: 'courseId.title',
      cell: (query: Query) => (
        <span className="font-medium text-gray-900">{query.courseId.title}</span>
      ),
    },
    { header: 'Name', accessor: 'name' },
    { header: 'Contact', accessor: 'contact' },
    { header: 'Email', accessor: 'email' },
    {
      header: 'Status',
      accessor: 'status',
      cell: (query: Query) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(query.status)}`}>
          {query.status}
        </span>
      ),
    },
    {
      header: 'Received',
      accessor: 'createdAt',
      cell: (query: Query) => formatDate(query.createdAt),
    },
    {
      header: 'Actions',
      accessor: 'actions',
      cell: (query: Query) => (
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setSelectedQuery(query);
              setIsModalOpen(true);
            }}
            className="p-1 text-blue-600 hover:text-blue-800"
            title="View Details"
          >
            <Eye className="h-4 w-4" />
          </button>
          {query.status === 'pending' && (
            <button
              onClick={() => updateStatus(query._id, 'contacted')}
              className="p-1 text-blue-600 hover:text-blue-800"
              title="Mark as Contacted"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          )}
          {query.status === 'contacted' && (
            <button
              onClick={() => updateStatus(query._id, 'closed')}
              className="p-1 text-green-600 hover:text-green-800"
              title="Mark as Closed"
            >
              <Check className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={() => deleteQuery(query._id)}
            className="p-1 text-red-600 hover:text-red-800"
            title="Delete"
          >
            <X className="h-4 w-4" />
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
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Course Queries</h2>
        <div className="text-sm text-gray-600">
          Total Queries: {queries.length}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <AdminTable columns={columns} data={queries} />
      </div>

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedQuery(null);
        }}
        title="Query Details"
      >
        {selectedQuery && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
              <p className="text-gray-900 font-medium">{selectedQuery.courseId.title}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <p className="text-gray-900">{selectedQuery.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <p className="text-gray-900">{selectedQuery.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
              <p className="text-gray-900">{selectedQuery.contact}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Query</label>
              <p className="text-gray-900 whitespace-pre-wrap">{selectedQuery.query}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedQuery.status)}`}>
                {selectedQuery.status}
              </span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Received On</label>
              <p className="text-gray-900">{formatDate(selectedQuery.createdAt)}</p>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
};

export default QueryManagement;