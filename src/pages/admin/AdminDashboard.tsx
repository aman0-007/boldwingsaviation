import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
    <div className="flex h-screen bg-gray-50">
      {/* Fixed Header */}
      <AdminHeader toggleSidebar={toggleSidebar} />
      
      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} />
      
      {/* Main Content */}
      <div 
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'
        }`}
      >
        <div className="pt-16 min-h-screen">
          <div className="p-6 h-full">
            <Routes>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/team" element={<TeamManagement />} />
              <Route path="/courses" element={<CourseManagement />} />
              <Route path="/gallery" element={<GalleryManagement />} />
              <Route path="/messages" element={<ContactManagement />} />
              <Route path="/testimonials" element={<TestimonialManagement />} />
              <Route path="/queries" element={<QueryManagement />} />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;