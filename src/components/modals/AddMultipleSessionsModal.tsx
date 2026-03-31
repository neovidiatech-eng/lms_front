import { X } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface AddMultipleSessionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (sessions: any) => void;
}

interface WeekDay {
  id: string;
  name: string;
  checked: boolean;
  time: string;
}

export default function AddMultipleSessionsModal({ isOpen, onClose, onAdd }: AddMultipleSessionsModalProps) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    sessionName: '',
    student: '',
    teacher: '',
    subject: '',
    monthYear: '',
    duration: '60',
    meetingLink: ''
  });

  const [weekDays, setWeekDays] = useState<WeekDay[]>([
    { id: 'sunday', name: 'الأحد', checked: false, time: '10:00' },
    { id: 'monday', name: 'الاثنين', checked: false, time: '10:00' },
    { id: 'tuesday', name: 'الثلاثاء', checked: false, time: '10:00' },
    { id: 'wednesday', name: 'الأربعاء', checked: false, time: '10:00' },
    { id: 'thursday', name: 'الخميس', checked: false, time: '10:00' },
    { id: 'friday', name: 'الجمعة', checked: false, time: '10:00' },
    { id: 'saturday', name: 'السبت', checked: false, time: '10:00' }
  ]);

  const teacherSubjects: Record<string, { id: string; name: string }[]> = {
    teacher1: [
      { id: 'quran', name: 'القرآن الكريم' },
      { id: 'tajweed', name: 'التجويد' }
    ],
    teacher2: [
      { id: 'arabic', name: 'اللغة العربية' },
      { id: 'grammar', name: 'النحو والصرف' }
    ]
  };

  const studentPackages: Record<string, { name: string; sessionsRemaining: number; totalSessions: number }> = {
    student1: {
      name: 'باقة القرآن الكريم',
      sessionsRemaining: 8,
      totalSessions: 12
    },
    student2: {
      name: 'باقة اللغة العربية',
      sessionsRemaining: 5,
      totalSessions: 10
    }
  };

  const availableSubjects = formData.teacher ? teacherSubjects[formData.teacher] || [] : [];
  const selectedStudentPackage = formData.student ? studentPackages[formData.student] : null;

  const text = {
    title: { ar: 'إضافة حصص متعددة', en: 'Add Multiple Sessions' },
    sessionName: { ar: 'اسم الحصة', en: 'Session Name' },
    student: { ar: 'الطالب', en: 'Student' },
    selectStudent: { ar: 'اختر الطالب', en: 'Select Student' },
    teacher: { ar: 'المعلم', en: 'Teacher' },
    selectTeacher: { ar: 'اختر المعلم', en: 'Select Teacher' },
    teacherQuestion: { ar: 'اختر المعلم أولاً', en: 'Select Teacher First' },
    subject: { ar: 'المادة', en: 'Subject' },
    selectSubject: { ar: 'اختر المادة', en: 'Select Subject' },
    monthYear: { ar: 'الشهر والسنة', en: 'Month & Year' },
    duration: { ar: 'مدة الحصة', en: 'Session Duration' },
    meetingLink: { ar: 'رابط الحصة (Zoom/Google Meet)', en: 'Meeting Link (Zoom/Google Meet)' },
    minutes30: { ar: '30 دقيقة', en: '30 minutes' },
    minutes60: { ar: '60 دقيقة', en: '60 minutes' },
    weekDays: { ar: 'أيام الأسبوع', en: 'Week Days' },
    startTime: { ar: 'وقت البداية', en: 'Start Time' },
    endTime: { ar: 'وقت النهاية', en: 'End Time' },
    preview: { ar: 'معاينة الحصص', en: 'Preview Sessions' },
    sessionSchedule: { ar: 'جدول الحصص', en: 'Session Schedule' },
    day: { ar: 'اليوم', en: 'Day' },
    time: { ar: 'الوقت', en: 'Time' },
    date: { ar: 'التاريخ', en: 'Date' },
    cancel: { ar: 'إلغاء', en: 'Cancel' },
    add: { ar: 'إضافة', en: 'Add' },
    required: { ar: '*', en: '*' },
    packageInfo: { ar: 'تفاصيل الباقة', en: 'Package Details' },
    packageName: { ar: 'الباقة', en: 'Package' },
    sessionsRemaining: { ar: 'الحصص المتبقية', en: 'Sessions Remaining' },
    totalSessions: { ar: 'إجمالي الحصص', en: 'Total Sessions' },
    warningTitle: { ar: 'تنبيه', en: 'Warning' },
    sessionsExceeded: { ar: 'عدد الحصص المحددة', en: 'Selected sessions count' },
    exceedsPackage: { ar: 'أكبر من الحصص المتبقية في الباقة', en: 'exceeds remaining sessions in package' },
    totalScheduled: { ar: 'إجمالي الحصص المجدولة', en: 'Total Scheduled Sessions' }
  };

  const handleDayToggle = (dayId: string) => {
    setWeekDays(weekDays.map(day =>
      day.id === dayId ? { ...day, checked: !day.checked } : day
    ));
  };

  const handleTimeChange = (dayId: string, time: string) => {
    setWeekDays(weekDays.map(day =>
      day.id === dayId ? { ...day, time } : day
    ));
  };

  const generateSessionPreview = () => {
    if (!formData.monthYear) return [];

    const [year, month] = formData.monthYear.split('-').map(Number);
    const selectedDays = weekDays.filter(day => day.checked);
    const sessions = [];

    const daysInMonth = new Date(year, month, 0).getDate();

    for (let date = 1; date <= daysInMonth; date++) {
      const currentDate = new Date(year, month - 1, date);
      const dayOfWeek = currentDate.getDay();

      const matchingDay = selectedDays.find(day => {
        const dayIndex = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].indexOf(day.id);
        return dayIndex === dayOfWeek;
      });

      if (matchingDay) {
        sessions.push({
          date: currentDate.toLocaleDateString('ar-EG', { year: 'numeric', month: '2-digit', day: '2-digit' }),
          day: matchingDay.name,
          time: matchingDay.time
        });
      }
    }

    return sessions;
  };

  const sessionPreview = generateSessionPreview();
  const sessionsExceedPackage = selectedStudentPackage && sessionPreview.length > selectedStudentPackage.sessionsRemaining;

  const calculateEndTime = (startTime: string, duration: string) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + parseInt(duration);
    const endHours = Math.floor(totalMinutes / 60) % 24;
    const endMinutes = totalMinutes % 60;
    return `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (sessionsExceedPackage) {
      alert('عدد الحصص المحددة أكبر من الحصص المتبقية في الباقة. الرجاء تقليل عدد الأيام أو اختيار شهر آخر.');
      return;
    }

    onAdd({ formData, sessions: sessionPreview });
    setFormData({
      sessionName: '',
      student: '',
      teacher: '',
      subject: '',
      monthYear: '',
      duration: '60',
      meetingLink: ''
    });
    setWeekDays(weekDays.map(day => ({ ...day, checked: false, time: '10:00' })));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">{text.title[language]}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 text-right">
                {text.sessionName[language]} <span className="text-red-500">{text.required[language]}</span>
              </label>
              <input
                type="text"
                value={formData.sessionName}
                onChange={(e) => setFormData({ ...formData, sessionName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-right"
                placeholder="مثال: حصة القرآن الكريم"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 text-right">
                  {text.student[language]} <span className="text-red-500">{text.required[language]}</span>
                </label>
                <select
                  value={formData.student}
                  onChange={(e) => setFormData({ ...formData, student: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-right"
                  required
                >
                  <option value="">{text.selectStudent[language]}</option>
                  <option value="student1">أحمد محمد</option>
                  <option value="student2">سارة علي</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 text-right">
                  {text.teacher[language]} <span className="text-red-500">{text.required[language]}</span>
                </label>
                <select
                  value={formData.teacher}
                  onChange={(e) => setFormData({ ...formData, teacher: e.target.value, subject: '' })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-right"
                  required
                >
                  <option value="">{text.selectTeacher[language]}</option>
                  <option value="teacher1">Ahmed Qandil</option>
                  <option value="teacher2">Ahmed Gamal</option>
                </select>
              </div>
            </div>

            {selectedStudentPackage && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-blue-900 mb-3 text-right">{text.packageInfo[language]}</h3>
                <div className="grid grid-cols-3 gap-4 text-right">
                  <div>
                    <p className="text-xs text-blue-600 mb-1">{text.packageName[language]}</p>
                    <p className="text-sm font-medium text-blue-900">{selectedStudentPackage.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-600 mb-1">{text.sessionsRemaining[language]}</p>
                    <p className="text-sm font-medium text-blue-900">{selectedStudentPackage.sessionsRemaining}</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-600 mb-1">{text.totalSessions[language]}</p>
                    <p className="text-sm font-medium text-blue-900">{selectedStudentPackage.totalSessions}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 text-right">
                {text.subject[language]} <span className="text-red-500">{text.required[language]}</span>
              </label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-right disabled:bg-gray-50 disabled:text-gray-500"
                required
                disabled={!formData.teacher}
              >
                <option value="">{formData.teacher ? text.selectSubject[language] : text.teacherQuestion[language]}</option>
                {availableSubjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 text-right">
                  {text.monthYear[language]} <span className="text-red-500">{text.required[language]}</span>
                </label>
                <input
                  type="month"
                  value={formData.monthYear}
                  onChange={(e) => setFormData({ ...formData, monthYear: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-right"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 text-right">
                  {text.duration[language]} <span className="text-red-500">{text.required[language]}</span>
                </label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-right"
                  required
                >
                  <option value="30">{text.minutes30[language]}</option>
                  <option value="60">{text.minutes60[language]}</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 text-right">
                  {text.meetingLink[language]}
                </label>
                <input
                  type="url"
                  value={formData.meetingLink}
                  onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-right"
                  placeholder="https://zoom.us/j/..."
                  dir="ltr"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 text-right">
                {text.weekDays[language]} <span className="text-red-500">{text.required[language]}</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {weekDays.map((day) => (
                  <div
                    key={day.id}
                    className={`border rounded-xl p-4 transition-all ${
                      day.checked ? 'border-primary bg-primary-light' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <input
                        type="time"
                        value={day.time}
                        onChange={(e) => handleTimeChange(day.id, e.target.value)}
                        className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-left"
                        disabled={!day.checked}
                        dir="ltr"
                      />
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-900">{day.name}</span>
                        <input
                          type="checkbox"
                          checked={day.checked}
                          onChange={() => handleDayToggle(day.id)}
                          className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                      </div>
                    </div>
                    {day.checked && (
                      <div className="pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-600 text-right">
                          {text.endTime[language]}: <span className="font-medium text-gray-900" dir="ltr">{calculateEndTime(day.time, formData.duration)}</span>
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {sessionsExceedPackage && (
              <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm">!</div>
                  <div className="flex-1 text-right">
                    <h4 className="font-semibold text-red-900 mb-1">{text.warningTitle[language]}</h4>
                    <p className="text-sm text-red-800">
                      {text.sessionsExceeded[language]} ({sessionPreview.length} حصة) {text.exceedsPackage[language]} ({selectedStudentPackage?.sessionsRemaining} حصة)
                    </p>
                  </div>
                </div>
              </div>
            )}

            {sessionPreview.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 text-right">{text.sessionSchedule[language]}</h3>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 max-h-96 overflow-y-auto">
                  <div className="space-y-2">
                    {sessionPreview.map((session, index) => (
                      <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-lg p-3 flex items-center justify-between text-right"
                      >
                        <div className="text-left" dir="ltr">
                          <span className="text-sm font-medium text-gray-900">{session.time}</span>
                          <span className="text-xs text-gray-500 mx-1">-</span>
                          <span className="text-sm font-medium text-gray-900">{calculateEndTime(session.time, formData.duration)}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-600">{session.date}</span>
                          <span className="text-sm font-medium text-gray-900">{session.day}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 text-right">
                      {text.totalScheduled[language]}: <span className={`font-bold ${sessionsExceedPackage ? 'text-red-600' : 'text-gray-900'}`}>{sessionPreview.length}</span> حصة
                      {selectedStudentPackage && (
                        <span className="mr-2 text-gray-500">
                          (المتبقي في الباقة: {selectedStudentPackage.sessionsRemaining})
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-8">
            <button
              type="submit"
              className="flex-1 px-6 py-3 btn-primary text-white rounded-xl transition-colors font-medium"
            >
              {text.add[language]}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              {text.cancel[language]}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
