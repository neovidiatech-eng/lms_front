import { X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLanguage } from '../../contexts/LanguageContext';
import CustomSelect from '../ui/CustomSelect';
// تأكدي من استيراد الـ Schema الصحيح للمتعدد
import { multipleSessionsSchema, MultipleSessionsFormData } from '../../lib/schemas/SessionSchema';
export interface SessionPreviewItem {
  date: string;
  day: string;
  time: string;
}
interface AddMultipleSessionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: { formData: MultipleSessionsFormData; sessions: SessionPreviewItem[] }) => void;
}

export default function AddMultipleSessionsModal({ isOpen, onClose, onAdd }: AddMultipleSessionsModalProps) {
  const { language } = useLanguage();

  // 1. إعداد React Hook Form
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = useForm<MultipleSessionsFormData>({
    resolver: zodResolver(multipleSessionsSchema),
    defaultValues: {
      duration: '60',
      student: '',
      teacher: '',
      subject: '',
      monthYear: '',
      meetingLink: ''
    }
  });

  // مراقبة الحقول لتحديث المعاينة والمنطق تلقائياً
  const watchedStudent = watch('student');
  const watchedTeacher = watch('teacher');
  const watchedMonthYear = watch('monthYear');
  const watchedDuration = watch('duration');

  const [weekDays, setWeekDays] = useState([
    { id: 'sunday', name: 'الأحد', checked: false, time: '10:00' },
    { id: 'monday', name: 'الاثنين', checked: false, time: '10:00' },
    { id: 'tuesday', name: 'الثلاثاء', checked: false, time: '10:00' },
    { id: 'wednesday', name: 'الأربعاء', checked: false, time: '10:00' },
    { id: 'thursday', name: 'الخميس', checked: false, time: '10:00' },
    { id: 'friday', name: 'الجمعة', checked: false, time: '10:00' },
    { id: 'saturday', name: 'السبت', checked: false, time: '10:00' }
  ]);

  // منطق المواد المتاحة للمعلم
  const teacherSubjects: Record<string, { id: string; name: string }[]> = {
    teacher1: [{ id: 'quran', name: 'القرآن الكريم' }, { id: 'tajweed', name: 'التجويد' }],
    teacher2: [{ id: 'arabic', name: 'اللغة العربية' }, { id: 'grammar', name: 'النحو والصرف' }]
  };

  const availableSubjects = useMemo(() =>
    watchedTeacher ? teacherSubjects[watchedTeacher]?.map(s => ({ value: s.id, label: s.name })) || [] : []
    , [watchedTeacher]);

  // منطق الباقات
  const studentPackages: Record<string, { name: string; sessionsRemaining: number; totalSessions: number }> = {
    student1: { name: 'باقة القرآن الكريم', sessionsRemaining: 8, totalSessions: 12 },
    student2: { name: 'باقة اللغة العربية', sessionsRemaining: 5, totalSessions: 10 }
  };

  const selectedStudentPackage = watchedStudent ? studentPackages[watchedStudent] : null;

  // توليد معاينة الحصص
  const sessionPreview = useMemo(() => {
    if (!watchedMonthYear) return [];
    const [year, month] = watchedMonthYear.split('-').map(Number);
    const selectedDays = weekDays.filter(day => day.checked);
    const sessions = [];
    const daysInMonth = new Date(year, month, 0).getDate();

    for (let date = 1; date <= daysInMonth; date++) {
      const currentDate = new Date(year, month - 1, date);
      const dayOfWeek = currentDate.getDay();
      const matchingDay = selectedDays.find(day =>
        ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].indexOf(day.id) === dayOfWeek
      );

      if (matchingDay) {
        sessions.push({
          date: currentDate.toLocaleDateString('ar-EG', { year: 'numeric', month: '2-digit', day: '2-digit' }),
          day: matchingDay.name,
          time: matchingDay.time
        });
      }
    }
    return sessions;
  }, [watchedMonthYear, weekDays]);

  const sessionsExceedPackage = selectedStudentPackage && sessionPreview.length > selectedStudentPackage.sessionsRemaining;

  const calculateEndTime = (startTime: string, duration: string) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + parseInt(duration);
    const endHours = Math.floor(totalMinutes / 60) % 24;
    const endMinutes = totalMinutes % 60;
    return `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
  };

  const onSubmit = (data: MultipleSessionsFormData) => {
    if (sessionPreview.length === 0) {
      alert(language === 'ar' ? 'برجاء اختيار يوم واحد على الأقل' : 'Please select at least one day');
      return;
    }
    if (sessionsExceedPackage) {
      alert('عدد الحصص أكبر من المتبقي في الباقة');
      return;
    }

    onAdd({ formData: data, sessions: sessionPreview });
    reset();
    setWeekDays(prev => prev.map(d => ({ ...d, checked: false })));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl max-h-[90vh]  overflow-y-auto no-scrollbar">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-900">إضافة حصص متعددة</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg"><X /></button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* اسم الحصة */}
          <div className="space-y-2 text-right">
            <label className="text-sm font-medium">اسم الحصة *</label>
            <input
              {...register('title')}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary text-right ${errors.title ? 'border-red-500' : 'border-gray-200'}`}
              placeholder="مثال: حصة القرآن الكريم"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Controller
              name="student"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  label="الطالب"
                  options={[{ value: 'student1', label: 'أحمد محمد' }, { value: 'student2', label: 'سارة علي' }]}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.student?.message}
                />
              )}
            />

            <Controller
              name="teacher"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  label="المعلم"
                  options={[{ value: 'teacher1', label: 'Ahmed Qandil' }, { value: 'teacher2', label: 'Ahmed Gamal' }]}
                  value={field.value}
                  onChange={(val) => {
                    field.onChange(val);
                    setValue('subject', '');
                  }}
                  error={errors.teacher?.message}
                />
              )}
            />
          </div>

          {/* معلومات الباقة */}
          {selectedStudentPackage && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-right">
              <p className="text-sm font-bold text-blue-900 mb-2">تفاصيل الباقة</p>
              <div className="flex justify-between text-xs text-blue-700">
                <span>إجمالي الحصص: {selectedStudentPackage.totalSessions}</span>
                <span>المتبقي: {selectedStudentPackage.sessionsRemaining}</span>
                <span>الباقة: {selectedStudentPackage.name}</span>
              </div>
            </div>
          )}

          <Controller
            name="subject"
            control={control}
            render={({ field }) => (
              <CustomSelect
                label="المادة"
                options={availableSubjects}
                value={field.value}
                onChange={field.onChange}
                disabled={!watchedTeacher}
                error={errors.subject?.message}
              />
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-right">
            <div>
              <label className="block text-sm font-medium mb-2">الشهر والسنة *</label>
              <input type="month" {...register('monthYear')} className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
              {errors.monthYear && <p className="text-red-500 text-xs mt-1">{errors.monthYear.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">مدة الحصة *</label>
              <Controller
                name="duration"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    {...field}
                    options={[
                      { value: '30', label: '30 دقيقة' },
                      { value: '60', label: '60 دقيقة' }
                    ]}
                  />
                )}
              />
            </div>

            <div className="text-right">
              <label className="block text-sm font-medium mb-2">رابط الحصة</label>
              <input type="url" {...register('meetingLink')} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-left" dir="ltr" />
              {errors.meetingLink && <p className="text-red-500 text-xs mt-1">{errors.meetingLink.message}</p>}
            </div>
          </div>

          {/* أيام الأسبوع */}
          <div className="space-y-3 text-right">
            <label className="text-sm font-medium">أيام الأسبوع *</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {weekDays.map((day) => (
                <div key={day.id} className={`border rounded-xl p-4 transition-all ${day.checked ? 'border-primary bg-blue-50' : 'border-gray-200'}`}>
                  <div className="flex items-center justify-between">
                    <input
                      type="time"
                      value={day.time}
                      onChange={(e) => setWeekDays(prev => prev.map(d => d.id === day.id ? { ...d, time: e.target.value } : d))}
                      disabled={!day.checked}
                      className="px-3 py-2 border rounded-lg"
                    />
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">{day.name}</span>
                      <input
                        type="checkbox"
                        checked={day.checked}
                        onChange={() => setWeekDays(prev => prev.map(d => d.id === day.id ? { ...d, checked: !d.checked } : d))}
                        className="w-5 h-5 accent-primary"
                      />
                    </div>
                  </div>
                  {day.checked && (
                    <p className="text-[10px] text-gray-500 mt-2">ينتهي في: {calculateEndTime(day.time, watchedDuration)}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* المعاينة */}
          {sessionPreview.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <h3 className="font-bold text-right">معاينة الجدول ({sessionPreview.length} حصة)</h3>
              <div className="max-h-40  overflow-y-auto no-scrollbar space-y-2 px-2">
                {sessionPreview.map((s, i) => (
                  <div key={i} className="flex justify-between bg-white p-2 rounded border text-sm">
                    <span dir="ltr">{s.time}</span>
                    <span>{s.date} - {s.day}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* أزرار التحكم */}
          <div className="flex gap-3 pt-4">
            <button type="submit" className="flex-1 py-3 bg-primary text-white rounded-xl font-bold hover:opacity-90">إضافة</button>
            <button type="button" onClick={onClose} className="flex-1 py-3 border border-gray-200 rounded-xl font-bold">إلغاء</button>
          </div>
        </form>
      </div>
    </div>
  );
}