import React, { useState, useEffect } from 'react';
import { Users, BookOpen, Image, Mail, MessageSquare, Quote } from 'lucide-react';
import axios from 'axios';

interface RecentActivity {
  type: string;
  message: string;
  timestamp: string;
}

const DashboardHome = () => {
  const [counts, setCounts] = useState({
    teamCount: 0,
    coursesCount: 0,
    galleryCount: 0,
    messagesCount: 0,
    testimonialCount: 0,
    queryCount: 0
  });
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [team, courses, gallery, messages, testimonials, queries] = await Promise.all([
          axios.get('http://localhost:3000/api/team'),
          axios.get('http://localhost:3000/api/courses'),
          axios.get('http://localhost:3000/api/gallery'),
          axios.get('http://localhost:3000/api/contact'),
          axios.get('http://localhost:3000/api/testimonials'),
          axios.get('http://localhost:3000/api/queries')
        ]);

        setCounts({
          teamCount: team.data.length,
          coursesCount: courses.data.length,
          galleryCount: gallery.data.length,
          messagesCount: messages.data.length,
          testimonialCount: testimonials.data.length,
          queryCount: queries.data.length
        });

        // Process recent activities
        const activities: RecentActivity[] = [
          ...messages.data.slice(0, 3).map((msg: any) => ({
            type: 'message',
            message: `New message from ${msg.name}`,
            timestamp: new Date(msg.createdAt).toISOString()
          })),
          ...queries.data.slice(0, 3).map((query: any) => ({
            type: 'query',
            message: `New course query for ${query.courseId.title}`,
            timestamp: new Date(query.createdAt).toISOString()
          })),
          ...testimonials.data.slice(0, 3).map((testimonial: any) => ({
            type: 'testimonial',
            message: `New testimonial from ${testimonial.name}`,
            timestamp: new Date(testimonial.createdAt).toISOString()
          }))
        ];

        // Sort by timestamp and take latest 5
        activities.sort((a, b) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setRecentActivities(activities.slice(0, 5));

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = [
    { icon: Users, label: 'Team Members', value: counts.teamCount },
    { icon: BookOpen, label: 'Courses', value: counts.coursesCount },
    { icon: Image, label: 'Gallery Items', value: counts.galleryCount },
    { icon: Mail, label: 'Messages', value: counts.messagesCount },
    { icon: Quote, label: 'Testimonials', value: counts.testimonialCount },
    { icon: MessageSquare, label: 'Course Queries', value: counts.queryCount },
  ];

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'message':
        return 'bg-blue-500';
      case 'query':
        return 'bg-yellow-500';
      case 'testimonial':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} days ago`;
    }
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
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center text-sm">
              <div className={`w-2 h-2 rounded-full ${getActivityColor(activity.type)} mr-3`}></div>
              <p className="text-gray-600">{activity.message}</p>
              <span className="ml-auto text-gray-400">{formatTimestamp(activity.timestamp)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;