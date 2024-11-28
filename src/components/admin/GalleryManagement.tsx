import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Trash2, Plus, Link, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminModal from './shared/AdminModal';

interface GalleryImage {
  _id: string;
  title: string;
  image_url: string;
  isLocal: boolean;
}

const GalleryManagement = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadType, setUploadType] = useState<'url' | 'file'>('url');
  const { register, handleSubmit, reset, watch } = useForm<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/gallery');
      const data = await response.json();
      setImages(data);
    } catch (error) {
      toast.error('Failed to fetch gallery images');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      let response;
      const formData = new FormData();

      if (uploadType === 'file' && data.image[0]) {
        formData.append('title', data.title);
        formData.append('image', data.image[0]);
        
        response = await fetch('http://localhost:3000/api/gallery/upload', {
          method: 'POST',
          body: formData,
        });
      } else {
        response = await fetch('http://localhost:3000/api/gallery/url', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: data.title,
            image_url: data.image_url,
          }),
        });
      }

      if (!response.ok) {
        throw new Error('Failed to add image');
      }

      toast.success('Image added successfully');
      fetchImages();
      closeModal();
    } catch (error) {
      toast.error('Failed to add image');
    }
  };

  const deleteImage = async (id: string) => {
    if (confirm('Are you sure you want to delete this image?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/gallery/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete image');
        }

        toast.success('Image deleted successfully');
        setImages(images.filter(img => img._id !== id));
      } catch (error) {
        toast.error('Failed to delete image');
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUploadType('url');
    reset();
  };

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
        <h2 className="text-2xl font-bold">Gallery Management</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-[#f9df54] text-gray-900 rounded-lg hover:bg-[#f8f260]"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Image
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <div key={image._id} className="relative group">
            <img
              src={image.isLocal ? `http://localhost:3000${image.image_url}` : image.image_url}
              alt={image.title}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-lg flex items-center justify-center">
              <button
                onClick={() => deleteImage(image._id)}
                className="opacity-0 group-hover:opacity-100 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-300"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-sm font-medium">{image.title}</p>
          </div>
        ))}
      </div>

      <AdminModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Add Gallery Image"
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
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              {...register('title', { required: true })}
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
                {...register('image', { required: uploadType === 'file' })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          )}

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
              Add
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
};

export default GalleryManagement;