import { DollarSign, Notebook, Users } from 'lucide-react';
import DashboardCard from '../../../components/ui/Card';
import ExpenseDistributionChart from '../components/ExpenseDistributionChart';
import RevenueExpenseChart from '../components/RevenueExpenseChart';
import RecentActivity from '../components/RecentActivity';
import UserRequests from '../components/UserRequests';

export default function Dashboard() {
  // const { settings } = useSettings();




  const renderDashboardHome = () => (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-3 gap-6">
        <DashboardCard
          title="إجمالي الإيرادات"
          value="٢٨٤,٥٠٠"
          unit="ج.م"
          percentage="12.4"
          isIncrease={true}
          subText="مقارنة بالشهر السابق"
          icon={{
            bgColor: 'bg-[#eefcfc]',
            svg: <DollarSign size={20} className="text-[#00a8a8]" />
          }}
        />
        <DashboardCard
          title="الطلاب النشطون"
          value="14"
          unit="طالب"
          percentage="4.5"
          isIncrease={true}
          subText="مقارنة بالشهر السابق"
          icon={{
            bgColor: 'bg-[#eefcfc]',
            svg: <Users size={20} className="text-[#00a8a8]" />
          }}
        />

        <DashboardCard
          title="المعلمون النشطون"
          value="7"
          unit="معلم"
          percentage="15"
          isIncrease={true}
          subText="مقارنة بالشهر السابق"
          icon={{
            bgColor: 'bg-[#eefcfc]',
            svg: <Users size={20} className="text-[#00a8a8]" />
          }}
        />
         <DashboardCard
          title=" اجمالي الحصص"
          value="7"
          unit="حصة"
          percentage="15"
          isIncrease={true}
          subText="مقارنة بالشهر السابق"
          icon={{
            bgColor: 'bg-[#eefcfc]',
            svg: <Notebook size={20} className="text-[#00a8a8]" />
          }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-3">
        {/* Left Column: Expense Distribution */}
        <div className="lg:col-span-1 space-y-6">
          <ExpenseDistributionChart />
        </div>

        {/* Right Column: Revenue vs Expenses */}
        <div className="lg:col-span-2">
          <RevenueExpenseChart />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mx-3">
        {/* Recent Activity (Rightmost in RTL) */}
        <div className="h-full">
          <RecentActivity />
        </div>

        {/* User Requests (Leftmost in RTL) */}
        <div className="h-full">
          <UserRequests />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {renderDashboardHome()}
    </>
  );
}


