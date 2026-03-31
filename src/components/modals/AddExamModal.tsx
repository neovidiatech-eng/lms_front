import { useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface AddExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (exam: any) => void;
}

export default function AddExamModal({ isOpen, onClose, onAdd }: AddExamModalProps) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    teacher: '',
    studentName: '',
    dueDate: '',
    duration: '',
    grade: 100,
    status: 'upcoming' as 'upcoming' | 'completed'
  });

  const text = {
    title: { ar: 'إضافة امتحان جديد', en: 'Add New Exam' },
    examTitle: { ar: 'العنوان', en: 'Title' },
    subject: { ar: 'المادة', en: 'Subject' },
    teacher: { ar: 'المعلم', en: 'Teacher' },
    student: { ar: 'الطالب', en: 'Student' },
    dueDate: { ar: 'التاريخ', en: 'Date' },
    duration: { ar: 'المدة (دقيقة)', en: 'Duration (minutes)' },
    grade: { ar: 'الدرجة', en: 'Grade' },
    status: { ar: 'الحالة', en: 'Status' },
    upcoming: { ar: 'قادم', en: 'Upcoming' },
    completed: { ar: 'مكتمل', en: 'Completed' },
    cancel: { ar: 'إلغاء', en: 'Cancel' },
    add: { ar: 'إضافة', en: 'Add' }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      id: Date.now().toString(),
      ...formData,
      duration: `${formData.duration} دقيقة`
    });
    setFormData({
      title: '',
      subject: '',
      teacher: '',
      studentName: '',
      dueDate: '',
      duration: '',
      grade: 100,
      status: 'upcoming'
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">{text.title[language]}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4" dir="rtl">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              {text.examTitle[language]}
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-right"
              dir="rtl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              {text.subject[language]}
            </label>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-right"
              dir="rtl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              {text.teacher[language]}
            </label>
            <input
              type="text"
              required
              value={formData.teacher}
              onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-right"
              dir="rtl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              {text.student[language]}
            </label>
            <input
              type="text"
              required
              value={formData.studentName}
              onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-right"
              dir="rtl"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                {text.dueDate[language]}
              </label>
              <input
                type="date"
                required
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-right"
                dir="rtl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                {text.duration[language]}
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-right"
                dir="rtl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                {text.grade[language]}
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-right"
                dir="rtl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                {text.status[language]}
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'upcoming' | 'completed' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-right"
                dir="rtl"
              >
                <option value="upcoming">{text.upcoming[language]}</option>
                <option value="completed">{text.completed[language]}</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              {text.cancel[language]}
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 btn-primary text-white rounded-xl transition-colors font-medium"
            >
              {text.add[language]}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
