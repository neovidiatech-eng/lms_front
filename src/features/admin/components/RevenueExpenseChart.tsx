import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { SessionPerDay } from "../../../types/AdminDasboard";

interface RevenueExpenseChartProps {
  sessionsData?: SessionPerDay[];
}

const defaultMonthlyData = [
  { month: "نوفمبر", revenue: 190, expenses: 130 },
  { month: "ديسمبر", revenue: 220, expenses: 140 },
  { month: "يناير", revenue: 250, expenses: 145 },
  { month: "فبراير", revenue: 280, expenses: 150 },
  { month: "مارس", revenue: 300, expenses: 155 },
  { month: "أبريل", revenue: 320, expenses: 148 },
];

export default function RevenueExpenseChart({ sessionsData }: RevenueExpenseChartProps) {
  const isSessions = sessionsData && sessionsData.length > 0;
  
  // Format dates if they are in ISO format for better localized Arabic display
  const chartData = isSessions
    ? sessionsData.map((d) => {
        let displayDate = d.date;
        try {
          const dateObj = new Date(d.date);
          if (!isNaN(dateObj.getTime())) {
            displayDate = dateObj.toLocaleDateString('ar-EG', { day: 'numeric', month: 'short' });
          }
        } catch (e) {
          // ignore
        }
        return {
          name: displayDate,
          count: d.count,
        };
      })
    : [];

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 h-full flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        {/* Custom Legend */}
        {isSessions ? (
          <div className="flex items-center gap-4 order-1">
            <div className="flex items-center gap-1.5">
               <div className="w-2.5 h-2.5 rounded-full bg-[#00a8a8]"></div>
               <span className="text-gray-500 text-xs font-medium">عدد الحصص</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4 order-1">
            <div className="flex items-center gap-1.5">
               <div className="w-2 h-2 rounded-full bg-[#3b82f6]"></div>
               <span className="text-gray-500 text-xs font-medium">الإيرادات</span>
            </div>
            <div className="flex items-center gap-1.5">
               <div className="w-2 h-2 rounded-full bg-[#f59e0b]"></div>
               <span className="text-gray-500 text-xs font-medium">المصروفات</span>
            </div>
          </div>
        )}

        <div className="text-right order-2">
          <h2 className="text-xl font-bold text-gray-800">
            {isSessions ? "نشاط الحصص اليومي" : "الإيرادات مقابل المصروفات"}
          </h2>
          <p className="text-gray-400 text-sm">
            {isSessions ? "أحدث الأيام النشطة بالمنصة" : "آخر 6 شهور"}
          </p>
        </div>
      </div>

      <div className="w-full h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          {isSessions ? (
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9ca3af', fontSize: 11 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9ca3af', fontSize: 11 }}
                allowDecimals={false}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#00a8a8"
                strokeWidth={3}
                fill="url(#colorSessions)"
                name="عدد الحصص"
                animationDuration={1500}
              />
              <defs>
                <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00a8a8" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#00a8a8" stopOpacity={0}/>
                </linearGradient>
              </defs>
            </AreaChart>
          ) : (
            <AreaChart data={defaultMonthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                tickFormatter={(value) => `${value}ك`}
                ticks={[0, 75, 150, 225, 300]}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={4}
                fill="url(#colorRevenue)"
                name="إيرادات"
                animationDuration={1500}
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stroke="#f59e0b"
                strokeWidth={4}
                fill="url(#colorExpenses)"
                name="مصروفات"
                animationDuration={1500}
              />
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
              </defs>
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
