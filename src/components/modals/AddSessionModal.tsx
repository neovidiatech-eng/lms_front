import { X } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface AddSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (session: any) => void;
}

export default function AddSessionModal({ isOpen, onClose, onAdd }: AddSessionModalProps) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    student: '',
    teacher: '',
    subject: '',
    title: '',
    sessionDate: '',
    startTime: '',
    endTime: '',
    meetingLink: '',
    notes: ''
  });

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
    title: { ar: 'إضافة حصة واحدة', en: 'Add Single Session' },
    student: { ar: 'الطالب', en: 'Student' },
    selectStudent: { ar: 'اختر الطالب', en: 'Select Student' },
    teacher: { ar: 'المعلم', en: 'Teacher' },
    selectTeacher: { ar: 'اختر المعلم', en: 'Select Teacher' },
    teacherQuestion: { ar: 'اختر المعلم أولاً', en: 'Select Teacher First' },
    subject: { ar: 'المادة', en: 'Subject' },
    selectSubject: { ar: 'اختر المادة', en: 'Select Subject' },
    sessionTitle: { ar: 'العنوان', en: 'Title' },
    sessionTitlePlaceholder: { ar: 'عنوان الحصة', en: 'Session Title' },
    sessionDate: { ar: 'تاريخ الحصة', en: 'Session Date' },
    description: { ar: 'الوصف', en: 'Description' },
    descriptionPlaceholder: { ar: 'وصف الحصة', en: 'Session Description' },
    startTime: { ar: 'وقت البداية', en: 'Start Time' },
    endTime: { ar: 'وقت النهاية', en: 'End Time' },
    meetingLink: { ar: 'رابط الاجتماع', en: 'Meeting Link' },
    meetingLinkPlaceholder: { ar: 'https://zoom.us/...', en: 'https://zoom.us/...' },
    notes: { ar: 'ملاحظات', en: 'Notes' },
    notesPlaceholder: { ar: 'ملاحظات إضافية', en: 'Additional Notes' },
    cancel: { ar: 'إلغاء', en: 'Cancel' },
    add: { ar: 'إضافة', en: 'Add' },
    required: { ar: '*', en: '*' },
    packageInfo: { ar: 'تفاصيل الباقة', en: 'Package Details' },
    packageName: { ar: 'الباقة', en: 'Package' },
    sessionsRemaining: { ar: 'الحصص المتبقية', en: 'Sessions Remaining' },
    totalSessions: { ar: 'إجمالي الحصص', en: 'Total Sessions' }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      student: '',
      teacher: '',
      subject: '',
      title: '',
      sessionDate: '',
      startTime: '',
      endTime: '',
      meetingLink: '',
      notes: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 text-right">
                  تاريخ الحصة <span className="text-red-500">{text.required[language]}</span>
                </label>
                <input
                  type="date"
                  value={formData.sessionDate}
                  onChange={(e) => setFormData({ ...formData, sessionDate: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-right"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 text-right">
                  {text.sessionTitle[language]} <span className="text-red-500">{text.required[language]}</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder={text.sessionTitlePlaceholder[language]}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-right"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 text-right">
                {text.description[language]}
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder={text.descriptionPlaceholder[language]}
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-right resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 text-right">
                  {text.startTime[language]} <span className="text-red-500">{text.required[language]}</span>
                </label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-right"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 text-right">
                  {text.endTime[language]} <span className="text-red-500">{text.required[language]}</span>
                </label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-right"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 text-right">
                {text.meetingLink[language]}
              </label>
              <input
                type="url"
                value={formData.meetingLink}
                onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                placeholder={text.meetingLinkPlaceholder[language]}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-right"
                dir="ltr"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 text-right">
                {text.notes[language]}
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder={text.notesPlaceholder[language]}
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-right resize-none"
              />
            </div>
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
