import { X, Users } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface AddTeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (teacherData: any) => void;
}

export default function AddTeacherModal({ isOpen, onClose, onSubmit }: AddTeacherModalProps) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    hourlyRate: '',
    currency: 'EGP',
    gender: 'male',
    status: 'active',
    subjects: {
      quran: false,
      math: false,
      arabic: false,
      math2: false,
      science: false,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      hourlyRate: '',
      currency: 'EGP',
      gender: 'male',
      status: 'active',
      subjects: {
        quran: false,
        math: false,
        arabic: false,
        math2: false,
        science: false,
      },
    });
  };

  if (!isOpen) return null;

  const currencies = [
    { id: 'EGP', label: 'EGP', labelEn: 'EGP' },
    { id: 'SAR', label: 'ر.س', labelEn: 'SAR' },
    { id: 'AED', label: 'د.إ', labelEn: 'AED' },
    { id: 'KWD', label: 'د.ك', labelEn: 'KWD' },
  ];

  const genders = [
    { id: 'male', label: 'ذكر', labelEn: 'Male' },
    { id: 'female', label: 'أنثى', labelEn: 'Female' },
  ];

  const statuses = [
    { id: 'active', label: 'نشط', labelEn: 'Active' },
    { id: 'inactive', label: 'غير نشط', labelEn: 'Inactive' },
  ];

  const subjectsList = [
    { id: 'quran', label: 'القرآن الكريم', labelEn: 'Quran' },
    { id: 'math', label: 'الرياضيات', labelEn: 'Mathematics' },
    { id: 'arabic', label: 'اللغة العربية', labelEn: 'Arabic Language' },
    { id: 'science', label: 'تفسيت', labelEn: 'Science' },
    { id: 'math2', label: 'تفسيت 2', labelEn: 'Mathematics 2' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="w-6 h-6" />
            <span>{language === 'ar' ? 'إضافة معلم جديد' : 'Add New Teacher'}</span>
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Row 1: Name and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email */}
              <div className="text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'البريد الإلكتروني' : 'Email'} *
                </label>
                <input
                  type="email"
                  required
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-right"
                  dir="ltr"
                />
              </div>

              {/* Name */}
              <div className="text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'الاسم' : 'Name'} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={language === 'ar' ? 'الاسم' : 'Name'}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-right"
                  dir="rtl"
                />
              </div>
            </div>

            {/* Row 2: Password and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Password */}
              <div className="text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'كلمة المرور' : 'Password'} *
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-left bg-gray-50"
                  dir="ltr"
                />
              </div>

              {/* Phone */}
              <div className="text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'الهاتف' : 'Phone'} *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="admin@admin.com"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-right"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Row 3: Hourly Rate and Currency */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Currency */}
              <div className="text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'العملة' : 'Currency'}
                </label>
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-right bg-white"
                >
                  {currencies.map((currency) => (
                    <option key={currency.id} value={currency.id}>
                      {currency.id}
                    </option>
                  ))}
                </select>
              </div>

              {/* Hourly Rate */}
              <div className="text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'سعر الساعة' : 'Hourly Rate'}
                </label>
                <input
                  type="number"
                  placeholder="150"
                  value={formData.hourlyRate}
                  onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-right"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Row 4: Gender and Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Status */}
              <div className="text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'الحالة' : 'Status'}
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-right bg-white"
                >
                  {statuses.map((status) => (
                    <option key={status.id} value={status.id}>
                      {language === 'ar' ? status.label : status.labelEn}
                    </option>
                  ))}
                </select>
              </div>

              {/* Gender */}
              <div className="text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'الجنس' : 'Gender'}
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-right bg-white"
                >
                  {genders.map((gender) => (
                    <option key={gender.id} value={gender.id}>
                      {language === 'ar' ? gender.label : gender.labelEn}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Subjects */}
            <div className="text-right">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {language === 'ar' ? 'المواد' : 'Subjects'}
              </label>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="grid grid-cols-2 gap-3">
                  {subjectsList.map((subject) => (
                    <label
                      key={subject.id}
                      className="flex items-center gap-3 cursor-pointer hover:bg-white p-3 rounded-lg transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={formData.subjects[subject.id as keyof typeof formData.subjects]}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            subjects: {
                              ...formData.subjects,
                              [subject.id]: e.target.checked,
                            },
                          })
                        }
                        className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <span className="text-sm text-gray-700 flex-1 text-right">
                        {language === 'ar' ? subject.label : subject.labelEn}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 btn-primary text-white rounded-xl transition-colors font-medium"
            >
              {language === 'ar' ? 'إضافة معلم جديد' : 'Add Teacher'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
