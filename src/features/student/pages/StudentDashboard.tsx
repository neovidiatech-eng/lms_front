import { FileText,  Users, NotebookPenIcon, VideotapeIcon, Calendar } from 'lucide-react';
import { useState } from 'react';
import { Outlet , Routes, Route } from 'react-router-dom';
import SubscribePlanModal from '../../../components/modals/SubscribePlanModal';
import StudentDashboardLayout from '../../../pages/StudentDashboard/StudentDashboardLayout';
import { studentDashboardRoutes } from '../../../pages/StudentDashboard/studentDashboardRoutes';
import DashboardCard from '../../../components/ui/Card';
import { useSettings } from '../../../contexts/SettingsContext';
import { useTranslation } from 'react-i18next';

export default function StudentDashboard() {

  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
const { settings } = useSettings();
  const { i18n } = useTranslation();
  const isRtl = i18n.language.split('-')[0] === 'ar';




  const renderStudentHome = () => (
    <div className="space-y-6">
      <div className="rounded-2xl p-8 text-white relative overflow-hidden" style={{ background: `linear-gradient(to right, ${settings.primaryColor}, ${settings.accentColor})` }}>
        <h1 className='text-2xl font-bold text-white'> أهلا بك! أحمد</h1>
        <div className="flex items-center gap-2 text-white mt-1">
          <Calendar size={16} />
          <span className="text-sm">
            {new Intl.DateTimeFormat('ar-EG', { 
              weekday: 'long', 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            }).format(new Date())}
          </span>
        </div>
      </div>
      
      {/* Main Stats */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-3 gap-6">
        <DashboardCard
          title="الحصص"
          value="5"
          unit="حصة"
          percentage="4.5"
          isIncrease={true}
          subText="مقارنة بالشهر السابق"
          icon={{
            bgColor: 'bg-[#eefcfc]',
            svg: <Users size={20} className="text-[#00a8a8]" />
          }}
        />

        <DashboardCard
          title=" الواجبات"
          value="6"
          unit="واجب"
          percentage="15"
          isIncrease={true}
          subText="مقارنة بالشهر السابق"
          icon={{
            bgColor: 'bg-[#eefcfc]',
            svg: <NotebookPenIcon size={20} className="text-[#00a8a8]" />
          }}
        />
         <DashboardCard
          title="  الامتحانات"
          value="7"
          unit="امتحان"
          percentage="15"
          isIncrease={true}
          subText="مقارنة بالشهر السابق"
          icon={{
            bgColor: 'bg-[#eefcfc]',
            svg: <FileText size={20} className="text-[#00a8a8]" />
          }}
        />
          <DashboardCard
          title="الكورسات"
          value="4"
          unit="كورس"
          percentage="15"
          isIncrease={true}
          subText="مقارنة بالشهر السابق"
          icon={{
            bgColor: 'bg-[#eefcfc]',
            svg: <VideotapeIcon size={20} className="text-[#00a8a8]" />
          }}
        />
      </div>

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

  return (
    <>
      <StudentDashboardLayout>
        <Routes>
          <Route index element={renderStudentHome()} />
          {studentDashboardRoutes.flatMap(route => {
            if (route.subItems) {
              return route.subItems.map(subItem => (
                <Route key={subItem.id} path={subItem.path} element={subItem.element} />
              ));
            }
            return route.element ? [<Route key={route.id} path={route.path} element={route.element} />] : [];
          })}
        </Routes>
        <Outlet />
      </StudentDashboardLayout>
      <SubscribePlanModal isOpen={showSubscribeModal} onClose={() => setShowSubscribeModal(false)} />
    </>
  );
}

