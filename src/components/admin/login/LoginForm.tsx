import React from 'react';
import { useForm } from 'react-hook-form';
import { Lock, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => Promise<void>;
  isSubmitting: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isSubmitting }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<{
    email: string;
    password: string;
  }>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">Email</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            className="pl-10 w-full rounded-lg border bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#f9df54] focus:border-transparent"
            placeholder="username/email"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">Password</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
            className="pl-10 w-full rounded-lg border bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#f9df54] focus:border-transparent"
            placeholder="••••••••"
          />
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
        )}
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 px-4 rounded-lg bg-[#f9df54] hover:bg-[#f8f260] text-gray-900 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f9df54] disabled:opacity-50"
      >
        {isSubmitting ? 'Signing in...' : 'Sign In'}
      </motion.button>
    </form>
  );
};

export default LoginForm;