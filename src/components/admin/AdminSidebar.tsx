import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, BookOpen, Image, Mail, Settings, MessageSquare, HelpCircle } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const AdminSidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/admin' },
    { icon: Users, label: 'Team', path: '/admin/team' },
    { icon: BookOpen, label: 'Courses', path: '/admin/courses' },
    { icon: Image, label: 'Gallery', path: '/admin/gallery' },
    { icon: Mail, label: 'Messages', path: '/admin/messages' },
    { icon: MessageSquare, label: 'Testimonials', path: '/admin/testimonials' },
    { icon: HelpCircle, label: 'Queries', path: '/admin/queries' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-gray-900 text-white transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-0'
      } overflow-hidden`}
    >
      <nav className="p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#f9df54] text-gray-900'
                      : 'hover:bg-gray-800'
                  }`
                }
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </aside>
  );
};

export default AdminSidebar;