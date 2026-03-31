import { X, GraduationCap } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (studentData: any) => void;
}

export default function AddStudentModal({ isOpen, onClose, onSubmit }: AddStudentModalProps) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+20',
    phone: '',
    gender: '',
    birthDate: '',
    plan: '',
    country: '',
    status: 'active',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  const countryCodes = [
    { code: '+20', country: 'مصر', countryEn: 'Egypt' },
    { code: '+966', country: 'السعودية', countryEn: 'Saudi Arabia' },
    { code: '+971', country: 'الإمارات', countryEn: 'UAE' },
    { code: '+965', country: 'الكويت', countryEn: 'Kuwait' },
  ];

  const plans = [
    { id: '', label: 'بدون خطة', labelEn: 'No Plan' },
    { id: 'secondary_1', label: 'ثانية القصيرة', labelEn: 'Secondary Short' },
    { id: 'secondary_2', label: 'ثانية التفاضلية', labelEn: 'Secondary Calculus' },
    { id: 'prep_3', label: 'ثالثة إعدادي', labelEn: 'Preparatory 3' },
  ];

  const countries = [
    { id: '', label: 'اختر الدولة', labelEn: 'Select Country' },
    { id: 'egypt', label: 'مصر', labelEn: 'Egypt' },
    { id: 'saudi', label: 'السعودية', labelEn: 'Saudi Arabia' },
    { id: 'uae', label: 'الإمارات', labelEn: 'UAE' },
    { id: 'kuwait', label: 'الكويت', labelEn: 'Kuwait' },
  ];

  const genders = [
    { id: '', label: 'اختر الجنس', labelEn: 'Select Gender' },
    { id: 'male', label: 'ذكر', labelEn: 'Male' },
    { id: 'female', label: 'أنثى', labelEn: 'Female' },
  ];

  const statuses = [
    { id: 'active', label: 'نشط', labelEn: 'Active' },
    { id: 'inactive', label: 'متوقف', labelEn: 'Inactive' },
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
            <GraduationCap className="w-6 h-6" />
            <span>{language === 'ar' ? 'إضافة طالب جديد' : 'Add New Student'}</span>
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Row 1: Name and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'الاسم' : 'Name'} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={language === 'ar' ? 'ex :- Mohamed' : 'ex :- Mohamed'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-right"
                  dir="rtl"
                />
              </div>

              {/* Email */}
              <div className="text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'البريد الإلكتروني' : 'Email'} *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ex :- 6I6Tt@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-right"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Row 2: Country Code and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Phone */}
              <div className="text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'الهاتف' : 'Phone'} *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="ex :- 01091536978"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-right"
                  dir="ltr"
                />
              </div>

              {/* Country Code */}
              <div className="text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'رمز الدولة' : 'Country Code'}
                </label>
                <select
                  value={formData.countryCode}
                  onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-right bg-white"
                >
                  {countryCodes.map((cc) => (
                    <option key={cc.code} value={cc.code}>
                      {cc.code}+
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 3: Gender and Birth Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Birth Date */}
              <div className="text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'تاريخ الميلاد' : 'Birth Date'}
                </label>
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                  placeholder="dd/mm/yyyy"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-right"
                />
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

            {/* Row 4: Plan and Country */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Country */}
              <div className="text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'الدولة' : 'Country'}
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-right bg-white"
                >
                  {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {language === 'ar' ? country.label : country.labelEn}
                    </option>
                  ))}
                </select>
              </div>

              {/* Plan */}
              <div className="text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'الخطة' : 'Plan'}
                </label>
                <select
                  value={formData.plan}
                  onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-right bg-white"
                >
                  {plans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {language === 'ar' ? plan.label : plan.labelEn}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 5: Status and Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Password */}
              <div className="text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'كلمة المرور' : 'Password'} *
                </label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-right bg-gray-50"
                  dir="ltr"
                />
              </div>

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
              {language === 'ar' ? 'حفظ' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
