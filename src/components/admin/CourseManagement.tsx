import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Edit2, Trash2, Plus, Link, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminModal from './shared/AdminModal';
import AdminTable from './shared/AdminTable';

interface Course {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  isLocal: boolean;
}

const CourseManagement = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadType, setUploadType] = useState<'url' | 'file'>('url');
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const { register, handleSubmit, reset, setValue } = useForm<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/courses');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      toast.error('Failed to fetch courses');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      let response;
      const formData = new FormData();
      const isEditing = !!editingCourse;

      if (uploadType === 'file' && data.image[0]) {
        formData.append('title', data.title);
        formData.append('subtitle', data.subtitle);
        formData.append('description', data.description);
        formData.append('image', data.image[0]);

        const url = isEditing
          ? `http://localhost:3000/api/courses/${editingCourse._id}`
          : 'http://localhost:3000/api/courses/upload';

        response = await fetch(url, {
          method: isEditing ? 'PUT' : 'POST',
          body: formData,
        });
      } else {
        const payload = {
          title: data.title,
          subtitle: data.subtitle,
          description: data.description,
          image: data.image_url,
        };

        const url = isEditing
          ? `http://localhost:3000/api/courses/${editingCourse._id}`
          : 'http://localhost:3000/api/courses/url';

        response = await fetch(url, {
          method: isEditing ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) {
        throw new Error(isEditing ? 'Failed to update course' : 'Failed to add course');
      }

      toast.success(isEditing ? 'Course updated successfully' : 'Course added successfully');
      fetchCourses();
      closeModal();
    } catch (error) {
      toast.error(editingCourse ? 'Failed to update course' : 'Failed to add course');
    }
  };

  const deleteCourse = async (id: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/courses/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete course');
        }

        toast.success('Course deleted successfully');
        setCourses(courses.filter(course => course._id !== id));
      } catch (error) {
        toast.error('Failed to delete course');
      }
    }
  };

  const openModal = (course?: Course) => {
    if (course) {
      setEditingCourse(course);
      setUploadType('url');
      Object.keys(course).forEach((key) => {
        setValue(key as keyof Course, course[key as keyof Course]);
      });
    } else {
      setEditingCourse(null);
      reset();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCourse(null);
    setUploadType('url');
    reset();
  };

  const columns = [
    { 
      header: 'Image', 
      accessor: 'image',
      cell: (course: Course) => (
        <img
          src={course.isLocal ? `http://localhost:3000${course.image}` : course.image}
          alt={course.title}
          className="w-16 h-16 object-cover rounded"
        />
      )
    },
    { header: 'Title', accessor: 'title' },
    { header: 'Subtitle', accessor: 'subtitle' },
    {
      header: 'Actions',
      accessor: 'actions',
      cell: (course: Course) => (
        <div className="flex space-x-2">
          <button
            onClick={() => openModal(course)}
            className="p-1 text-blue-600 hover:text-blue-800"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => deleteCourse(course._id)}
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
        <h2 className="text-2xl font-bold">Course Management</h2>
        <button
          onClick={() => openModal()}
          className="flex items-center px-4 py-2 bg-[#f9df54] text-gray-900 rounded-lg hover:bg-[#f8f260]"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Course
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <AdminTable columns={columns} data={courses} />
      </div>

      <AdminModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingCourse ? 'Edit Course' : 'Add Course'}
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

          <div>
            <label className="block text-sm font-medium mb-1">Subtitle</label>
            <input
              {...register('subtitle', { required: true })}
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
                {...register('image', { required: !editingCourse && uploadType === 'file' })}
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
              {editingCourse ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
};

export default CourseManagement;