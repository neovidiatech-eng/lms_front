import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const expenseDistributionData = [
  { name: "رواتب المعلمين", value: 55, color: "#3b82f6" },
  { name: "إيجار المقر", value: 20, color: "#22c55e" },
  { name: "تسويق وإعلانات", value: 13, color: "#8b5cf6" },
  { name: "مرافق وصيانة", value: 8, color: "#f59e0b" },
  { name: "أخرى", value: 5, color: "#ec4899" },
];

export default function ExpenseDistributionChart() {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex flex-col items-center h-full">
      <div className="w-full flex justify-between items-start mb-6">
        <div className="text-right">
          <h2 className="text-xl font-bold text-gray-800">توزيع المصروفات</h2>
          <p className="text-gray-400 text-sm">هذا الشهر</p>
        </div>
      </div>

      <div className="relative w-full h-[220px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={expenseDistributionData}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={85}
              paddingAngle={5}
              dataKey="value"
            >
              {expenseDistributionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-gray-400 text-xs font-medium">الإجمالي</span>
          <span className="text-2xl font-black text-gray-900">١٤٢.٢ك</span>
        </div>
      </div>

      <div className="w-full mt-6 space-y-2">
        {expenseDistributionData.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
             <div className="flex items-center gap-2 order-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
              <span className="text-gray-600 font-medium">{item.name}</span>
            </div>
            <span className="text-gray-400 font-bold order-1">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
