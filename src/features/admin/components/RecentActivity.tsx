const recentActivitiesList = [
  { id: 1, title: "تسجيل طالب جديد", desc: "انضم \"أحمد محمد\" إلى دورة علوم الحاسوب", time: "منذ 4 دقائق", color: "bg-blue-500" },
  { id: 2, title: "تسليم اختبار", desc: "أكملت \"سارة علي\" اختبار البرمجة بلغة Python", time: "منذ 15 دقيقة", color: "bg-green-500" },
  { id: 3, title: "جلسة مباشرة جديدة", desc: "بدأ الدكتور \"خالد\" جلسة مباشرة في الرياضيات", time: "منذ 40 دقيقة", color: "bg-orange-400" },
  { id: 4, title: "تسجيل طالب جديد", desc: "انضم \"ياسين عمر\" إلى المنصة", time: "منذ ساعة", color: "bg-blue-500" },
];

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
      <div className="flex justify-between items-center mb-8">
         <h2 className="text-lg font-bold text-gray-800 text-right">النشاط الأخير</h2>
      </div>

      <div className="relative space-y-6 before:absolute before:top-2 before:bottom-2 before:right-[3px] before:w-[2px] before:bg-gray-100">
        {recentActivitiesList.map((activity) => (
          <div key={activity.id} className="relative flex items-start gap-4">
            <div className={`w-2 h-2 rounded-full ${activity.color} ring-4 ring-white z-10 shrink-0 mt-1.5`}></div>
            <div className="text-right flex-grow">
              <h4 className="text-sm font-bold text-gray-900">{activity.title}</h4>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{activity.desc}</p>
              <span className="block text-[10px] text-gray-400 mt-1.5">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
