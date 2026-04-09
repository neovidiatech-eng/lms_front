import { X, Users } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import CustomSelect from '../ui/CustomSelect';
import { TeacherFormData, getTeacherSchema } from '../../lib/schemas/TeacherSchema';
import { Controller, FieldPath, Resolver, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomCheckbox } from '../ui/CustomCheckbox';

interface AddTeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (teacherData: TeacherFormData) => void;
}

export default function AddTeacherModal({ isOpen, onClose, onSubmit }: AddTeacherModalProps) {
  const { language, t } = useLanguage();
  const { register, handleSubmit, control, watch, reset, formState: { errors } } = useForm<TeacherFormData>({
    resolver: zodResolver(getTeacherSchema(t)) as Resolver<TeacherFormData>,
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      hourlyRate: 0,
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
    }
  });

  const handleOnSubmit = (data: TeacherFormData) => {
    onSubmit(data);
    onClose();
    reset();
  };

  if (!isOpen) return null;
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
            <span>{language === 'ar' ? 'إضافة معلم جديد' : 'Add New Teacher'}</span>
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-right"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-right"
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
                  {language === 'ar' ? 'كلمة المرور' : 'Password'} *
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register('password')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-left bg-gray-50"
                  dir="ltr"
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}

              </div>

              {/* Phone */}
              <div className="text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'الهاتف' : 'Phone'} *
                </label>
                <input
                  type="tel"
                  placeholder="admin@admin.com"
                  {...register('phone')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-right"
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
                  {...register('hourlyRate', { valueAsNumber: true })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-right"
                  dir="ltr"
                />
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
                      {/* <input
                        type="checkbox"
                        checked={!!subjectsValue?.[subject.id as keyof typeof subjectsValue]}
                        onChange={(e) => setValue(`subjects.${subject.id as keyof TeacherFormData['subjects']}`, e.target.checked, { shouldValidate: true })}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      /> */}

                      <CustomCheckbox
                        checked={!!subjectsValue?.[subject.id as keyof typeof subjectsValue]}
                        onChange={(checked) => {
                          const name = `subjects.${subject.id}` as FieldPath<TeacherFormData>;
                          setValue(name, checked, { shouldValidate: true });
                        }}
                      />
                      <span className="text-sm text-gray-700 flex-1 text-right">
                        {language === 'ar' ? subject.label : subject.labelEn}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.subjects && <p className="text-red-500 text-xs mt-1">{errors.subjects.message}</p>}

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
