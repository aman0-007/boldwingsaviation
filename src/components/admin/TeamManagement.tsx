import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Edit2, Trash2, Plus, Link, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminModal from './shared/AdminModal';
import AdminTable from './shared/AdminTable';

interface TeamMember {
  _id: string;
  name: string;
  designation: string;
  image: string;
  intro: string;
  isLocal: boolean;
}

const TeamManagement = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadType, setUploadType] = useState<'url' | 'file'>('url');
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const { register, handleSubmit, reset, setValue } = useForm<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/team');
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      toast.error('Failed to fetch team members');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      let response;
      const formData = new FormData();
      const isEditing = !!editingMember;

      if (uploadType === 'file' && data.image[0]) {
        formData.append('name', data.name);
        formData.append('designation', data.designation);
        formData.append('intro', data.intro);
        formData.append('image', data.image[0]);

        const url = isEditing
          ? `http://localhost:3000/api/team/${editingMember._id}`
          : 'http://localhost:3000/api/team/upload';

        response = await fetch(url, {
          method: isEditing ? 'PUT' : 'POST',
          body: formData,
        });
      } else {
        const payload = {
          name: data.name,
          designation: data.designation,
          intro: data.intro,
          image: data.image_url,
        };

        const url = isEditing
          ? `http://localhost:3000/api/team/${editingMember._id}`
          : 'http://localhost:3000/api/team/url';

        response = await fetch(url, {
          method: isEditing ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) {
        throw new Error(isEditing ? 'Failed to update member' : 'Failed to add member');
      }

      toast.success(isEditing ? 'Member updated successfully' : 'Member added successfully');
      fetchTeamMembers();
      closeModal();
    } catch (error) {
      toast.error(editingMember ? 'Failed to update member' : 'Failed to add member');
    }
  };

  const deleteMember = async (id: string) => {
    if (confirm('Are you sure you want to delete this member?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/team/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete member');
        }

        toast.success('Member deleted successfully');
        setMembers(members.filter(member => member._id !== id));
      } catch (error) {
        toast.error('Failed to delete member');
      }
    }
  };

  const openModal = (member?: TeamMember) => {
    if (member) {
      setEditingMember(member);
      setUploadType('url');
      Object.keys(member).forEach((key) => {
        setValue(key as keyof TeamMember, member[key as keyof TeamMember]);
      });
    } else {
      setEditingMember(null);
      reset();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMember(null);
    setUploadType('url');
    reset();
  };

  const columns = [
    { 
      header: 'Image', 
      accessor: 'image',
      cell: (member: TeamMember) => (
        <img
          src={member.isLocal ? `http://localhost:3000${member.image}` : member.image}
          alt={member.name}
          className="w-12 h-12 rounded-full object-cover"
        />
      )
    },
    { header: 'Name', accessor: 'name' },
    { header: 'Designation', accessor: 'designation' },
    {
      header: 'Actions',
      accessor: 'actions',
      cell: (member: TeamMember) => (
        <div className="flex space-x-2">
          <button
            onClick={() => openModal(member)}
            className="p-1 text-blue-600 hover:text-blue-800"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => deleteMember(member._id)}
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
        <h2 className="text-2xl font-bold">Team Management</h2>
        <button
          onClick={() => openModal()}
          className="flex items-center px-4 py-2 bg-[#f9df54] text-gray-900 rounded-lg hover:bg-[#f8f260]"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Member
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <AdminTable columns={columns} data={members} />
      </div>

      <AdminModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingMember ? 'Edit Team Member' : 'Add Team Member'}
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
            <label className="block text-sm font-medium mb-1">Designation</label>
            <input
              {...register('designation', { required: true })}
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
                {...register('image', { required: !editingMember && uploadType === 'file' })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Introduction</label>
            <textarea
              {...register('intro', { required: true })}
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
              {editingMember ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
};

export default TeamManagement;