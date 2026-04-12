// import { X } from 'lucide-react';
// import { useTranslation } from 'react-i18next';
// import { useForm, Controller } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { getRoleSchema, RoleFormData } from '../../lib/schemas/RoleSchema';
// import CustomCheckbox from '../ui/CustomCheckbox';

// interface AddRoleModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (data: RoleFormData) => void;
// }

// const ALL_PERMISSIONS = [
//   { id: 'dashboard_view', label: 'Dashboard View' },
//   { id: 'students_manage', label: 'Manage Students' },
//   { id: 'teachers_manage', label: 'Manage Teachers' },
//   { id: 'sessions_manage', label: 'Manage Sessions' },
//   { id: 'plans_manage', label: 'Manage Plans' },
//   { id: 'subscriptions_manage', label: 'Manage Subscriptions' },
//   { id: 'exams_manage', label: 'Manage Exams' },
//   { id: 'homework_manage', label: 'Manage Homework' },
//   { id: 'settings_manage', label: 'Manage Settings' },
//   { id: 'users_manage', label: 'Manage Users' },
//   { id: 'finance_manage', label: 'Manage Finance' },
//   { id: 'requests_manage', label: 'Manage Requests' },
// ];

// export default function AddRoleModal({ isOpen, onClose, onSubmit }: AddRoleModalProps) {
//   const { t, i18n } = useTranslation();
//   const isRtl = i18n.language === 'ar';

//   const {
//     register,
//     handleSubmit,
//     control,
//     reset,
//     formState: { errors, isSubmitting },
//   } = useForm<RoleFormData>({
//     resolver: zodResolver(getRoleSchema(t)),
//     defaultValues: {
//       name: '',
//       description: '',
//       permissions: [],
//       status: 'active',
//     },
//   });

//   const handleClose = () => {
//     reset();
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
//       <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-300">
//         {/* Header */}
//         <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-primary relative overflow-hidden">
//           <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/20 to-transparent pointer-events-none" />
//           <h2 className="text-xl font-bold text-white relative z-10">
//             {t('addNewRole')}
//           </h2>
//           <button
//             onClick={handleClose}
//             className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white relative z-10"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         {/* Form Content */}
//         <form onSubmit={handleSubmit(onSubmit)} className="overflow-y-auto p-6 space-y-8">
//           <div className="grid grid-cols-1 gap-6">
//             {/* Role Name */}
//             <div className="space-y-2">
//               <label className="block text-sm font-semibold text-gray-700">
//                 {t('roleName')}
//               </label>
//               <input
//                 {...register('name')}
//                 className={`w-full px-4 py-3 rounded-xl border ${
//                   errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-primary'
//                 } focus:outline-none focus:ring-2 bg-gray-50/50 transition-all text-right`}
//                 placeholder={t('roleName')}
//               />
//               {errors.name && (
//                 <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
//               )}
//             </div>

//             {/* Description */}
//             <div className="space-y-2">
//               <label className="block text-sm font-semibold text-gray-700">
//                 {t('description')}
//               </label>
//               <textarea
//                 {...register('description')}
//                 rows={3}
//                 className={`w-full px-4 py-3 rounded-xl border ${
//                   errors.description ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-primary'
//                 } focus:outline-none focus:ring-2 bg-gray-50/50 transition-all text-right resize-none`}
//                 placeholder={t('description')}
//               />
//               {errors.description && (
//                 <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>
//               )}
//             </div>
//           </div>

//           {/* Permissions Section */}
//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <h3 className="text-lg font-bold text-gray-900">{t('permissions')}</h3>
//               <span className="text-xs text-gray-500">{t('selectPermissionsHint')}</span>
//             </div>
            
//             <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
//               <Controller
//                 name="permissions"
//                 control={control}
//                 render={({ field }) => (
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {ALL_PERMISSIONS.map((perm) => (
//                       <div key={perm.id} className="flex items-center gap-3">
//                         <CustomCheckbox
//                           id={perm.id}
//                           checked={field.value.includes(perm.id)}
//                           onChange={(checked) => {
//                             if (checked) {
//                               field.onChange([...field.value, perm.id]);
//                             } else {
//                               field.onChange(field.value.filter((id) => id !== perm.id));
//                             }
//                           }}
//                         />
//                          <label
//                           htmlFor={perm.id}
//                           className="text-sm font-medium text-gray-700 cursor-pointer select-none"
//                         >
//                           {perm.label}
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               />
//               {errors.permissions && (
//                 <p className="text-xs text-red-500 mt-4 text-center">{errors.permissions.message}</p>
//               )}
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="flex items-center gap-4 pt-4">
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="flex-1 btn-primary text-white py-4 rounded-xl font-bold transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100 shadow-lg shadow-primary/20"
//             >
//               {isSubmitting ? t('saving') : t('add')}
//             </button>
//             <button
//               type="button"
//               onClick={handleClose}
//               className="px-8 py-4 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
//             >
//               {t('cancel')}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
