import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
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
  const { t } = useLanguage();
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


  const weekDays = [
    t('sun'),
    t('mon'),
    t('tue'),
    t('wed'),
    t('thu'),
    t('fri'),
    t('sat')
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
          <h1 className="text-3xl font-bold mb-2">{t('sessionCalendar')}</h1>
          <p className="text-blue-100">{t('sessionCalendarSubtitle')}</p>
        </div>
        <div className="p-4 bg-white/20 rounded-2xl"><CalendarIcon className="w-12 h-12" /></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: t('totalSessions'), val: stats.total, color: 'primary' },
          { label: t('scheduled'), val: stats.upcoming, color: 'green-500' },
          { label: t('completed'), val: stats.completed, color: 'gray-500' },
          { label: t('cancelled'), val: stats.cancelled, color: 'red-500' }
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
            <button onClick={() => setCurrentDate(new Date())} className="px-4 py-2 bg-white/20 rounded-lg text-white text-sm">{t('today')}</button>
            <h2 className="text-2xl font-bold text-white">{t([
              'january', 'february', 'march', 'april', 'may', 'june',
              'july', 'august', 'september', 'october', 'november', 'december'
            ][currentDate.getMonth()])} {currentDate.getFullYear()}</h2>
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
            <span>{t('todaySessions')}</span>
            <Clock className="w-5 h-5 text-primary" />
          </h3>
          {todaySessions.length === 0 ? <div className="text-center py-12"><CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" /><p className="text-gray-500">{t('noSessionsToday')}</p></div> : (
            <div className="space-y-4">
              {todaySessions.map(s => (
                <div key={s.id} className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-right">
                  <p className="text-xs text-gray-500">{t('studentLabel')}</p><p className="font-bold">{s.studentName}</p>
                  <p className="text-xs text-gray-500 mt-2">{t('teacherLabel')}</p><p className="font-medium">{s.teacherName}</p>
                  <p className="text-xs text-gray-500 mt-2">{t('subjectLabel')}</p><p className="font-medium text-primary">{s.subject}</p>
                  <p className="text-sm font-semibold mt-2" dir="ltr">{s.startTime} - {s.endTime}</p>
                  {s.meetingLink && <button onClick={() => window.open(s.meetingLink, '_blank')} className="w-full mt-3 bg-green-600 text-white py-2 rounded-lg text-sm">{t('joinSession')}</button>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
