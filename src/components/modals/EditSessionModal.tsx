import { X, Calendar, Clock, Link as LinkIcon } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import CustomSelect from '../ui/CustomSelect';
interface EditSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: {
    id: string;
    sessionName: string;
    studentName: string;
    teacherName: string;
    subject: string;
    day: string;
    date: string;
    time: string;
    endTime: string;
    meetingLink?: string;
  } | null;
  onSave: (sessionData: any) => void;
}

export default function EditSessionModal({ isOpen, onClose, session, onSave }: EditSessionModalProps) {
  const { language } = useLanguage();

  const [formData, setFormData] = useState({
    day: session?.day || '',
    date: session?.date || '',
    time: session?.time || '',
    endTime: session?.endTime || '',
    meetingLink: session?.meetingLink || ''
  });

  const text = {
    title: { ar: 'تعديل الحصة', en: 'Edit Session' },
    sessionInfo: { ar: 'معلومات الحصة', en: 'Session Information' },
    sessionName: { ar: 'اسم الحصة', en: 'Session Name' },
    student: { ar: 'الطالب', en: 'Student' },
    teacher: { ar: 'المعلم', en: 'Teacher' },
    subject: { ar: 'المادة', en: 'Subject' },
    scheduleDetails: { ar: 'تفاصيل الجدول', en: 'Schedule Details' },
    day: { ar: 'اليوم', en: 'Day' },
    date: { ar: 'التاريخ', en: 'Date' },
    startTime: { ar: 'وقت البداية', en: 'Start Time' },
    endTime: { ar: 'وقت النهاية', en: 'End Time' },
    meetingLink: { ar: 'رابط الاجتماع', en: 'Meeting Link' },
    meetingLinkPlaceholder: { ar: 'أدخل رابط Zoom أو Google Meet', en: 'Enter Zoom or Google Meet link' },
    cancel: { ar: 'إلغاء', en: 'Cancel' },
    save: { ar: 'حفظ التغييرات', en: 'Save Changes' },
    sunday: { ar: 'الأحد', en: 'Sunday' },
    monday: { ar: 'الإثنين', en: 'Monday' },
    tuesday: { ar: 'الثلاثاء', en: 'Tuesday' },
    wednesday: { ar: 'الأربعاء', en: 'Wednesday' },
    thursday: { ar: 'الخميس', en: 'Thursday' },
    friday: { ar: 'الجمعة', en: 'Friday' },
    saturday: { ar: 'السبت', en: 'Saturday' }
  };

  const days = [
    text.sunday[language],
    text.monday[language],
    text.tuesday[language],
    text.wednesday[language],
    text.thursday[language],
    text.friday[language],
    text.saturday[language]
  ];

  if (!isOpen || !session) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...session,
      ...formData
    });
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 flex items-center justify-between">
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <h2 className="text-2xl font-bold text-white">{text.title[language]}</h2>
        </div>

        <form onSubmit={handleSubmit} className="flex-1  overflow-y-auto no-scrollbar">
          <div className="p-6 space-y-6">
            {/* Session Info (Read-only) */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 text-right mb-4">
                {text.sessionInfo[language]}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-right">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    {text.sessionName[language]}
                  </label>
                  <p className="text-gray-900 font-semibold">{session.sessionName}</p>
                </div>
                <div className="text-right">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    {text.student[language]}
                  </label>
                  <p className="text-gray-900 font-semibold">{session.studentName}</p>
                </div>
                <div className="text-right">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    {text.teacher[language]}
                  </label>
                  <p className="text-gray-900 font-semibold">{session.teacherName}</p>
                </div>
                <div className="text-right">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    {text.subject[language]}
                  </label>
                  <p className="text-gray-900 font-semibold">{session.subject}</p>
                </div>
              </div>
            </div>

            {/* Schedule Details (Editable) */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 text-right mb-4">
                {text.scheduleDetails[language]}
              </h3>
              <div className="space-y-4">
                {/* Day */}
                <div className="text-right">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {text.day[language]}
                  </label>
                  <CustomSelect
                    value={formData.day}
                    onChange={(value) => handleChange('day', value as string)}
                    options={days.map((day) => ({
                      value: day,
                      label: day
                    }))}
                  />
                </div>

                {/* Date */}
                <div className="text-right">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline ml-2" />
                    {text.date[language]}
                  </label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                    placeholder="May 3, 2026"
                    dir="rtl"
                  />
                </div>

                {/* Time Range */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-right">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Clock className="w-4 h-4 inline ml-2" />
                      {text.startTime[language]}
                    </label>
                    <input
                      type="text"
                      value={formData.time}
                      onChange={(e) => handleChange('time', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                      placeholder="12:00 PM"
                      dir="ltr"
                    />
                  </div>
                  <div className="text-right">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Clock className="w-4 h-4 inline ml-2" />
                      {text.endTime[language]}
                    </label>
                    <input
                      type="text"
                      value={formData.endTime}
                      onChange={(e) => handleChange('endTime', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                      placeholder="01:00 PM"
                      dir="ltr"
                    />
                  </div>
                </div>

                {/* Meeting Link */}
                <div className="text-right">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <LinkIcon className="w-4 h-4 inline ml-2" />
                    {text.meetingLink[language]}
                  </label>
                  <input
                    type="url"
                    value={formData.meetingLink}
                    onChange={(e) => handleChange('meetingLink', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                    placeholder={text.meetingLinkPlaceholder[language]}
                    dir="ltr"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 flex items-center justify-start gap-3 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-100 transition-colors"
            >
              {text.cancel[language]}
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              {text.save[language]}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
