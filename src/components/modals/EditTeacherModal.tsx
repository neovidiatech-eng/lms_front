import { X, Users } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import CustomSelect from '../ui/CustomSelect';
import { TeacherFormData, getTeacherSchema } from '../../lib/schemas/TeacherSchema';
import { Controller, Resolver, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Teacher } from '../../types/teachers';
import { useCurrency } from '../../hooks/useCurrency';
import { useSubjects } from '../../hooks/useSubjects';
import { CustomCheckbox } from '../ui/CustomCheckbox';

interface EditTeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (teacherData: TeacherFormData) => void;
  teacher: Teacher | null;
}

export default function EditTeacherModal({ isOpen, onClose, onSubmit, teacher }: EditTeacherModalProps) {
  const { language, t } = useLanguage();
  const { data: currenciesData } = useCurrency();
  const { data: subjectsData, isLoading: isLoadingSubjects } = useSubjects();

  const { register, handleSubmit, setValue, watch, control, reset, formState: { errors }, } = useForm<TeacherFormData>({
    resolver: zodResolver(getTeacherSchema(t)) as Resolver<TeacherFormData>,
  });

  const currencyOptions = useMemo(() => {
    if (!currenciesData?.currencies) return [];
    return currenciesData.currencies.map(c => ({
      value: c.id,
      label: language === 'ar' ? `${c.name_ar} (${c.symbol})` : `${c.name_en} (${c.code})`
    }));
  }, [currenciesData, language]);

  useEffect(() => {
    if (teacher) {
      console.log("==> EditTeacherModal Mount:", teacher);

      // Extract subject IDs directly from the API response
      // Handles both cases: subject_ids being an array of objects or an array of GUIDs
      const subjectsArray = teacher.subject_ids || (teacher as any).subjects || (teacher as any).subjectIds || (teacher as any).Subjects || [];
      const subjectIds = subjectsArray.map((s: any) => {
        if (typeof s === 'object') return s?.id;
        return String(s);
      }).filter(Boolean);

      const currencyRaw = (teacher as any).currency || teacher.currency_id || (teacher as any).currencyId;
      const currencyId = typeof currencyRaw === 'object' ? currencyRaw?.id : currencyRaw;
      
      console.log("==> Extracted Data:", { subjectIds, currencyId });

      reset({
        name: teacher.name,
        email: teacher.email,
        phone: teacher.phone,
        password: '',
        hourlyRate: teacher.hour_price || (teacher as any).hourPrice || 0,
        currency: currencyId || '',
        gender: teacher.gender || 'male',
        status: teacher.active ? 'active' : 'inactive',
        subjects: subjectIds,
      });
    }
  }, [teacher, reset]);

  const handleOnSubmit = (data: TeacherFormData) => {
    onSubmit(data);
    onClose();
  };

  if (!isOpen || !teacher) return null;
  const subjectsValue = watch('subjects') || [];

  const handleSubjectToggle = (id: string, checked: boolean) => {
    if (checked) {
      setValue('subjects', [...subjectsValue, id], { shouldValidate: true });
    } else {
      setValue('subjects', subjectsValue.filter(s => s !== id), { shouldValidate: true });
    }
  };

  const genders = [
    { id: 'male', label: 'ذكر', labelEn: 'Male' },
    { id: 'female', label: 'أنثى', labelEn: 'Female' },
  ];

  const statuses = [
    { id: 'active', label: 'نشط', labelEn: 'Active' },
    { id: 'inactive', label: 'غير نشط', labelEn: 'Inactive' },
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
                  {t('email')} *
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
                  {t('fullName')} *
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
                  {t('password')}
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
                  {t('phoneNumber')} *
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
                    label={t('currency')}
                    value={field.value}
                    options={currencyOptions}
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
                    label={t('status')}
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
                {isLoadingSubjects ? (
                  <div className="flex justify-center p-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-primary"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {(subjectsData?.subjects || []).map((subject) => (
                      <label
                        key={subject.id}
                        className="flex items-center gap-3 cursor-pointer hover:bg-white p-3 rounded-lg transition-colors"
                      >
                        <CustomCheckbox
                          checked={subjectsValue.includes(subject.id)}
                          onChange={(checked) => handleSubjectToggle(subject.id, checked)}
                        />
                        <span className="text-sm text-gray-700 flex-1 text-right">
                          {language === 'ar' ? subject.name_ar : (subject.name_en || subject.name_ar)}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
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
