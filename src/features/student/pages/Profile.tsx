import { useTranslation } from 'react-i18next';
import { useSettings } from '../../../contexts/SettingsContext';
import {
  Mail, Phone, Calendar, MapPin,
  Package, Clock, CheckCircle, Award, RefreshCw,
  GraduationCap,
  User,
  BookOpen,
  ShieldCheck,
  Star
} from 'lucide-react';
import { useMemo, useState } from 'react';
import SubscribePlanModal from '../../../components/modals/SubscribePlanModal';
import { useProfile } from '../hooks/useProfile';
import { useTeacherById } from '../../admin/hooks/useTeacher';

export default function StudentProfile() {
  const { i18n, t } = useTranslation();
  const { settings } = useSettings();
  const isRtl = i18n.language.split('-')[0] === 'ar';

  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

  const { data: profileResponse, isLoading, error } = useProfile();
  const progressPercentage = useMemo(() => {
    if (!profileResponse?.data?.sessions) return 0;

    return (profileResponse.data.sessions_attended / profileResponse.data.sessions) * 100;
  }, [profileResponse]);


  const profileData = profileResponse?.data;
  const user = profileData?.user;
  const plan = profileData?.plan;

  const studentInfo = {
    name: user?.name,
    email: user?.email,
    phone: `${user?.code_country} ${user?.phone}`,
    birthDate: profileData?.birth_date ? profileData?.birth_date.split('T')[0] : '-',
    country: profileData?.country,
    progress: (Number(profileData?.sessions_attended)  / Number(profileData?.sessions)) * 100,
  };

  const subscriptionInfo = {
    planName: plan ? (isRtl ? plan.name_ar : plan.name_en) : (isRtl ? 'لا توجد باقة' : 'No Plan'),
    status: isRtl ? (profileData?.status === 'approved' ? 'نشط' : 'قيد الانتظار') : (profileData?.status === 'approved' ? 'Active' : 'Pending'),
    totalSessions: profileData?.sessions,
    sessionsUsed: profileData?.sessions_attended,
    sessionsRemaining: profileData?.sessions_remaining,
    features: plan?.features || [],
  };
  const uniqueTeacher = profileData?.schedules?.[0]?.teacher;

  const teacherInfo = {
    name: uniqueTeacher?.user?.name,
    hour_price: uniqueTeacher?.hour_price,
    status: profileData?.schedules?.[0]?.status,
    subject: isRtl ? profileData?.schedules?.[0]?.subject?.name_ar : profileData?.schedules?.[0]?.subject?.name_en,
  };
  const { data: teacherData } = useTeacherById(uniqueTeacher?.id);

  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" style={{ borderTopColor: settings.primaryColor }}></div>
      </div>
    );
  }

  if (error || !profileResponse?.data) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
        <div className="text-gray-400 mb-4">
          <User className="w-12 h-12 mx-auto opacity-20" />
        </div>
        <p className="text-gray-500">{t('errors.failedToLoadProfile') || 'Failed to load profile'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">{isRtl ? 'الملف الشخصي' : 'Profile'}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Student Personal Info Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden lg:col-span-1">
          <div
            className="h-24 bg-gradient-to-r"
            style={{ backgroundImage: `linear-gradient(to right, ${settings.primaryColor}, ${settings.accentColor})` }}
          />
          <div className="px-6 pb-6 relative">
            <div className="flex justify-center -mt-12 mb-4">
              <div className="w-24 h-24 bg-white rounded-full p-2 shadow-md">
                <div
                  className="w-full h-full rounded-full flex items-center justify-center text-white text-3xl font-bold"
                  style={{ backgroundColor: settings.primaryColor }}
                >
                  {studentInfo?.name?.charAt(0)}
                </div>
              </div>
            </div>

            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">{studentInfo.name}</h2>
              <p className="text-sm text-gray-500 mt-1">{isRtl ? 'طالب' : 'Student'}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-700">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-sm truncate">{studentInfo.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-sm">{studentInfo.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className="text-sm" dir="ltr">{studentInfo.birthDate}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span className="text-sm">{studentInfo.country}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">

          {/* Subscription Details Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Award className="w-6 h-6" style={{ color: settings.primaryColor }} />
                  {isRtl ? 'تفاصيل الاشتراك' : 'Subscription Details'}
                </h2>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  {subscriptionInfo.status}
                </span>
              </div>
              <button
                onClick={() => setIsPlanModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-white font-medium text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: settings.primaryColor }}
              >
                <RefreshCw className="w-4 h-4" />
                {isRtl ? 'اشتراك بخطة' : 'Subscribe to Plan'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-sm text-gray-500 mb-1">{isRtl ? 'الباقة الحالية' : 'Current Plan'}</p>
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5" style={{ color: settings.primaryColor }} />
                  <span className="font-bold text-gray-900">{subscriptionInfo.planName}</span>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-sm text-gray-500 mb-1">{isRtl ? 'الحصص المتبقية' : 'Sessions Remaining'}</p>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" style={{ color: settings.primaryColor }} />
                  <span className="font-bold text-gray-900">{subscriptionInfo.sessionsRemaining} {isRtl ? 'حصة' : 'Sessions'}</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">{isRtl ? 'استهلاك الباقة' : 'Plan Usage'}</span>
                <span className="text-sm font-semibold">{Math.round(progressPercentage)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.round(progressPercentage)}%`,
                    backgroundColor: settings.primaryColor
                  }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {isRtl
                  ? `تم استهلاك ${subscriptionInfo.sessionsUsed} حصة من أصل ${subscriptionInfo.totalSessions}`
                  : `${subscriptionInfo.sessionsUsed} sessions used out of ${subscriptionInfo.totalSessions}`}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">{isRtl ? 'مميزات الباقة:' : 'Plan Features:'}</h3>
              <ul className="space-y-2">
                {subscriptionInfo.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Teacher Info Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <GraduationCap className="w-6 h-6" style={{ color: settings.primaryColor }} />
                {isRtl ? 'المعلم الخاص بك' : 'Your Teacher'}
              </h2>
              <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-bold text-yellow-700">{teacherInfo.status}</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 shrink-0 overflow-hidden border-2 border-dashed border-gray-200">
                  <User className="w-12 h-12" />
                </div>
                <div className="absolute -bottom-2 -left-2 px-2 py-0.5 bg-green-500 text-white text-[10px] font-bold rounded-lg border-2 border-white uppercase flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  {teacherData?.user.name}
                </div>
              </div>

              <div className="flex-1 text-center md:text-right">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
                  <div className="text-right">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {teacherData?.user?.name || (isRtl ? 'جاري التحميل...' : 'Loading...')}
                    </h3>

                    <p className="text-gray-600 text-sm flex items-center gap-2">
                      <BookOpen className="w-4 h-4" style={{ color: settings.primaryColor }} />
                      {teacherInfo.subject}
                    </p>
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-3 text-right">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                      <ShieldCheck className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">{isRtl ? 'معلم معتمد' : 'Verified Teacher'}</p>
                      <p className="text-xs font-semibold text-gray-700">{isRtl ? 'هوية محققة' : 'Identity Verified'}</p>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 flex items-center gap-3 text-right">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                      <Calendar className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-[10px] text-blue-500 uppercase font-bold tracking-wider">{isRtl ? 'الجلسة القادمة' : 'Next Session'}</p>
                      <p className="text-xs font-semibold text-gray-700 leading-tight">
                        {new Date(profileData?.schedules?.[0].start_time).toLocaleDateString(isRtl ? 'ar-EG' : 'en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SubscribePlanModal
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
      />
    </div>
  );
}
