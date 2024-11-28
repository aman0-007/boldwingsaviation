import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminSidebar from '../../components/admin/AdminSidebar';
import DashboardHome from './DashboardHome';
import TeamManagement from '../../components/admin/TeamManagement';
import CourseManagement from '../../components/admin/CourseManagement';
import GalleryManagement from '../../components/admin/GalleryManagement';
import ContactManagement from '../../components/admin/ContactManagement';
import TestimonialManagement from '../../components/admin/TestimonialManagement';
import QueryManagement from '../../components/admin/QueryManagement';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader toggleSidebar={toggleSidebar} />
      <AdminSidebar isOpen={isSidebarOpen} />
      
      <main 
        className={`transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-0'
        } pt-16 min-h-screen bg-gray-50`}
      >
        <div className="p-6">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/team" element={<TeamManagement />} />
            <Route path="/courses" element={<CourseManagement />} />
            <Route path="/gallery" element={<GalleryManagement />} />
            <Route path="/messages" element={<ContactManagement />} />
            <Route path="/testimonials" element={<TestimonialManagement />} />
            <Route path="/queries" element={<QueryManagement />} />
            <Route path="/settings" element={<div>Settings</div>} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;