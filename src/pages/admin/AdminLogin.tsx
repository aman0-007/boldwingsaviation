import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import LoginLayout from '../../components/admin/login/LoginLayout';
import LoginHeader from '../../components/admin/login/LoginHeader';
import LoginForm from '../../components/admin/login/LoginForm';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (data: { email: string; password: string }) => {
    setIsSubmitting(true);
    try {
      const success = await login(data.email, data.password);
      if (success) {
        toast.success('Welcome back!');
        navigate('/admin');
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LoginLayout>
      <LoginHeader />
      <LoginForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </LoginLayout>
  );
};

export default AdminLogin;