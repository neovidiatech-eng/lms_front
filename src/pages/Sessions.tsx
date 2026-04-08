import { useState, useMemo } from 'react';
import { Search, Plus, Eye, Trash2, Filter } from 'lucide-react';
import { useSessions } from '../contexts/SessionsContext';
import Pagination from '../components/ui/Pagination';
import AddSessionModal from '../components/modals/AddSessionModal';
import AddMultipleSessionsModal, { SessionPreviewItem } from '../components/modals/AddMultipleSessionsModal';
import ViewSessionDetailsModal from '../components/modals/ViewSessionDetailsModal';
import EditSessionModal from '../components/modals/EditSessionModal';
import { ContextSession, SessionDisplay, SessionGroupDetails, SingleSessionInput } from '../types/sessions';
import { MultipleSessionsFormData } from '../lib/schemas/SessionSchema';
import { useTranslation } from 'react-i18next';

interface Session {
  id: string;
  title: string;
  teacher: string;
  subject: string;
  grade: string;
  date: string;
  time: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export default function Sessions() {
  const { t, i18n } = useTranslation();
  const language = i18n.language.split('-')[0];
  const { sessions: allSessionsFromContext, addSession, addMultipleSessions, updateSession, deleteSession } = useSessions();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddMultipleModal, setShowAddMultipleModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSessionGroup, setSelectedSessionGroup] = useState<SessionGroupDetails | null>(null);
  const [selectedSessionToEdit, setSelectedSessionToEdit] = useState<ContextSession | null>(null);
  const [filters, setFilters] = useState({
    status: '',
    dateFrom: '',
    dateTo: '',
    teacher: '',
    student: '',
    subject: ''
  });
  const itemsPerPage = 7;

  // Convert context sessions to display format and group by student/teacher/subject
  const sessions = useMemo<SessionDisplay[]>(() => {
    const grouped = new Map<string, Session>();

    allSessionsFromContext.forEach(session => {
      const key = `${session.studentName}-${session.teacherName}-${session.subject}`;
      if (!grouped.has(key)) {
        grouped.set(key, {
          id: key,
          title: session.sessionName || '',
          teacher: session.teacherName || '',
          subject: session.studentName || '',
          grade: session.subject || '',
          date: session.date || '',
          time: `${session.time || ''} - ${session.endTime || ''}`,
          duration: 60,
          status: 'scheduled' as const
        });
      }
    });

    return Array.from(grouped.values());
  }, [allSessionsFromContext]);

  // Build session group details from context
  const sessionGroupDetails = useMemo(() => {
    const grouped: Record<string, SessionGroupDetails> = {};
    allSessionsFromContext.forEach(session => {
      const key = `${session.studentName}-${session.teacherName}-${session.subject}`;

      if (!grouped[key]) {
        grouped[key] = {
          id: key,
          sessionName: session.sessionName,
          student: session.studentName,
          teacher: session.teacherName,
          subject: session.subject,
          monthYear: '',
          duration: 60,
          meetingLink: session.meetingLink || '',
          sessions: [],
          packageInfo: {
            packageName: 'الباقة الأساسية',
            totalSessions: 0,
            sessionsUsed: 0,
            sessionsRemaining: 0
          }
        };
      }

      grouped[key].sessions.push({
        day: session.day,
        date: session.date,
        time: session.time,
        endTime: session.endTime,
        status: 'scheduled' as const,
        meetingLink: session.meetingLink
      });

      // Update package info
      grouped[key].packageInfo.totalSessions = grouped[key].sessions.length;
      grouped[key].packageInfo.sessionsUsed = 0;
      grouped[key].packageInfo.sessionsRemaining = grouped[key].sessions.length;
    });

    return grouped;
  }, [allSessionsFromContext]);


  const filteredSessions = sessions.filter(session => {
    const title = (session.title || "").toLowerCase();
    const teacher = (session.teacher || "").toLowerCase();
    const subject = (session.subject || "").toLowerCase();
    const grade = (session.grade || "").toLowerCase();
    const search = searchTerm.toLowerCase();

    return title.includes(search) ||
      teacher.includes(search) ||
      subject.includes(search) ||
      grade.includes(search);
  });

  const totalPages = Math.ceil(filteredSessions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSessions = filteredSessions.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddSession = (sessionData: SingleSessionInput) => {
    const dayName = new Date(sessionData.sessionDate).toLocaleDateString(
      language === 'ar' ? 'ar-EG' : 'en-US',
      { weekday: 'long' }
    );
    const newSession = {
      id: Date.now().toString(),
      sessionName: sessionData.title,
      studentName: sessionData.student,
      teacherName: sessionData.teacher,
      subject: sessionData.subject,
      day: dayName,                    // القيمة المحسوبة
      date: sessionData.sessionDate,   // القيمة القادمة من المودال
      time: sessionData.startTime,
      endTime: sessionData.endTime,
      meetingLink: sessionData.meetingLink
    };
    addSession(newSession);
    console.log(newSession)
  };
  const calculateEndTime = (startTime: string, durationMinutes: string | number) => {
    if (!startTime) return '';
    const [hours, minutes] = startTime.split(':').map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes + Number(durationMinutes));
    return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const handleAddMultipleSessions = (data: {
    formData: MultipleSessionsFormData;
    sessions: SessionPreviewItem[]
  }) => {
    const { formData, sessions } = data;

    const newSessions = sessions.map((session, index) => ({
      id: `${Date.now()}-${index}`,
      sessionName: formData.title,
      studentName: formData.student,
      teacherName: formData.teacher,
      subject: formData.subject,
      day: session.day,
      date: session.date,
      time: session.time,
      endTime: calculateEndTime(session.time, formData.duration),
      meetingLink: formData.meetingLink
    }));

    addMultipleSessions(newSessions);
    setShowAddMultipleModal(false);
    console.log(newSessions);
  };

  const handleViewSession = (sessionId: string) => {
    const groupDetails = sessionGroupDetails[sessionId as keyof typeof sessionGroupDetails];
    if (groupDetails) {
      setSelectedSessionGroup(groupDetails);
      setShowViewModal(true);
    }
  };

  const handleDeleteSession = (sessionId: string) => {
    if (window.confirm(t('deleteConfirmSession'))) {
      // Delete all sessions in this group
      const sessionsToDelete = allSessionsFromContext.filter(s => {
        const key = `${s.studentName}-${s.teacherName}-${s.subject}`;
        return key === sessionId;
      });

      sessionsToDelete.forEach(session => {
        deleteSession(session.id);
      });
    }
  };

  const handleEditSession = (sessionId: string, sessionIndex: number) => {
    const groupDetails = sessionGroupDetails[sessionId as keyof typeof sessionGroupDetails];
    if (groupDetails && groupDetails.sessions[sessionIndex]) {
      const sessionToEdit = groupDetails.sessions[sessionIndex];
      setSelectedSessionToEdit({
        id: sessionId,
        sessionIndex: sessionIndex,
        sessionName: groupDetails.sessionName,
        studentName: groupDetails.student,
        teacherName: groupDetails.teacher,
        subject: groupDetails.subject,
        ...sessionToEdit
      });
      setShowEditModal(true);
    }
  };

  const handleSaveEditedSession = (updatedSession: ContextSession) => {
    // Find the actual session in context and update it
    const sessionInContext = allSessionsFromContext.find(s =>
      s.studentName === updatedSession.studentName &&
      s.teacherName === updatedSession.teacherName &&
      s.subject === updatedSession.subject &&
      s.date === updatedSession.date
    );

    if (sessionInContext) {
      updateSession(sessionInContext.id, {
        day: updatedSession.day,
        date: updatedSession.date,
        time: updatedSession.time,
        endTime: updatedSession.endTime,
        meetingLink: updatedSession.meetingLink
      });
      alert(t('changesSavedSuccess'));
    }
  };

  const handleJoinSession = (sessionId: string, sessionIndex: number) => {
    console.log('Join session:', sessionId, 'index:', sessionIndex);
    const groupDetails = sessionGroupDetails[sessionId as keyof typeof sessionGroupDetails];
    if (groupDetails && groupDetails.meetingLink) {
      window.open(groupDetails.meetingLink, '_blank');
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('sessionsTitle')}</h1>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100 space-y-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              {t('filters')}
            </button>
            <div className="flex-1 relative">
              <Search className={`absolute ${language === 'ar' ? 'right-4' : 'left-4'} top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5`} />
              <input
                type="text"
                placeholder={t('searchSessionsPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full ${language === 'ar' ? 'pr-12 text-right' : 'pl-12'} py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent`}
              />
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-6 py-3 btn-primary text-white rounded-xl transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              {t('singleSession')}
            </button>
            <button
              onClick={() => setShowAddMultipleModal(true)}
              className="flex items-center gap-2 px-6 py-3 btn-primary text-white rounded-xl transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              {t('multipleSessions')}
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 text-right">
                  {t('status')}
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-right"
                >
                  <option value="">{t('all')}</option>
                  <option value="scheduled">{t('scheduled')}</option>
                  <option value="completed">{t('completed')}</option>
                  <option value="cancelled">{t('cancelled')}</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 text-right">
                  {t('fromDate')}
                </label>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-right"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 text-right">
                  {t('toDate')}
                </label>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-right"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 text-right">
                  {t('filterTeacher')}
                </label>
                <select
                  value={filters.teacher}
                  onChange={(e) => setFilters({ ...filters, teacher: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-right"
                >
                  <option value="">{t('all')}</option>
                  <option value="Ahmed Qandil">Ahmed Qandil</option>
                  <option value="Ahmed Gamal">Ahmed Gamal</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 text-right">
                  {t('filterStudent')}
                </label>
                <select
                  value={filters.student}
                  onChange={(e) => setFilters({ ...filters, student: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-right"
                >
                  <option value="">{t('all')}</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 text-right">
                  {t('filterSubject')}
                </label>
                <select
                  value={filters.subject}
                  onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-right"
                >
                  <option value="">{t('all')}</option>
                  <option value="القرآن الكريم">القرآن الكريم</option>
                  <option value="اللغة العربية">اللغة العربية</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">{t('sessionTitleLabel')}</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">{t('studentLabel')}</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">{t('teacherLabel')}</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">{t('subjectLabel')}</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">{t('dateTime')}</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">{t('duration')}</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">{t('status')}</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentSessions.map((session) => (
                <tr key={session.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{session.title}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-700 text-right">{session.teacher}</td>
                  <td className="px-6 py-4 text-gray-700 text-right">{session.subject}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-primary font-medium">{session.grade}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-700 text-right">
                    <div className="flex flex-col gap-1">
                      <span>{session.date}</span>
                      <span className="text-sm text-gray-500">{session.time}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700 text-right">
                    {session.duration} {t('minutes')}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusStyle(session.status)}`}>
                      {t(session.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => handleViewSession(session.id)}
                        className="p-2 icon-btn-primary rounded-lg transition-colors"
                        title={t('view')}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteSession(session.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title={t('delete')}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredSessions.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>

      <AddSessionModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddSession}
      />

      <AddMultipleSessionsModal
        isOpen={showAddMultipleModal}
        onClose={() => setShowAddMultipleModal(false)}
        onAdd={handleAddMultipleSessions}
      />

      <ViewSessionDetailsModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        sessionGroup={selectedSessionGroup}
        onEditSession={handleEditSession}
        onJoinSession={handleJoinSession}
      />

      <EditSessionModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        session={selectedSessionToEdit}
        onSave={handleSaveEditedSession}
      />
    </div>
  );
}
