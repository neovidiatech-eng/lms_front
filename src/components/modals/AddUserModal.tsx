import { useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (userData: any) => void;
}

interface Permission {
  id: string;
  label: string;
  labelEn: string;
}

const permissionGroups = {
  dashboard: {
    title: 'لوحة التحكم',
    titleEn: 'Dashboard',
    permissions: [
      { id: 'dashboard_view', label: 'عرض لوحة التحكم', labelEn: 'View Dashboard' },
    ],
  },
  students: {
    title: 'الطلاب',
    titleEn: 'Students',
    permissions: [
      { id: 'students_manage', label: 'إدارة الطلاب', labelEn: 'Manage Students' },
    ],
  },
  teachers: {
    title: 'المدرسين',
    titleEn: 'Teachers',
    permissions: [
      { id: 'teachers_manage', label: 'إدارة المدرسين', labelEn: 'Manage Teachers' },
    ],
  },
  sessions: {
    title: 'الجلسات',
    titleEn: 'Sessions',
    permissions: [
      { id: 'sessions_manage', label: 'إدارة الجلسات', labelEn: 'Manage Sessions' },
    ],
  },
  plans: {
    title: 'الباقات',
    titleEn: 'Plans',
    permissions: [
      { id: 'plans_manage', label: 'إدارة الباقات', labelEn: 'Manage Plans' },
    ],
  },
  subscriptions: {
    title: 'الاشتراكات',
    titleEn: 'Subscriptions',
    permissions: [
      { id: 'subscriptions_manage', label: 'إدارة الاشتراكات', labelEn: 'Manage Subscriptions' },
    ],
  },
  exams: {
    title: 'الامتحانات',
    titleEn: 'Exams',
    permissions: [
      { id: 'exams_manage', label: 'إدارة الامتحانات', labelEn: 'Manage Exams' },
    ],
  },
  homework: {
    title: 'الواجبات',
    titleEn: 'Homework',
    permissions: [
      { id: 'homework_manage', label: 'إدارة الواجبات', labelEn: 'Manage Homework' },
    ],
  },
  settings: {
    title: 'المواد',
    titleEn: 'Settings',
    permissions: [
      { id: 'settings_manage', label: 'إدارة المواد', labelEn: 'Manage Settings' },
    ],
  },
  preparations: {
    title: 'الإعدادات',
    titleEn: 'Preparations',
    permissions: [
      { id: 'preparations_manage', label: 'إدارة الإعدادات', labelEn: 'Manage Preparations' },
    ],
  },
  users: {
    title: 'المستخدمين',
    titleEn: 'Users',
    permissions: [
      { id: 'users_manage', label: 'إدارة المستخدمين', labelEn: 'Manage Users' },
    ],
  },
  finance: {
    title: 'المالية',
    titleEn: 'Finance',
    permissions: [
      { id: 'finance_manage', label: 'إدارة المالية', labelEn: 'Manage Finance' },
    ],
  },
  chats: {
    title: 'المحادثات',
    titleEn: 'Chats',
    permissions: [
      { id: 'chats_manage', label: 'إدارة المحادثات', labelEn: 'Manage Chats' },
    ],
  },
  withdrawals: {
    title: 'طلبات السحب',
    titleEn: 'Withdrawal Requests',
    permissions: [
      { id: 'withdrawals_manage', label: 'طلبات السحب', labelEn: 'Withdrawal Requests' },
    ],
  },
  creative: {
    title: 'طلبات الإبداع',
    titleEn: 'Creative Requests',
    permissions: [
      { id: 'creative_manage', label: 'طلبات الإبداع', labelEn: 'Creative Requests' },
    ],
  },
};

const countryCodes = [
  { code: '+20', country: 'مصر', flag: '🇪🇬' },
  { code: '+966', country: 'السعودية', flag: '🇸🇦' },
  { code: '+971', country: 'الإمارات', flag: '🇦🇪' },
  { code: '+965', country: 'الكويت', flag: '🇰🇼' },
  { code: '+974', country: 'قطر', flag: '🇶🇦' },
  { code: '+973', country: 'البحرين', flag: '🇧🇭' },
  { code: '+968', country: 'عمان', flag: '🇴🇲' },
  { code: '+962', country: 'الأردن', flag: '🇯🇴' },
  { code: '+961', country: 'لبنان', flag: '🇱🇧' },
  { code: '+963', country: 'سوريا', flag: '🇸🇾' },
  { code: '+964', country: 'العراق', flag: '🇮🇶' },
  { code: '+967', country: 'اليمن', flag: '🇾🇪' },
  { code: '+212', country: 'المغرب', flag: '🇲🇦' },
  { code: '+213', country: 'الجزائر', flag: '🇩🇿' },
  { code: '+216', country: 'تونس', flag: '🇹🇳' },
  { code: '+218', country: 'ليبيا', flag: '🇱🇾' },
  { code: '+249', country: 'السودان', flag: '🇸🇩' },
];

const roles = [
  { id: 'student', label: 'الطالب', labelEn: 'Student' },
  { id: 'guardian', label: 'ولي أمر', labelEn: 'Guardian' },
  { id: 'teacher', label: 'المدرس', labelEn: 'Teacher' },
  { id: 'admin', label: 'مسؤول', labelEn: 'Admin' },
  { id: 'super_admin', label: 'مسؤول أعلى', labelEn: 'Super Admin' },
];

export default function AddUserModal({ isOpen, onClose, onSubmit }: AddUserModalProps) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+20',
    phone: '',
    role: 'student',
    password: '',
    permissions: [] as string[],
  });

  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handlePermissionToggle = (permissionId: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter((id) => id !== permissionId)
        : [...prev.permissions, permissionId],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      email: '',
      countryCode: '+20',
      phone: '',
      role: 'student',
      password: '',
      permissions: [],
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'ar' ? 'إضافة مستخدم جديد' : 'Add New User'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Name and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  {language === 'ar' ? 'الاسم' : 'Name'}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                  required
                />
              </div>
            </div>

            {/* Country Code and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  {language === 'ar' ? 'رمز الدولة' : 'Country Code'}
                </label>
                <select
                  value={formData.countryCode}
                  onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-right bg-white"
                  required
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.country} ({country.code})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  {language === 'ar' ? 'الهاتف' : 'Phone'}
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                  placeholder="1234567890"
                  required
                />
              </div>
            </div>

            {/* Role and Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  {language === 'ar' ? 'الدور' : 'Role'}
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-right bg-white"
                  required
                >
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {language === 'ar' ? role.label : role.labelEn}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  {language === 'ar' ? 'كلمة المرور' : 'Password'}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>
            </div>

            {/* Permissions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4 text-right">
                {language === 'ar' ? 'الصلاحيات' : 'Permissions'}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(permissionGroups).map(([key, group]) => (
                  <div key={key} className="space-y-2">
                    <h3 className="text-sm font-semibold text-gray-900 text-right">
                      {language === 'ar' ? group.title : group.titleEn}
                    </h3>
                    {group.permissions.map((permission) => (
                      <label
                        key={permission.id}
                        className="flex items-center justify-end gap-2 cursor-pointer"
                      >
                        <span className="text-sm text-gray-700">
                          {language === 'ar' ? permission.label : permission.labelEn}
                        </span>
                        <input
                          type="checkbox"
                          checked={formData.permissions.includes(permission.id)}
                          onChange={() => handlePermissionToggle(permission.id)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </label>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors font-medium"
          >
            {language === 'ar' ? 'إلغاء' : 'Cancel'}
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-lg shadow-blue-600/30"
          >
            {language === 'ar' ? 'حفظ' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
