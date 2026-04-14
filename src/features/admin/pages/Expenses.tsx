import { useEffect, useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  DollarSign,
  Search,
  Filter,
} from "lucide-react";
import { useLanguage } from "../../../contexts/LanguageContext";
import AddExpenseModal from "../../../components/modals/AddExpenseModal";
import ViewExpenseModal from "../../../components/modals/ViewExpenseModal";
import { Expense } from "../../../lib/schemas/ExpenseSchema";
import { ExpenseService } from "../services/ExpenseService";

export default function Expenses() {
  const { language } = useLanguage();
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const text = {
    title: { ar: "إدارة المصروفات", en: "Expenses Management" },
    addExpense: { ar: "إضافة مصروف جديد", en: "Add New Expense" },
    search: { ar: "البحث في المصروفات...", en: "Search expenses..." },
    totalExpenses: { ar: "إجمالي المصروفات", en: "Total Expenses" },
    totalCount: { ar: "مصروف", en: "expenses" },
    description: { ar: "الوصف", en: "Description" },
    amount: { ar: "المبلغ", en: "Amount" },
    currency: { ar: "العملة", en: "Currency" },
    category: { ar: "الفئة", en: "Category" },
    date: { ar: "التاريخ", en: "Date" },
    paymentMethod: { ar: "طريقة الدفع", en: "Payment Method" },
    status: { ar: "الحالة", en: "Status" },
    actions: { ar: "الإجراءات", en: "Actions" },
    edit: { ar: "تعديل", en: "Edit" },
    delete: { ar: "حذف", en: "Delete" },
    view: { ar: "عرض", en: "View" },
    paid: { ar: "مقبول", en: "Paid" },
    pending: { ar: "معلق", en: "Pending" },
    noExpenses: { ar: "لا توجد مصروفات", en: "No expenses found" },
    confirmDelete: {
      ar: "هل أنت متأكد من حذف هذا المصروف؟",
      en: "Are you sure you want to delete this expense?",
    },
    allCategories: { ar: "كل الفئات", en: "All Categories" },
    allStatuses: { ar: "كل الحالات", en: "All Statuses" },
    salaries: { ar: "رواتب", en: "Salaries" },
    utilities: { ar: "مرافق", en: "Utilities" },
    supplies: { ar: "لوازم", en: "Supplies" },
    marketing: { ar: "تسويق", en: "Marketing" },
    general: { ar: "عام", en: "General" },
    administrative: { ar: "إدارية", en: "Administrative" },
    other: { ar: "أخرى", en: "Other" },
  };

  const categories = [
    { id: "salaries", label: text.salaries },
    { id: "utilities", label: text.utilities },
    { id: "supplies", label: text.supplies },
    { id: "marketing", label: text.marketing },
    { id: "general", label: text.general },
    { id: "administrative", label: text.administrative },
    { id: "other", label: text.other },
  ];

  // const [expenses, setExpenses] = useState<Expense[]>([
  //   {
  //     id: '1',
  //     description: 'الرواتب للمعلمين',
  //     amount: 150,
  //     currency: 'SAR',
  //     category: 'general',
  //     date: '2025-12-27',
  //     paymentMethod: '',
  //     status: 'paid'
  //   },
  //   {
  //     id: '2',
  //     description: 'راتب الادارة',
  //     amount: 1000,
  //     currency: 'EGP',
  //     category: 'administrative',
  //     date: '2025-12-16',
  //     paymentMethod: '',
  //     status: 'paid'
  //   }
  // ]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);
  const mapExpenses = (apiExpenses: any[]): Expense[] => {
    return apiExpenses.map((exp) => ({
      id: exp.id,
      description: exp.title,
      amount: exp.amount,
      currency: exp.currency?.code || "USD",
      category: "general", // مفيش category في API
      date: exp.date.split("T")[0],
      paymentMethod: exp.payment_type,
      status: exp.status,
    }));
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);

        const data = await ExpenseService.getExpenses("paid");

        const mapped = mapExpenses(data);

        setExpenses(mapped);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);
  if (loading) {
    return <div className="p-6">Loading...</div>;
  }
  const handleSaveExpense = (expenseData: Expense) => {
    setExpenses((prev) => {
      const exists = prev.find((e) => e.id === expenseData.id);
      if (exists) {
        return prev.map((e) => (e.id === expenseData.id ? expenseData : e));
      }
      return [...prev, expenseData];
    });
    setShowModal(false);
    setSelectedExpense(null);
  };

  const handleDeleteExpense = (id: string) => {
    if (window.confirm(text.confirmDelete[language])) {
      setExpenses(expenses.filter((exp) => exp.id !== id));
    }
  };

  // const handleViewExpense = (expense: Expense) => {
  //   setSelectedExpense(expense);
  //   setShowViewModal(true);
  // };

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      filterCategory === "all" || expense.category === filterCategory;
    const matchesStatus =
      filterStatus === "all" || expense.status === filterStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalAmount = filteredExpenses.reduce(
    (sum, exp) => sum + exp.amount,
    0,
  );

  const getCategoryLabel = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.label[language] : categoryId;
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          {text.title[language]}
        </h1>
        <button
          onClick={() => {
            setSelectedExpense(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-6 py-3 btn-primary text-white rounded-xl transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">{text.addExpense[language]}</span>
        </button>
      </div>

      <div className="mb-6 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-red-100 rounded-xl">
              <DollarSign className="w-8 h-8 text-red-600" />
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">
                {text.totalExpenses[language]}
              </p>
              <h2 className="text-4xl font-bold text-red-600">
                {totalAmount.toFixed(2)}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {filteredExpenses.length} {text.totalCount[language]}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={text.search[language]}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-right"
          />
        </div>

        <div className="relative">
          <Filter className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-right appearance-none bg-white"
          >
            <option value="all">{text.allCategories[language]}</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label[language]}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <Filter className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-right appearance-none bg-white"
          >
            <option value="all">{text.allStatuses[language]}</option>
            <option value="paid">{text.paid[language]}</option>
            <option value="pending">{text.pending[language]}</option>
          </select>
        </div>
      </div>

      {filteredExpenses.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12">
          <div className="text-center">
            <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">{text.noExpenses[language]}</p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full" dir="rtl">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                    {text.description[language]}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                    {text.category[language]}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                    {text.amount[language]}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                    {text.date[language]}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                    {text.paymentMethod[language]}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                    {text.status[language]}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                    {text.actions[language]}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredExpenses.map((expense) => (
                  <tr
                    key={expense.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-medium text-gray-900">
                        {expense.description}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium badge-primary">
                        {getCategoryLabel(expense.category)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <span className="text-sm font-semibold text-red-600">
                          {expense.amount.toFixed(2)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {expense.currency}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm text-gray-900">
                        {expense.date}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm text-gray-600">
                        {expense.paymentMethod || "-"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                          expense.status === "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {expense.status === "paid"
                          ? text.paid[language]
                          : text.pending[language]}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 justify-start">
                        <button
                          onClick={() => {
                            setSelectedExpense(expense);
                            setShowViewModal(true);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedExpense(expense);
                            setShowModal(true);
                          }}
                          className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteExpense(expense.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <AddExpenseModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedExpense(null);
        }}
        onSave={handleSaveExpense}
        initialData={selectedExpense}
      />

      {showViewModal && selectedExpense && (
        <ViewExpenseModal
          isOpen={showViewModal}
          onClose={() => {
            setShowViewModal(false);
            setSelectedExpense(null);
          }}
          expense={selectedExpense}
        />
      )}
    </div>
  );
}
