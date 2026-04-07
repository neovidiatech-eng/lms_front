import { BookOpen, X, Check } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext'; // تأكدي من مسار الـ context
import { SubjectFormData, subjectSchema } from '../../lib/schemas/SubjectsSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

interface Subject {
  id: string;
  nameAr: string;
  nameEn: string;
  status: 'active' | 'inactive';
  color: string;
}

export const COLORS = [
  { id: 'green', bg: 'bg-green-100', icon: 'text-green-600', border: 'border-green-200', label: { ar: 'أخضر', en: 'Green' } },
  { id: 'blue', bg: 'bg-blue-100', icon: 'text-blue-600', border: 'border-blue-200', label: { ar: 'أزرق', en: 'Blue' } },
  { id: 'orange', bg: 'bg-orange-100', icon: 'text-orange-600', border: 'border-orange-200', label: { ar: 'برتقالي', en: 'Orange' } },
  { id: 'red', bg: 'bg-red-100', icon: 'text-red-600', border: 'border-red-200', label: { ar: 'أحمر', en: 'Red' } },
  { id: 'teal', bg: 'bg-teal-100', icon: 'text-teal-600', border: 'border-teal-200', label: { ar: 'أزرق مخضر', en: 'Teal' } },
  { id: 'yellow', bg: 'bg-yellow-100', icon: 'text-yellow-600', border: 'border-yellow-200', label: { ar: 'أصفر', en: 'Yellow' } },
  { id: 'pink', bg: 'bg-pink-100', icon: 'text-pink-600', border: 'border-pink-200', label: { ar: 'وردي', en: 'Pink' } },
  { id: 'gray', bg: 'bg-gray-100', icon: 'text-gray-600', border: 'border-gray-200', label: { ar: 'رمادي', en: 'Gray' } },
];

interface SubjectFormProps {
  initial?: Partial<Subject>;
  onSave: (data:SubjectFormData) => void;
  onCancel: () => void;
  title: string;
}

export default function SubjectForm({ initial, onSave, onCancel, title }: SubjectFormProps) {
  const { language } = useLanguage();
const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<SubjectFormData>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      nameAr: initial?.nameAr || '',
      nameEn: initial?.nameEn || '',
      status: initial?.status || 'active',
      color: initial?.color || 'green',
    }
  });

  const selectedColor = watch('color');
  const selectedStatus = watch('status');

  useEffect(() => {
    if (initial) reset(initial);
  }, [initial, reset]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onCancel}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit(onSave)} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-gray-700 text-right mb-1.5">
              {language === 'ar' ? 'اسم المادة (عربي)' : 'Subject Name (Arabic)'}
              <span className="text-red-500 mr-1">*</span>
            </label>
            <input
              type="text"
             {...register('nameAr')}
              dir="rtl"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-right"
            />
            {errors.nameAr && <p className="text-red-500 text-xs mt-1 text-right">{errors.nameAr.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 text-right mb-1.5">
              {language === 'ar' ? 'اسم المادة (إنجليزي)' : 'Subject Name (English)'}
            </label>
            <input
              type="text"
            {...register('nameEn')}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
            />
            {errors.nameEn && <p className="text-red-500 text-xs mt-1 text-right">{errors.nameEn.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 text-right mb-2">
              {language === 'ar' ? 'اللون' : 'Color'}
            </label>
            <div className="grid grid-cols-4 gap-2">
              {COLORS.map(c => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setValue('color', c.id)}
                  className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border-2 transition-all ${
                    selectedColor === c.id ? `${c.border} ring-2 ring-blue-400` : 'border-transparent hover:border-gray-200'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg ${c.bg} flex items-center justify-center`}>
                    <BookOpen className={`w-4 h-4 ${c.icon}`} />
                  </div>
                  <span className="text-[10px] text-gray-600">{c.label[language]}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 text-right mb-1.5">
              {language === 'ar' ? 'الحالة' : 'Status'}
            </label>
            <div className="flex gap-3">
              {(['active', 'inactive'] as const).map(s => (
               <button
                  key={s}
                  type="button"
                  onClick={() => setValue('status', s)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                    selectedStatus === s 
                      ? (s === 'active' ? 'border-green-400 bg-green-50 text-green-700' : 'border-gray-400 bg-gray-50 text-gray-700')
                      : 'border-gray-200 text-gray-500 hover:border-gray-300'
                  }`}
                >
                  {status === s && <Check className="w-4 h-4" />}
                  {s === 'active' ? (language === 'ar' ? 'نشط' : 'Active') : (language === 'ar' ? 'غير نشط' : 'Inactive')}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <button type="button" onClick={onCancel} className="flex-1 px-4 py-3 border border-gray-300 rounded-xl font-medium">
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </button>
            <button type="submit" className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-medium shadow-lg shadow-blue-600/20">
              {language === 'ar' ? 'حفظ' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}