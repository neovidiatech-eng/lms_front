import { useTranslation } from 'react-i18next';
import { useSettings } from '../../contexts/SettingsContext';
import { 
  User, Mail, Phone, Calendar, MapPin, 
  Package, Clock, CheckCircle, Award, 
  GraduationCap, MessageCircle, Video,
  Star, ShieldCheck, BookOpen, RefreshCw
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubscribePlanModal from '../../components/modals/SubscribePlanModal';

export default function StudentProfile() {
  const { t, i18n } = useTranslation();
  const { settings } = useSettings();
  const navigate = useNavigate();
  const isRtl = i18n.language.split('-')[0] === 'ar';
  
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

  // Mock Data for the Profile
  const studentInfo = {
    name: isRtl ? 'أحمد محمد عبد الله' : 'Ahmed Mohamed Abdullah',
    email: 'ahmed.student@example.com',
    phone: '+20 123 456 7890',
    birthDate: '2005-08-15',
    country: isRtl ? 'مصر' : 'Egypt',
    joinDate: '2023-11-01',
    progress: 75,
  };

  const subscriptionInfo = {
    planName: isRtl ? 'الباقة المميزة (Premium)' : 'Premium Plan',
    status: isRtl ? 'نشط' : 'Active',
    totalSessions: 30,
    sessionsUsed: 20,
    sessionsRemaining: 10,
    features: isRtl ? [
      'وصول غير محدود لجميع الكورسات',
      'حصص مباشرة مع المعلم',
      'مراجعة الواجبات والامتحانات',
      'دعم فني 24/7'
    ] : [
      'Unlimited access to all courses',
      'Live sessions with teacher',
      'Assignments and exams review',
      '24/7 Technical Support'
    ],
  };

  const teacherInfo = {
    name: isRtl ? 'أ. مصطفى كمال' : 'Mr. Mustafa Kamal',
    subject: isRtl ? 'الرياضيات - المرحلة الثانوية' : 'Mathematics - High School',
    experience: isRtl ? '10 سنوات خبرة' : '10 Years Experience',
    rating: 4.9,
    sessionsCompleted: 24,
    nextSession: '2024-04-12T10:00:00Z',
    status: isRtl ? 'متاح' : 'Available',
  };

  const progressPercentage = (subscriptionInfo.sessionsUsed / subscriptionInfo.totalSessions) * 100;

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">{t('sidebar_profile')}</h1>
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
                  {studentInfo.name.charAt(0)}
                </div>
              </div>
            </div>
            
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">{studentInfo.name}</h2>
              <p className="text-sm text-gray-500 mt-1">{t('studentLabel')}</p>
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
                ></div>
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

          {/* Teacher Details Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
             <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <GraduationCap className="w-6 h-6" style={{ color: settings.primaryColor }} />
                {isRtl ? 'المعلم الخاص بك' : 'Your Teacher'}
              </h2>
            </div>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-20 h-20 bg-gray-100 outline outline-4 outline-gray-50 rounded-full flex items-center justify-center text-gray-400 shrink-0">
                 <User className="w-10 h-10" />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-bold text-gray-900">{teacherInfo.name}</h3>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                    {teacherInfo.status}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-gray-400" />
                  {teacherInfo.subject}
                </p>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-medium text-gray-800">{teacherInfo.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-green-500" />
                    <span>{teacherInfo.experience}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto">
                <button 
                  onClick={() => navigate('/student-dashboard/chat')}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-white font-medium text-sm transition-all hover:opacity-90"
                  style={{ backgroundColor: settings.primaryColor }}
                >
                  <MessageCircle className="w-4 h-4" />
                  {isRtl ? 'مراسلة' : 'Message'}
                </button>
                <button 
                  onClick={() => navigate('/student-dashboard/content/agenda')}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  <Video className="w-4 h-4" />
                  {isRtl ? 'الحصة القادمة' : 'Next Session'}
                </button>
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
