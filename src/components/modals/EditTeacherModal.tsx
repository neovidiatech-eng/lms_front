import { X, Users } from 'lucide-react';
import { useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import CustomSelect from '../ui/CustomSelect';
import { TeacherFormData, getTeacherSchema } from '../../lib/schemas/TeacherSchema';
import { Controller, Resolver, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  amount: number;
  currency: string;
  status: 'active' | 'inactive';
  subject: string;
}

interface EditTeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (teacherData: TeacherFormData) => void;
  teacher: Teacher | null;
}

export default function EditTeacherModal({ isOpen, onClose, onSubmit, teacher }: EditTeacherModalProps) {
  const { language, t } = useLanguage();
  const { register, handleSubmit, setValue, watch, control, reset, formState: { errors }, } = useForm<TeacherFormData>({
    resolver: zodResolver(getTeacherSchema(t)) as Resolver<TeacherFormData>,

  })


  useEffect(() => {
    if (teacher) {
      const subjectsArray = teacher.subject.split('،').map(s => s.trim());
      reset({
        name: teacher.name,
        email: teacher.email,
        phone: teacher.phone,
        password: '',
        hourlyRate: teacher.amount,
        currency: teacher.currency,
        gender: 'male',
        status: teacher.status,
        subjects: {
          quran: subjectsArray.some(s => s.includes('القرآن')),
          math: subjectsArray.some(s => s.includes('الرياضيات')),
          arabic: subjectsArray.some(s => s.includes('العربية')),
          math2: subjectsArray.some(s => s.includes('تفسيت 2')),
          science: subjectsArray.some(s => s.includes('تفسيت') && !s.includes('2')),
        },
      });
    }
  }, [teacher, reset]);

  const handleOnSubmit = (data: TeacherFormData) => {
    onSubmit(data);
    onClose();
  };

  if (!isOpen || !teacher) return null;
  const subjectsValue = watch('subjects');
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
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh]  overflow-y-auto no-scrollbar">
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
            <span>{language === 'ar' ? 'تعديل بيانات المعلم' : 'Edit Teacher'}</span>
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleOnSubmit)} className="p-6">
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
                  placeholder="example@email.com"
                  {...register('email')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                  dir="ltr"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              {/* Name */}
              <div className="text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'الاسم' : 'Name'} *
                </label>
                <input
                  type="text"
                  placeholder={language === 'ar' ? 'الاسم' : 'Name'}
                  {...register('name')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                  dir="rtl"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
            </div>

            {/* Row 2: Password and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Password */}
              <div className="text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'كلمة المرور' : 'Password'}
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register('password')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-left bg-gray-50"
                  dir="ltr"
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                <p className="text-xs text-gray-500 mt-1 text-right">
                  {language === 'ar' ? 'اتركه فارغاً إذا كنت لا تريد تغييره' : 'Leave blank if you don\'t want to change it'}
                </p>
              </div>

              {/* Phone */}
              <div className="text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'الهاتف' : 'Phone'} *
                </label>
                <input
                  type="tel"
                  placeholder="01012345678"
                  {...register('phone')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                  dir="ltr"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>
            </div>

            {/* Row 3: Hourly Rate and Currency */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Currency */}
              <Controller
                name="currency"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    label={language === 'ar' ? 'العملة' : 'Currency'}
                    value={field.value}
                    options={currencies.map(c => ({ value: c.id, label: language === 'ar' ? c.label : c.labelEn }))}
                    onChange={field.onChange}
                  />
                )}
              />

              {/* Hourly Rate */}
              <div className="text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'سعر الساعة' : 'Hourly Rate'}
                </label>
                <input
                  type="number"
                  placeholder="150"
                  {...register('hourlyRate')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                  dir="ltr"
                />
                {errors.hourlyRate && <p className="text-red-500 text-xs mt-1">{errors.hourlyRate.message}</p>}
              </div>
            </div>

            {/* Row 4: Gender and Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Status */}
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    label={language === 'ar' ? 'الحالة' : 'Status'}
                    value={field.value}
                    options={statuses.map(s => ({ value: s.id, label: language === 'ar' ? s.label : s.labelEn }))}
                    onChange={field.onChange}
                  />
                )}
              />
              {/* Gender */}
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    label={language === 'ar' ? 'الجنس' : 'Gender'}
                    value={field.value}
                    options={genders.map(g => ({ value: g.id, label: language === 'ar' ? g.label : g.labelEn }))}
                    onChange={field.onChange}
                  />
                )}
              />
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
                        checked={!!subjectsValue?.[subject.id as keyof typeof subjectsValue]}
                        onChange={(e) => setValue(`subjects.${subject.id as keyof TeacherFormData['subjects']}`, e.target.checked, { shouldValidate: true })}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 flex-1 text-right">
                        {language === 'ar' ? subject.label : subject.labelEn}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.subjects && <p className="text-red-500 text-xs mt-2">{errors.subjects.message}</p>}
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
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-lg shadow-blue-600/30"
            >
              {language === 'ar' ? 'حفظ التعديلات' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
