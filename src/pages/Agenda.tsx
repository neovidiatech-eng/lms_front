import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { useLanguage, LanguageContextType, Language } from '../contexts/LanguageContext';
import { useSessions } from '../contexts/SessionsContext';

interface Session {
  id: string;
  studentName: string;
  teacherName: string;
  subject: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  meetingLink?: string;
}

interface DayData {
  date: Date;
  sessions: Session[];
}

export default function Agenda() {
  const { language } = useLanguage() as LanguageContextType;
  const { sessions: allSessions } = useSessions();
  const [currentDate, setCurrentDate] = useState(new Date());

  const sessionsByDate = useMemo(() => {
    const grouped: { [key: string]: Session[] } = {};
    allSessions.forEach(session => {
      if (session.date) {
        const dateKey = session.date;
        if (!grouped[dateKey]) grouped[dateKey] = [];
        grouped[dateKey].push({
          id: session.id,
          studentName: session.studentName,
          teacherName: session.teacherName,
          subject: session.subject,
          startTime: session.time,
          endTime: session.endTime,
          status: 'scheduled',
          meetingLink: session.meetingLink
        });
      }
    });
    return grouped;
  }, [allSessions]);

  const text = {
    title: { ar: 'تقويم الحصص', en: 'Session Calendar' },
    subtitle: { ar: 'إدارة وتتبع جميع الحصص الدراسية', en: 'Manage and track all study sessions' },
    today: { ar: 'اليوم', en: 'Today' },
    totalSessions: { ar: 'إجمالي الحصص', en: 'Total Sessions' },
    upcoming: { ar: 'قادمة', en: 'Upcoming' },
    completed: { ar: 'مكتملة', en: 'Completed' },
    cancelled: { ar: 'ملغية', en: 'Cancelled' },
    todaySessions: { ar: 'حصص اليوم', en: "Today's Sessions" },
    noSessions: { ar: 'لا توجد حصص في هذا اليوم', en: 'No sessions for this day' },
    student: { ar: 'الطالب', en: 'Student' },
    teacher: { ar: 'المعلم', en: 'Teacher' },
    subject: { ar: 'المادة', en: 'Subject' },
    joinSession: { ar: 'دخول الحصة', en: 'Join Session' },
    sunday: { ar: 'الأحد', en: 'Sun' },
    monday: { ar: 'الإثنين', en: 'Mon' },
    tuesday: { ar: 'الثلاثاء', en: 'Tue' },
    wednesday: { ar: 'الأربعاء', en: 'Wed' },
    thursday: { ar: 'الخميس', en: 'Thu' },
    friday: { ar: 'الجمعة', en: 'Fri' },
    saturday: { ar: 'السبت', en: 'Sat' }
  };

  const months = {
    ar: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  };

  const weekDays = [
    (text.sunday as any)[language],
    (text.monday as any)[language],
    (text.tuesday as any)[language],
    (text.wednesday as any)[language],
    (text.thursday as any)[language],
    (text.friday as any)[language],
    (text.saturday as any)[language]
  ];

  const formatDateKey = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getDaysInMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const days: (DayData | null)[] = [];
    for (let i = 0; i < firstDay.getDay(); i++) days.push(null);
    for (let day = 1; day <= lastDay.getDate(); day++) {
       const currentDay = new Date(date.getFullYear(), date.getMonth(), day);
       days.push({ date: currentDay, sessions: sessionsByDate[formatDateKey(currentDay)] || [] });
    }
    return days;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const days = getDaysInMonth(currentDate);
  const stats = {
    total: Object.values(sessionsByDate).flat().length,
    upcoming: Object.values(sessionsByDate).flat().filter(s => s.status === 'scheduled').length,
    completed: Object.values(sessionsByDate).flat().filter(s => s.status === 'completed').length,
    cancelled: Object.values(sessionsByDate).flat().filter(s => s.status === 'cancelled').length
  };
  const todaySessions = sessionsByDate[formatDateKey(new Date())] || [];

  return (
    <div className="space-y-6">
      <div className="bg-primary rounded-2xl p-8 text-white flex items-center justify-between">
        <div className="text-right">
          <h1 className="text-3xl font-bold mb-2">{(text.title as any)[language]}</h1>
          <p className="text-blue-100">{(text.subtitle as any)[language]}</p>
        </div>
        <div className="p-4 bg-white/20 rounded-2xl"><CalendarIcon className="w-12 h-12" /></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: (text.totalSessions as any)[language], val: stats.total, color: 'primary' },
          { label: (text.upcoming as any)[language], val: stats.upcoming, color: 'green-500' },
          { label: (text.completed as any)[language], val: stats.completed, color: 'gray-500' },
          { label: (text.cancelled as any)[language], val: stats.cancelled, color: 'red-500' }
        ].map((s, i) => (
          <div key={i} className={`bg-white rounded-xl p-6 shadow-sm border-r-4 border-${s.color}`}>
            <p className="text-sm text-gray-600 text-right mb-1">{s.label}</p>
            <p className="text-3xl font-bold text-gray-900 text-right">{s.val}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-primary p-6 flex items-center justify-between">
            <button onClick={() => setCurrentDate(new Date())} className="px-4 py-2 bg-white/20 rounded-lg text-white text-sm">{(text.today as any)[language]}</button>
            <h2 className="text-2xl font-bold text-white">{(months as any)[language][currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
            <div className="flex gap-2">
               <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))} className="p-2 bg-white/20 rounded-lg text-white"><ChevronRight className="w-5 h-5" /></button>
               <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))} className="p-2 bg-white/20 rounded-lg text-white"><ChevronLeft className="w-5 h-5" /></button>
            </div>
          </div>
          <div className="grid grid-cols-7 bg-gray-50 border-b">{weekDays.map((d, i) => <div key={i} className="p-4 text-center text-sm font-semibold">{d}</div>)}</div>
          <div className="grid grid-cols-7">
            {days.map((d, i) => !d ? <div key={i} className="aspect-square border border-gray-100 bg-gray-50/50" /> : (
              <div key={i} className={`aspect-square border border-gray-100 p-2 transition-colors ${isToday(d.date) ? 'bg-green-50 border-green-300' : d.sessions.length ? 'bg-primary-light' : 'hover:bg-gray-50'}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm font-medium ${isToday(d.date) ? 'text-green-700 font-bold' : 'text-gray-700'}`}>{d.date.getDate()}</span>
                </div>
                {d.sessions.length > 0 && <div className="flex-1 flex items-center justify-center"><div className="bg-primary text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">{d.sessions.length}</div></div>}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
           <h3 className="text-xl font-bold text-gray-900 text-right mb-6 flex items-center justify-end gap-2">
             <span>{(text.todaySessions as any)[language]}</span>
             <Clock className="w-5 h-5 text-primary" />
           </h3>
           {todaySessions.length === 0 ? <div className="text-center py-12"><CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" /><p className="text-gray-500">{(text.noSessions as any)[language]}</p></div> : (
             <div className="space-y-4">
               {todaySessions.map(s => (
                 <div key={s.id} className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-right">
                   <p className="text-xs text-gray-500">{(text.student as any)[language]}</p><p className="font-bold">{s.studentName}</p>
                   <p className="text-xs text-gray-500 mt-2">{(text.teacher as any)[language]}</p><p className="font-medium">{s.teacherName}</p>
                   <p className="text-xs text-gray-500 mt-2">{(text.subject as any)[language]}</p><p className="font-medium text-primary">{s.subject}</p>
                   <p className="text-sm font-semibold mt-2" dir="ltr">{s.startTime} - {s.endTime}</p>
                   {s.meetingLink && <button onClick={() => window.open(s.meetingLink, '_blank')} className="w-full mt-3 bg-green-600 text-white py-2 rounded-lg text-sm">{(text.joinSession as any)[language]}</button>}
                 </div>
               ))}
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
