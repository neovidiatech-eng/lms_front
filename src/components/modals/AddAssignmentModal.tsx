import { useEffect } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import CustomSelect from '../ui/CustomSelect';
import DatePickerField from '../ui/DatePickerField';
import { AssignmentFormData, getAssignmentSchema } from '../../lib/schemas/AssignmentSchema';
import { Resolver, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface Assignment extends AssignmentFormData {
  id: string;
}

interface AddAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (assignment: Assignment) => void;
  initialData?: Assignment | null;
}

export default function AddAssignmentModal({ isOpen, onClose, onAdd, initialData }: AddAssignmentModalProps) {
  const { language, t } = useLanguage();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AssignmentFormData>({
    resolver: zodResolver(getAssignmentSchema(t)) as Resolver<AssignmentFormData>,
    defaultValues: {
      status: 'pending',
    },
  });

  const text = {
    title: { ar: 'إضافة واجب جديد', en: 'Add New Assignment' },
    student: { ar: 'الطالب', en: 'Student' },
    teacher: { ar: 'المعلم', en: 'Teacher' },
    subject: { ar: 'المادة', en: 'Subject' },
    assignmentTitle: { ar: 'العنوان', en: 'Title' },
    description: { ar: 'الوصف', en: 'Description' },
    dueDate: { ar: 'تاريخ التسليم', en: 'Due Date' },
    status: { ar: 'الحالة', en: 'Status' },
    pending: { ar: 'قيد الانتظار', en: 'Pending' },
    submitted: { ar: 'تم التسليم', en: 'Submitted' },
    graded: { ar: 'تم التصحيح', en: 'Graded' },
    cancel: { ar: 'إلغاء', en: 'Cancel' },
    add: { ar: 'إضافة', en: 'Add' }
  };

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset(initialData);
      } else {
        reset({
          studentName: '',
          teacher: '',
          subject: '',
          title: '',
          description: '',
          dueDate: '',
          status: 'pending',
        });
      }
    }
  }, [initialData, reset, isOpen]);

  const handleOnSubmit = (data: AssignmentFormData) => {
    onAdd({
      id: Date.now().toString(),
      ...data
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh]  overflow-y-auto no-scrollbar">
        <div className="sticky top-0 bg-primary border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-white">{text.title[language]}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleOnSubmit)} className="p-6 space-y-4" dir="rtl">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              {text.student[language]}
            </label>
            <input
              type="text"
              {...register('studentName')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-right"
              dir="rtl"
            />
            {errors.studentName && <p className="text-red-500 text-xs mt-1">{errors.studentName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              {text.teacher[language]}
            </label>
            <input
              type="text"
              {...register('teacher')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-right"
              dir="rtl"
            />
            {errors.teacher && <p className="text-red-500 text-xs mt-1">{errors.teacher.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              {text.subject[language]}
            </label>
            <input
              type="text"
              {...register('subject')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-right"
              dir="rtl"
            />
            {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              {text.assignmentTitle[language]}
            </label>
            <input
              type="text"
              {...register('title')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-right"
              dir="rtl"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              {text.description[language]}
            </label>
            <textarea
              rows={3}
              {...register('description')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-right resize-none"
              dir="rtl"
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <DatePickerField
                label={text.dueDate[language]}
                value={watch('dueDate')}
                onChange={(val) => setValue('dueDate', val, { shouldValidate: true })}
                error={errors.dueDate?.message}
              />
            </div>
            <CustomSelect
              label={text.status[language]}
              value={watch('status')}
              onChange={(val) => setValue('status', val as 'pending' | 'submitted' | 'graded', { shouldValidate: true })}
              options={[
                { value: 'pending', label: text.pending[language] },
                { value: 'submitted', label: text.submitted[language] },
                { value: 'graded', label: text.graded[language] }
              ]}
            />

          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              {text.cancel[language]}
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 btn-primary text-white rounded-xl transition-colors font-medium"
            >
              {text.add[language]}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
