import { X } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import CustomSelect from '../ui/CustomSelect';
import DatePickerField from '../ui/DatePickerField';
import { SessionFormData, getSessionSchema } from '../../lib/schemas/SessionSchema';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface AddSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (session: SessionFormData) => void;
}

interface SubjectOption {
  id: string;
  name: string;
}

export default function AddSessionModal({ isOpen, onClose, onAdd }: AddSessionModalProps) {
  const { language, t } = useLanguage();

  const { register, handleSubmit, control, watch, setValue, reset, formState: { errors } } = useForm<SessionFormData>({
    resolver: zodResolver(getSessionSchema(t)),
    defaultValues: {
      student: '', teacher: '', subject: '', title: '',
      sessionDate: '', duration: '', startTime: '', endTime: '',
      meetingLink: '', notes: ''
    }
  });

  const selectedTeacher = watch('teacher');
  const selectedStudent = watch('student');
  const selectedDurationId = watch('duration');
  const startTimeVal = watch('startTime');

  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen, reset]);

  const teacherSubjects: Record<string, SubjectOption[]> = {
    teacher1: [{ id: 'quran', name: 'القرآن الكريم' }, { id: 'tajweed', name: 'التجويد' }],
    teacher2: [{ id: 'arabic', name: 'اللغة العربية' }, { id: 'grammar', name: 'النحو والصرف' }]
  };

  const studentPackages: Record<string, { name: string; sessionsRemaining: number; totalSessions: number }> = {
    student1: { name: 'باقة القرآن الكريم', sessionsRemaining: 8, totalSessions: 12 },
    student2: { name: 'باقة اللغة العربية', sessionsRemaining: 5, totalSessions: 10 }
  };

  const durationPackages: Record<string, { name: string; duration: number }> = {
    '1': { name: '30 دقيقة', duration: 30 },
    '2': { name: '45 دقيقة', duration: 45 },
    '3': { name: '60 دقيقة', duration: 60 },
  };

  useEffect(() => {
    if (selectedDurationId && startTimeVal) {
      const durationMins = durationPackages[selectedDurationId]?.duration || 0;
      if (durationMins > 0) {
        const [hours, minutes] = startTimeVal.split(':').map(Number);
        if (!isNaN(hours) && !isNaN(minutes)) {
          const date = new Date();
          date.setHours(hours, minutes + durationMins, 0, 0);
          const endH = String(date.getHours()).padStart(2, '0');
          const endM = String(date.getMinutes()).padStart(2, '0');
          setValue('endTime', `${endH}:${endM}`, { shouldValidate: true });
        }
      }
    }
  }, [selectedDurationId, startTimeVal, setValue]);

  const availableSubjects = useMemo(() => {
    return selectedTeacher ? (teacherSubjects[selectedTeacher] || []).map((s) => ({
      value: s.id,
      label: s.name
    })) : [];
  }, [selectedTeacher]);

  const selectedStudentPackage = selectedStudent ? studentPackages[selectedStudent] : null;

  const text = {
    title: { ar: 'إضافة حصة واحدة', en: 'Add Single Session' },
    student: { ar: 'الطالب', en: 'Student' },
    selectStudent: { ar: 'اختر الطالب', en: 'Select Student' },
    teacher: { ar: 'المعلم', en: 'Teacher' },
    selectTeacher: { ar: 'اختر المعلم', en: 'Select Teacher' },
    teacherQuestion: { ar: 'اختر المعلم أولاً', en: 'Select Teacher First' },
    subject: { ar: 'المادة', en: 'Subject' },
    selectSubject: { ar: 'اختر المادة', en: 'Select Subject' },
    sessionTitle: { ar: 'العنوان', en: 'Title' },
    sessionTitlePlaceholder: { ar: 'عنوان الحصة', en: 'Session Title' },
    sessionDate: { ar: 'تاريخ الحصة', en: 'Session Date' },
    description: { ar: 'الوصف', en: 'Description' },
    descriptionPlaceholder: { ar: 'وصف الحصة', en: 'Session Description' },
    duration: { ar: 'مدة الحصة *', en: 'Session Duration *' },
    selectDuration: { ar: 'اختر المدة', en: 'Select Duration' },
    startTime: { ar: 'وقت البداية', en: 'Start Time' },
    endTime: { ar: 'وقت النهاية', en: 'End Time' },
    meetingLink: { ar: 'رابط الاجتماع', en: 'Meeting Link' },
    meetingLinkPlaceholder: { ar: 'https://zoom.us/...', en: 'https://zoom.us/...' },
    notes: { ar: 'ملاحظات', en: 'Notes' },
    notesPlaceholder: { ar: 'ملاحظات إضافية', en: 'Additional Notes' },
    cancel: { ar: 'إلغاء', en: 'Cancel' },
    add: { ar: 'إضافة', en: 'Add' },
    required: { ar: '*', en: '*' },
    packageInfo: { ar: 'تفاصيل الباقة', en: 'Package Details' },
    packageName: { ar: 'الباقة', en: 'Package' },
    sessionsRemaining: { ar: 'الحصص المتبقية', en: 'Sessions Remaining' },
    totalSessions: { ar: 'إجمالي الحصص', en: 'Total Sessions' }
  };

  const onFormSubmit = (data: SessionFormData) => {
    onAdd(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh]  overflow-y-auto no-scrollbar">
        <div className="sticky top-0 bg-primary border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-white">{text.title[language]}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="p-6">
          <div className="space-y-6">
            {/* الطالب والمعلم */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Controller
                  name="student"
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      label={text.student[language]}
                      value={field.value}
                      options={[
                        { value: 'student1', label: language === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed' },
                        { value: 'student2', label: language === 'ar' ? 'سارة علي' : 'Sara Ali' },
                      ]}
                      onChange={field.onChange}
                      placeholder={text.selectStudent[language]}
                      className="h-[46px]"
                    />
                  )}
                />
                {errors.student && <span className="text-red-500 text-xs mt-1 block text-right">{errors.student.message}</span>}
              </div>

              <div>
                <Controller
                  name="teacher"
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      label={text.teacher[language]}
                      value={field.value}
                      options={[
                        { value: 'teacher1', label: 'Ahmed Qandil' },
                        { value: 'teacher2', label: 'Ahmed Gamal' },
                      ]}
                      onChange={(val) => {
                        field.onChange(val);
                        setValue('subject', ''); // إعادة تعيين المادة عند تغيير المعلم
                      }}
                      placeholder={text.selectTeacher[language]}
                      className="h-[46px]"
                    />
                  )}
                />
                {errors.teacher && <span className="text-red-500 text-xs mt-1 block text-right">{errors.teacher.message}</span>}
              </div>
            </div>

            {/* تفاصيل الباقة */}
            {selectedStudentPackage && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-blue-900 mb-3 text-right">{text.packageInfo[language]}</h3>
                <div className="grid grid-cols-3 gap-4 text-right">
                  <div>
                    <p className="text-xs text-blue-600 mb-1">{text.packageName[language]}</p>
                    <p className="text-sm font-medium text-blue-900">{selectedStudentPackage.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-600 mb-1">{text.sessionsRemaining[language]}</p>
                    <p className="text-sm font-medium text-blue-900">{selectedStudentPackage.sessionsRemaining}</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-600 mb-1">{text.totalSessions[language]}</p>
                    <p className="text-sm font-medium text-blue-900">{selectedStudentPackage.totalSessions}</p>
                  </div>
                </div>
              </div>
            )}

            {/* المادة */}
            <div className="space-y-2">
              <Controller
                name="subject"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    label={text.subject[language]}
                    value={field.value}
                    options={availableSubjects}
                    onChange={field.onChange}
                    placeholder={selectedTeacher ? text.selectSubject[language] : text.teacherQuestion[language]}
                    className="h-[46px]"
                    disabled={!selectedTeacher}
                  />
                )}
              />
              {errors.subject && <span className="text-red-500 text-xs block text-right">{errors.subject.message}</span>}
            </div>

            {/* التاريخ والعنوان */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 text-right">
                <DatePickerField
                  label={`${text.sessionDate[language]} `}
                  value={watch('sessionDate')}
                  onChange={(val) => setValue('sessionDate', val, { shouldValidate: true })}
                  error={errors.sessionDate?.message}
                />
              </div>

              <div className="space-y-2 text-right">
                <label className="block text-sm font-medium text-gray-700">
                  {text.sessionTitle[language]} <span className="text-red-500">{text.required[language]}</span>
                </label>
                <input
                  type="text"
                  {...register('title')}
                  placeholder={text.sessionTitlePlaceholder[language]}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-right"
                />
                {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
              </div>
            </div>

            {/* المدة والوقت */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Controller
                  name="duration"
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      label={text.duration[language]}
                      value={field.value}
                      options={Object.entries(durationPackages).map(([id, pkg]) => ({
                        value: id,
                        label: pkg.name
                      }))}
                      onChange={field.onChange}
                      placeholder={text.selectDuration[language]}
                      className="h-[46px]"
                    />
                  )}
                />
                {errors.duration && <span className="text-red-500 text-xs block text-right">{errors.duration.message}</span>}
              </div>

              <div className="space-y-2 text-right">
                <label className="block text-sm font-medium text-gray-700">
                  {text.startTime[language]} <span className="text-red-500">{text.required[language]}</span>
                </label>
                <input
                  type="time"
                  {...register('startTime')}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-right"
                />
                {errors.startTime && <span className="text-red-500 text-xs">{errors.startTime.message}</span>}
              </div>

              <div className="space-y-2 text-right">
                <label className="block text-sm font-medium text-gray-700">
                  {text.endTime[language]} <span className="text-red-500">{text.required[language]}</span>
                </label>
                <input
                  type="time"
                  disabled
                  {...register('endTime')}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-right"
                />
                {errors.endTime && <span className="text-red-500 text-xs">{errors.endTime.message}</span>}
              </div>
            </div>

            {/* الرابط والملاحظات */}
            <div className="space-y-4">
              <div className="space-y-2 text-right">
                <label className="block text-sm font-medium text-gray-700">{text.meetingLink[language]}</label>
                <input
                  type="url"
                  {...register('meetingLink')}
                  placeholder={text.meetingLinkPlaceholder[language]}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-right"
                  dir="ltr"
                />
              </div>
              <div className="space-y-2 text-right">
                <label className="block text-sm font-medium text-gray-700">{text.notes[language]}</label>
                <textarea
                  {...register('notes')}
                  placeholder={text.notesPlaceholder[language]}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-right resize-none"
                />
              </div>
            </div>
          </div>

          {/* الأزرار */}
          <div className="flex gap-3 mt-8">
            <button type="submit" className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl transition-colors font-medium hover:bg-blue-700">
              {text.add[language]}
            </button>
            <button type="button" onClick={onClose} className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">
              {text.cancel[language]}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}