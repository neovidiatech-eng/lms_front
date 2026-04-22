import { useState } from "react";
import { Search, CheckCircle, XCircle, Clock } from "lucide-react";
import { useLanguage } from "../../../contexts/LanguageContext";
import Pagination from "../../../components/ui/Pagination";
import WhatsAppPhone from "../../../components/ui/WhatsAppPhone";
import { TableSkeleton } from "../../../components/ui/CustomSkeleton";
import { useWithdrawals, useUpdateWithdrawal } from "../hooks/useTransaction";

export default function TransactionRequests() {
  const { language } = useLanguage();
  const { data: withdrawalsData, isLoading } = useWithdrawals();
  const updateStatusMutation = useUpdateWithdrawal();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 10;

  const text = {
    title: { ar: "طلبات السحب", en: "Withdrawal Requests" },
    search: {
      ar: "بحث عن اسم المعلم...",
      en: "Search for teacher name...",
    },
    filter: { ar: "تصفية", en: "Filter" },
    all: { ar: "الكل", en: "All" },
    pending: { ar: "قيد الانتظار", en: "Pending" },
    approved: { ar: "مقبول", en: "Approved" },
    rejected: { ar: "مرفوض", en: "Rejected" },
    completed: { ar: "مكتمل", en: "Completed" },
    teacherName: { ar: "اسم المعلم", en: "Teacher Name" },
    phone: { ar: "الهاتف", en: "Phone" },
    email: { ar: "البريد الإلكتروني", en: "Email" },
    amount: { ar: "المبلغ", en: "Amount" },
    requestDate: { ar: "تاريخ الطلب", en: "Request Date" },
    status: { ar: "الحالة", en: "Status" },
    actions: { ar: "الإجراءات", en: "Actions" },
    approve: { ar: "قبول", en: "Approve" },
    reject: { ar: "رفض", en: "Reject" },
    noRequests: {
      ar: "لا توجد طلبات سحب",
      en: "No withdrawal requests found",
    },
  };

  const withdrawals = withdrawalsData?.data?.withdrawals || [];

  const filteredRequests = withdrawals.filter((request) => {
    const matchesSearch = request.teacher?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRequests = filteredRequests.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "approved":
        return "bg-green-50 text-green-700 border-green-200";
      case "completed":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "rejected":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const handleStatusUpdate = async (id: string, status: 'approved' | 'rejected') => {
    if (window.confirm(language === 'ar' ? 'هل أنت متأكد من تغيير حالة الطلب؟' : 'Are you sure you want to change the request status?')) {
        updateStatusMutation.mutate({ id, status });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          {text.title[language]}
        </h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5`} />
            <input
              type="text"
              placeholder={text.search[language]}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full ${language === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-start transition-all`}
            />
          </div>

          {/* <div className="flex items-center gap-2">
            <CustomSelect
              value={statusFilter}
              onChange={(value) =>
                setStatusFilter(
                  value as any
                )
              }
              options={[
                { value: "all", label: text.all[language] },
                { value: "pending", label: text.pending[language] },
                { value: "approved", label: text.approved[language] },
                { value: "completed", label: text.completed[language] },
                { value: "rejected", label: text.rejected[language] },
              ]}
              placeholder={text.filter[language]}
            />
          </div> */}
        </div>

        {isLoading ? (
          <TableSkeleton rows={itemsPerPage} columns={7} />
        ) : paginatedRequests.length === 0 ? (
          <div className="text-center py-12">
            <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">{text.noRequests[language]}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full" dir={language === 'ar' ? 'rtl' : 'ltr'}>
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-4 text-start text-sm font-semibold text-gray-700">
                    {text.teacherName[language]}
                  </th>
                  <th className="px-4 py-4 text-start text-sm font-semibold text-gray-700">
                    {text.phone[language]}
                  </th>
                  <th className="px-4 py-4 text-start text-sm font-semibold text-gray-700">
                    {text.email[language]}
                  </th>
                  <th className="px-4 py-4 text-start text-sm font-semibold text-gray-700">
                    {text.amount[language]}
                  </th>
                  <th className="px-4 py-4 text-start text-sm font-semibold text-gray-700">
                    {text.requestDate[language]}
                  </th>
                  <th className="px-4 py-4 text-start text-sm font-semibold text-gray-700">
                    {text.status[language]}
                  </th>
                  <th className="px-4 py-4 text-start text-sm font-semibold text-gray-700">
                    {text.actions[language]}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedRequests.map((request) => (
                  <tr
                    key={request.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-4 text-start text-sm font-medium text-gray-900">
                      {request.teacher?.name || "—"}
                    </td>
                    <td className="px-4 py-4 text-end text-sm text-gray-600" dir="ltr">
                      <WhatsAppPhone phone={request.teacher?.phone || ""} />
                    </td>
                    <td className="px-4 py-4 text-end text-sm text-gray-600" dir="ltr">
                      {request.teacher?.email || "—"}
                    </td>
                    <td className="px-4 py-4 text-start text-sm font-bold text-primary">
                      {request.amount}
                    </td>
                    <td className="px-4 py-4 text-start text-sm text-gray-900">
                      {new Date(request.createdAt).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US')}
                    </td>
                    <td className="px-4 py-4 text-start">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(
                          request.status
                        )}`}
                      >
                        {text[request.status as keyof typeof text]?.[language] || request.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 justify-start">
                        <button
                          onClick={() => handleStatusUpdate(request.id, "approved")}
                          disabled={request.status !== "pending" || updateStatusMutation.isPending}
                          className={`p-2 rounded-lg transition-colors ${
                            request.status === "pending"
                              ? "text-green-600 hover:bg-green-50"
                              : "text-gray-300 cursor-not-allowed"
                          }`}
                          title={text.approve[language]}
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(request.id, "rejected")}
                          disabled={request.status !== "pending" || updateStatusMutation.isPending}
                          className={`p-2 rounded-lg transition-colors ${
                            request.status === "pending"
                              ? "text-red-600 hover:bg-red-50"
                              : "text-gray-300 cursor-not-allowed"
                          }`}
                          title={text.reject[language]}
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!isLoading && paginatedRequests.length > 0 && (
          <div className="mt-6 border-t border-gray-100 pt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredRequests.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}