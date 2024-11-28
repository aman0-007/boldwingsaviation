import React from 'react';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: {
    _id: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    isLocal: boolean;
  };
}

interface FormData {
  name: string;
  email: string;
  contact: string;
  query: string;
}

const CourseModal: React.FC<CourseModalProps> = ({ isOpen, onClose, course }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('http://localhost:3000/api/queries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          courseId: course._id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit query');
      }

      toast.success('Query submitted successfully!');
      reset();
      onClose();
    } catch (error) {
      toast.error('Failed to submit query');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        ></div>

        <div className="inline-block w-full max-w-4xl px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:p-6">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img
                src={course.isLocal ? `http://localhost:3000${course.image}` : course.image}
                alt={course.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.subtitle}</p>
              <p className="text-gray-700">{course.description}</p>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-4">Get a Callback</h4>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#f9df54] focus:border-transparent"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm">{errors.name.message}</span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#f9df54] focus:border-transparent"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">{errors.email.message}</span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Contact Number</label>
                  <input
                    {...register('contact', {
                      required: 'Contact number is required',
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: 'Please enter a valid 10-digit number',
                      },
                    })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#f9df54] focus:border-transparent"
                  />
                  {errors.contact && (
                    <span className="text-red-500 text-sm">{errors.contact.message}</span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Query</label>
                  <textarea
                    {...register('query', { required: 'Query is required' })}
                    rows={4}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#f9df54] focus:border-transparent resize-none"
                  />
                  {errors.query && (
                    <span className="text-red-500 text-sm">{errors.query.message}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#f9df54] text-gray-900 py-2 rounded-lg hover:bg-[#f8f260] transition-colors font-medium"
                >
                  Get a Callback
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseModal;