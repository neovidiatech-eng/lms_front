import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const monthlyData = [
  { month: "نوفمبر", revenue: 190, expenses: 130 },
  { month: "ديسمبر", revenue: 220, expenses: 140 },
  { month: "يناير", revenue: 250, expenses: 145 },
  { month: "فبراير", revenue: 280, expenses: 150 },
  { month: "مارس", revenue: 300, expenses: 155 },
  { month: "أبريل", revenue: 320, expenses: 148 },
];

export default function RevenueExpenseChart() {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 h-full">
      <div className="flex justify-between items-start mb-4">
         {/* Custom Legend at Top Left */}
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

        <div className="text-right order-2">
          <h2 className="text-xl font-bold text-gray-800">الإيرادات مقابل المصروفات</h2>
          <p className="text-gray-400 text-sm">آخر 6 شهور</p>
        </div>
      </div>

      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
        </ResponsiveContainer>
      </div>
    </div>
  );
}
