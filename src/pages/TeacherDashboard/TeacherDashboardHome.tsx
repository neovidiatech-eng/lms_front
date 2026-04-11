import React from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen, Users, Clock, Calendar } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';

export default function TeacherDashboardHome() {
  const { i18n } = useTranslation();
  const { settings } = useSettings();
  const isRtl = i18n.language.split('-')[0] === 'ar';

  const stats = [
    { title: isRtl ? 'الطلاب' : 'Students', value: '145', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: isRtl ? 'الكورسات' : 'Courses', value: '4', icon: BookOpen, color: 'text-purple-500', bg: 'bg-purple-50' },
    { title: isRtl ? 'ساعات التدريس' : 'Teaching Hours', value: '120+', icon: Clock, color: 'text-orange-500', bg: 'bg-orange-50' },
    { title: isRtl ? 'حصص اليوم' : 'Today Sessions', value: '3', icon: Calendar, color: 'text-green-500', bg: 'bg-green-50' },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-10" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Welcome Banner */}
      <div className="rounded-2xl p-8 text-white relative overflow-hidden" style={{ background: `linear-gradient(to right, ${settings.primaryColor}, ${settings.accentColor})` }}>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">{isRtl ? 'مرحباً بعودتك، أ. محمد!' : 'Welcome back, Mr. Mohamed!'}</h1>
          <p className="opacity-80">{isRtl ? 'إليك نظرة سريعة على نشاطك اليوم' : 'Here is a quick overview of your activity today'}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
              </div>
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <Icon className="w-7 h-7" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Upcoming Schedule */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Calendar className="w-5 h-5" style={{ color: settings.primaryColor }} />
          {isRtl ? 'جدول اليوم' : 'Today Schedule'}
        </h2>
        
        <div className="space-y-4">
          {[
            { tag: isRtl ? 'لغة عربية' : 'Arabic', time: '10:00 AM', student: isRtl ? 'أحمد محمد' : 'Ahmed Mohamed', status: 'upcoming' },
            { tag: isRtl ? 'لغة عربية' : 'Arabic', time: '01:00 PM', student: isRtl ? 'سارة محمود' : 'Sarah Mahmoud', status: 'upcoming' },
            { tag: isRtl ? 'لغة عربية' : 'Arabic', time: '04:30 PM', student: isRtl ? 'عمر خالد' : 'Omar Khaled', status: 'upcoming' },
          ].map((session, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 border border-transparent hover:border-gray-200 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center font-bold text-lg" style={{ color: settings.primaryColor }}>
                  {session.student.substring(0, 1)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{session.student}</h4>
                  <p className="text-sm text-gray-500">{session.tag}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-semibold text-gray-700 mb-1">
                  {session.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
