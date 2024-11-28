import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Edit2, Trash2, Plus, Link, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminModal from './shared/AdminModal';
import AdminTable from './shared/AdminTable';

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  image: string;
  description: string;
  isLocal: boolean;
}

const TestimonialManagement = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadType, setUploadType] = useState<'url' | 'file'>('url');
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const { register, handleSubmit, reset, setValue } = useForm<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/testimonials');
      const data = await response.json();
      setTestimonials(data);
    } catch (error) {
      toast.error('Failed to fetch testimonials');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      let response;
      const formData = new FormData();
      const isEditing = !!editingTestimonial;

      if (uploadType === 'file' && data.image[0]) {
        formData.append('name', data.name);
        formData.append('role', data.role);
        formData.append('description', data.description);
        formData.append('image', data.image[0]);

        const url = isEditing
          ? `http://localhost:3000/api/testimonials/${editingTestimonial._id}`
          : 'http://localhost:3000/api/testimonials/upload';

        response = await fetch(url, {
          method: isEditing ? 'PUT' : 'POST',
          body: formData,
        });
      } else {
        const payload = {
          name: data.name,
          role: data.role,
          description: data.description,
          image: data.image_url,
        };

        const url = isEditing
          ? `http://localhost:3000/api/testimonials/${editingTestimonial._id}`
          : 'http://localhost:3000/api/testimonials/url';

        response = await fetch(url, {
          method: isEditing ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) {
        throw new Error(isEditing ? 'Failed to update testimonial' : 'Failed to add testimonial');
      }

      toast.success(isEditing ? 'Testimonial updated successfully' : 'Testimonial added successfully');
      fetchTestimonials();
      closeModal();
    } catch (error) {
      toast.error(editingTestimonial ? 'Failed to update testimonial' : 'Failed to add testimonial');
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/testimonials/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete testimonial');
        }

        toast.success('Testimonial deleted successfully');
        setTestimonials(testimonials.filter(testimonial => testimonial._id !== id));
      } catch (error) {
        toast.error('Failed to delete testimonial');
      }
    }
  };

  const openModal = (testimonial?: Testimonial) => {
    if (testimonial) {
      setEditingTestimonial(testimonial);
      setUploadType('url');
      Object.keys(testimonial).forEach((key) => {
        setValue(key as keyof Testimonial, testimonial[key as keyof Testimonial]);
      });
    } else {
      setEditingTestimonial(null);
      reset();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTestimonial(null);
    setUploadType('url');
    reset();
  };

  const columns = [
    { 
      header: 'Image', 
      accessor: 'image',
      cell: (testimonial: Testimonial) => (
        <img
          src={testimonial.isLocal ? `http://localhost:3000${testimonial.image}` : testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover"
        />
      )
    },
    { header: 'Name', accessor: 'name' },
    { header: 'Role', accessor: 'role' },
    { 
      header: 'Description', 
      accessor: 'description',
      cell: (testimonial: Testimonial) => (
        <div className="max-w-xs truncate">{testimonial.description}</div>
      )
    },
    {
      header: 'Actions',
      accessor: 'actions',
      cell: (testimonial: Testimonial) => (
        <div className="flex space-x-2">
          <button
            onClick={() => openModal(testimonial)}
            className="p-1 text-blue-600 hover:text-blue-800"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => deleteTestimonial(testimonial._id)}
            className="p-1 text-red-600 hover:text-red-800"
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
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Testimonial Management</h2>
        <button
          onClick={() => openModal()}
          className="flex items-center px-4 py-2 bg-[#f9df54] text-gray-900 rounded-lg hover:bg-[#f8f260]"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Testimonial
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <AdminTable columns={columns} data={testimonials} />
      </div>

      <AdminModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}
      >
        <div className="mb-4">
          <div className="flex space-x-4 mb-4">
            <button
              type="button"
              onClick={() => setUploadType('url')}
              className={`flex items-center px-4 py-2 rounded-lg ${
                uploadType === 'url'
                  ? 'bg-[#f9df54] text-gray-900'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Link className="h-4 w-4 mr-2" />
              URL
            </button>
            <button
              type="button"
              onClick={() => setUploadType('file')}
              className={`flex items-center px-4 py-2 rounded-lg ${
                uploadType === 'file'
                  ? 'bg-[#f9df54] text-gray-900'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              {...register('name', { required: true })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <input
              {...register('role', { required: true })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {uploadType === 'url' ? (
            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <input
                {...register('image_url', { required: uploadType === 'url' })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium mb-1">Image File</label>
              <input
                type="file"
                accept="image/*"
                {...register('image', { required: !editingTestimonial && uploadType === 'file' })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              {...register('description', { required: true })}
              rows={3}
              className="w-full px-3 py-2 border rounded-lg resize-none"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#f9df54] text-gray-900 rounded-lg hover:bg-[#f8f260]"
            >
              {editingTestimonial ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
};

export default TestimonialManagement;