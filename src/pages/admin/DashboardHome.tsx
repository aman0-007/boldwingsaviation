import React from 'react';
import { Users, BookOpen, Image, Mail } from 'lucide-react';

const DashboardHome = () => {
  const stats = [
    { icon: Users, label: 'Team Members', value: '12' },
    { icon: BookOpen, label: 'Courses', value: '8' },
    { icon: Image, label: 'Gallery Items', value: '24' },
    { icon: Mail, label: 'New Messages', value: '5' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 flex items-center"
            >
              <div className="p-3 rounded-lg bg-[#f9df54]/10">
                <Icon className="h-6 w-6 text-[#f9df54]" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center text-sm">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
            <p className="text-gray-600">New team member added: Sarah Johnson</p>
            <span className="ml-auto text-gray-400">2 hours ago</span>
          </div>
          <div className="flex items-center text-sm">
            <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
            <p className="text-gray-600">Course updated: Aviation Management</p>
            <span className="ml-auto text-gray-400">5 hours ago</span>
          </div>
          <div className="flex items-center text-sm">
            <div className="w-2 h-2 rounded-full bg-yellow-500 mr-3"></div>
            <p className="text-gray-600">New contact form submission</p>
            <span className="ml-auto text-gray-400">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;