import { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CourseFormData, courseSchema } from '../../lib/schemas/CourseSchema';
import { Course, Level } from '../../types/lmsCourses';
import CourseFormFields from '../../pages/LMSCourses/components/CourseFormFields';
import { useTranslation } from 'react-i18next';

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CourseFormData) => void;
  course?: Course | null;
  levels: Level[];
  subjectCategories: string[];
}

export default function CourseModal({
  isOpen,
  onClose,
  onSubmit,
  course,
  levels,
  subjectCategories,
}: CourseModalProps) {
  const { t } = useTranslation();
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const attachInputRef = useRef<HTMLInputElement>(null);

  const methods = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: '',
      description: '',
      category: subjectCategories.filter(c => c !== 'الكل' && c !== 'All')[0] || '',
      levelId: levels[0]?.id || 1,
      videoUrl: '',
      thumbnailFile: null,
      thumbnailPreview: '',
      attachments: [],
    },
  });

  const { reset, handleSubmit } = methods;

  useEffect(() => {
    if (isOpen) {
      if (course) {
        reset({
          title: course.title,
          description: course.description,
          category: course.category,
          levelId: course.levelId,
          videoUrl: course.videoUrl,
          thumbnailFile: null,
          thumbnailPreview: course.thumbnailUrl,
          attachments: [...course.attachments],
        });
      } else {
        reset({
          title: '',
          description: '',
          category: subjectCategories.filter(c => c !== 'الكل' && c !== 'all')[0] || '',
          levelId: levels[0]?.id || 1,
          videoUrl: '',
          thumbnailFile: null,
          thumbnailPreview: '',
          attachments: [],
        });
      }
    }
  }, [isOpen, course, reset, levels, subjectCategories]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 max-h-[90vh] overflow-y-auto no-scrollbar border border-gray-100"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
          <h2 className="text-2xl font-bold text-gray-900">
            {course ? t('edit_course') : t('add_new_course')}
          </h2>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <CourseFormFields
              levels={levels}
              subjectCategories={subjectCategories}
              thumbnailInputRef={thumbnailInputRef}
              attachInputRef={attachInputRef}
            />

            <div className="flex gap-4 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {t('cancel')}
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 btn-primary text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]"
              >
                {course ? t('save_changes') : t('add')}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
