import { ActivityFeedItem } from '../../../types/AdminDasboard';

interface RecentActivityProps {
  activities?: ActivityFeedItem[];
}

const formatRelativeTime = (isoString: string): string => {
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;
    const diffMs = Date.now() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const rtf = new Intl.RelativeTimeFormat('ar-EG', { numeric: 'auto' });
    if (diffSecs < 60) return rtf.format(-diffSecs, 'second');
    const diffMins = Math.floor(diffSecs / 60);
    if (diffMins < 60) return rtf.format(-diffMins, 'minute');
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return rtf.format(-diffHours, 'hour');
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) return rtf.format(-diffDays, 'day');
    return date.toLocaleDateString('ar-EG', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return isoString;
  }
};

const defaultActivities = [
  { id: '1', title: "تسجيل طالب جديد", user: "انضم \"أحمد محمد\" إلى دورة علوم الحاسوب", time: "منذ 4 دقائق", type: "student" },
  { id: '2', title: "تسليم اختبار", user: "أكملت \"سارة علي\" اختبار البرمجة بلغة Python", time: "منذ 15 دقيقة", type: "teacher" },
  { id: '3', title: "جلسة مباشرة جديدة", user: "بدأ الدكتور \"خالد\" جلسة مباشرة في الرياضيات", time: "منذ 40 دقيقة", type: "session" },
  { id: '4', title: "تسجيل طالب جديد", user: "انضم \"ياسين عمر\" إلى المنصة", time: "منذ ساعة", type: "student" },
];

const getActivityColor = (type: string) => {
  switch (type?.toLowerCase()) {
    case 'student':
    case 'student_register':
      return 'bg-blue-500';
    case 'teacher':
    case 'teacher_register':
      return 'bg-green-500';
    case 'session':
    case 'session_create':
    case 'class':
      return 'bg-orange-400';
    default:
      return 'bg-[#00a8a8]'; // Premium Teal color
  }
};

export default function RecentActivity({ activities }: RecentActivityProps) {
  const displayActivities = activities && activities.length > 0 ? activities : defaultActivities;

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
      <div className="flex justify-between items-center mb-8">
         <h2 className="text-lg font-bold text-gray-800 text-right">النشاط الأخير</h2>
      </div>

      <div className="relative space-y-6 before:absolute before:top-2 before:bottom-2 before:right-[3px] before:w-[2px] before:bg-gray-100">
        {displayActivities.map((activity) => (
          <div key={activity.id} className="relative flex items-start gap-4">
            <div className={`w-2 h-2 rounded-full ${getActivityColor(activity.type)} ring-4 ring-white z-10 shrink-0 mt-1.5`}></div>
            <div className="text-right flex-grow">
              <h4 className="text-sm font-bold text-gray-900">{activity.title}</h4>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{activity.user}</p>
              <span className="block text-[10px] text-gray-400 mt-1.5">{formatRelativeTime(activity.time)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
