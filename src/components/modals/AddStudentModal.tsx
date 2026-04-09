import { X, GraduationCap } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import CustomSelect from '../ui/CustomSelect';
import { StudentFormData, studentSchema } from '../../lib/schemas/StudentSchema';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePlans } from '../../hooks/usePlans';

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (studentData: StudentFormData) => void;
}

export default function AddStudentModal({ isOpen, onClose, onSubmit }: AddStudentModalProps) {
  const { language } = useLanguage();
  const { data: plansData } = usePlans();
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      countryCode: '+20',
      status: 'active',
      gender: '',
      plan: '',
      country: 'مصر'
    }
  });
  const onFormSubmit = (data: StudentFormData) => {
    onSubmit(data);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  const countryCodes = [
    { code: '+20', country: 'مصر', countryEn: 'Egypt' },
    { code: '+966', country: 'السعودية', countryEn: 'Saudi Arabia' },
    { code: '+971', country: 'الإمارات', countryEn: 'UAE' },
    { code: '+965', country: 'الكويت', countryEn: 'Kuwait' },
  ];

  const plans = plansData?.data || [];

  const planOptions = [
    { value: '', label: language === 'ar' ? 'بدون خطة' : 'No Plan' },
    ...plans.map((p: any) => ({
      value: p.id,
      label: language === 'ar' ? p.name_ar : p.name_en,
    }))
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

  const countryCodeOptions = countryCodes.map((c) => ({
    value: c.code,
    searchText: `${c.country} ${c.countryEn} ${c.code}`,
    label: (
      <div className="flex justify-between items-center w-full">
        <span className="font-mono">{c.code}</span>
        <span className="text-gray-500 text-xs">{language === 'ar' ? c.country : c.countryEn}</span>
      </div>
    ),
  }));

  const genderOptions = genders.filter(g => g.id !== '').map((g) => ({
    value: g.id,
    label: language === 'ar' ? g.label : g.labelEn,
  }));

  const countryOptions = countries.filter(c => c.id !== '').map((c) => ({
    value: c.id,
    label: language === 'ar' ? c.label : c.labelEn,
  }));



  const statusOptions = statuses.map((s) => ({
    value: s.id,
    label: language === 'ar' ? s.label : s.labelEn,
  }));

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
            <GraduationCap className="w-6 h-6" />
            <span>{language === 'ar' ? 'إضافة طالب جديد' : 'Add New Student'}</span>
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onFormSubmit)} className="p-6">
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
                  {...register('name')}
                  placeholder={language === 'ar' ? 'ex :- Mohamed' : 'ex :- Mohamed'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-right"
                  dir="rtl"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div className="text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'البريد الإلكتروني' : 'Email'} *
                </label>
                <input
                  type="email"
                  required
                  {...register('email')}
                  placeholder="ex :- 6I6Tt@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-right"
                  dir="ltr"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
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

                  {...register('phone')}
                  placeholder="ex :- 01091536978"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-right"
                  dir="ltr"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>

              {/* Country Code */}
              <Controller
                name="countryCode"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    label={language === 'ar' ? 'رمز الدولة' : 'Code'}
                    value={field.value}
                    options={countryCodeOptions}
                    onChange={field.onChange}
                  />
                )}
              />
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
                  {...register('birthDate')}
                  placeholder="dd/mm/yyyy"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-right"
                />

              </div>

              {/* Gender */}
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    label={language === 'ar' ? 'الجنس' : 'Gender'}
                    value={field.value}
                    options={genderOptions}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>

            {/* Row 4: Plan and Country */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Country */}
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    label={language === 'ar' ? 'الدولة' : 'Country'}
                    value={field.value}
                    options={countryOptions}
                    placeholder={language === 'ar' ? 'اختر الدولة' : 'Select Country'}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                name="plan"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    label={language === 'ar' ? 'الخطة الدراسية' : 'Plan'}
                    value={field.value}
                    options={planOptions}
                    onChange={field.onChange}
                  />
                )}
              />
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
                  {...register('password')}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-right bg-gray-50"
                  dir="ltr"
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>

              {/* Status */}
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    label={language === 'ar' ? 'الحالة' : 'Status'}
                    value={field.value}
                    options={statusOptions}
                    onChange={field.onChange}
                  />
                )}
              />
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
            <button type="submit" className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
              {language === 'ar' ? 'حفظ' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
