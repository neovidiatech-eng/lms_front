import { X, User, Mail, Phone, Lock, Users, Hash } from 'lucide-react'; // أضفت أيقونات جديدة
import { useLanguage } from '../../contexts/LanguageContext';
import { useForm, Controller, Resolver } from 'react-hook-form'; // أضفت Controller
import { ParentFormData, getParentSchema } from '../../lib/schemas/ParentSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomSelect from '../ui/CustomSelect';

interface AddParentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (parent: ParentFormData) => void;
}

export default function AddParentModal({ isOpen, onClose, onAdd }: AddParentModalProps) {
  const { language, t } = useLanguage();

  const { register, handleSubmit, control, formState: { errors } } = useForm<ParentFormData>({
    resolver: zodResolver(getParentSchema(t)) as Resolver<ParentFormData>,
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      username: '',
      password: '',
      numberOfChildren: 0,
      studentNames: []
    },
  });

  const handleOnSubmit = (data: ParentFormData) => {
    onAdd(data);
    onClose();
  };

  const text = {
    title: { ar: 'إضافة ولي أمر جديد', en: 'Add New Parent' },
    name: { ar: 'الاسم الكامل', en: 'Full Name' },
    email: { ar: 'البريد الإلكتروني', en: 'Email Address' },
    phone: { ar: 'رقم الهاتف', en: 'Phone Number' },
    userName: { ar: 'اسم المستخدم / واتساب', en: 'WhatsApp Number' },
    password: { ar: 'كلمة المرور', en: 'Password' },
    childrenCount: { ar: 'عدد الأطفال', en: 'Number of Children' }, // حقل جديد
    linkedStudents: { ar: 'الطلاب المرتبطين', en: 'Linked Students' },
    selectStudents: { ar: 'اختر الطلاب', en: 'Select Students' },
    cancel: { ar: 'إلغاء', en: 'Cancel' },
    save: { ar: 'حفظ', en: 'Save' }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh]  overflow-y-auto no-scrollbar">
        <div className="sticky top-0 bg-primary px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <h2 className="text-2xl font-bold text-gray-900">{text.title[language]}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleOnSubmit)} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* الاسم */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">{text.name[language]}</label>
              <div className="relative">
                <User className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="text" {...register('name')} className="w-full pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-right" />
                {errors.name && <p className="text-red-500 text-xs mt-1 text-right">{errors.name.message}</p>}
              </div>
            </div>

            {/* البريد الإلكتروني */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">{text.email[language]}</label>
              <div className="relative">
                <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="email" {...register('email')} className="w-full pr-12 py-3 border border-gray-200 rounded-xl text-right" />
                {errors.email && <p className="text-red-500 text-xs mt-1 text-right">{errors.email.message}</p>}
              </div>
            </div>

            {/* الهاتف */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">{text.phone[language]}</label>
              <div className="relative">
                <Phone className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="tel" {...register('phone')} className="w-full pr-12 py-3 border border-gray-200 rounded-xl text-right" />
                {errors.phone && <p className="text-red-500 text-xs mt-1 text-right">{errors.phone.message}</p>}
              </div>
            </div>

            {/* حقل عدد الأطفال (Input جديد) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">{text.childrenCount[language]}</label>
              <div className="relative">
                <Hash className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="number" {...register('numberOfChildren', { valueAsNumber: true })} className="w-full pr-12 py-3 border border-gray-200 rounded-xl text-right" />
                {errors.numberOfChildren && <p className="text-red-500 text-xs mt-1 text-right">{errors.numberOfChildren.message}</p>}
              </div>
            </div>

            {/* اسم المستخدم / واتساب */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">{text.userName[language]}</label>
              <div className="relative">
                <Phone className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="text" {...register('username')} className="w-full pr-12 py-3 border border-gray-200 rounded-xl text-right" />
                {errors.username && <p className="text-red-500 text-xs mt-1 text-right">{errors.username.message}</p>}
              </div>
            </div>

            {/* كلمة المرور */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">{text.password[language]}</label>
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="password" {...register('password')} className="w-full pr-12 py-3 border border-gray-200 rounded-xl text-right" />
                {errors.password && <p className="text-red-500 text-xs mt-1 text-right">{errors.password.message}</p>}
              </div>
            </div>

            {/* اختيار الطلاب (باستخدام Controller لضمان الـ Submit) */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">{text.linkedStudents[language]}</label>
              <div className="relative">
                <Users className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10 pointer-events-none" />
                <Controller
                  name="studentNames"
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      options={[
                        { value: "student1", label: "أحمد علي" },
                        { value: "student2", label: "منى يوسف" }
                      ]}
                      value={Array.isArray(field.value) ? field.value : []}
                      onChange={(val) => field.onChange(Array.isArray(val) ? val : [val])}
                      placeholder={text.selectStudents[language]}
                    />
                  )}
                />
                {errors.studentNames && <p className="text-red-500 text-xs mt-1 text-right">{errors.studentNames.message}</p>}
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <button type="button" onClick={onClose} className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">
              {text.cancel[language]}
            </button>
            <button type="submit" className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-lg">
              {text.save[language]}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}