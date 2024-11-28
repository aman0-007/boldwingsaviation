import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

type FormData = {
  name: string;
  email: string;
  mobile: string;
  message: string;
};

const ContactForm = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const result = await response.json();
      toast.success(result.message);
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Failed to send message. Please try again later.');
    }
  };

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="bg-white p-8 rounded-2xl shadow-lg"
    >
      <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Name</label>
          <input
            {...register('name', { required: 'Name is required' })}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#f9df54] focus:border-transparent transition-all"
            placeholder="Your name"
            disabled={isSubmitting}
          />
          {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
          <input
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Please enter a valid email'
              }
            })}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#f9df54] focus:border-transparent transition-all"
            placeholder="your.email@example.com"
            disabled={isSubmitting}
          />
          {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Mobile</label>
          <input
            {...register('mobile', { 
              required: 'Mobile number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Please enter a valid 10-digit mobile number'
              }
            })}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#f9df54] focus:border-transparent transition-all"
            placeholder="Your mobile number"
            disabled={isSubmitting}
          />
          {errors.mobile && <span className="text-red-500 text-sm mt-1">{errors.mobile.message}</span>}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Message</label>
          <textarea
            {...register('message', { required: 'Message is required' })}
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#f9df54] focus:border-transparent transition-all resize-none"
            placeholder="Your message"
            disabled={isSubmitting}
          />
          {errors.message && <span className="text-red-500 text-sm mt-1">{errors.message.message}</span>}
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#f9df54] text-gray-900 py-3 rounded-lg hover:bg-[#f8f260] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </motion.div>
  );
};

export default ContactForm;