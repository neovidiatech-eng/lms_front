import { useState } from 'react';
import { Search, Eye, Pencil, Trash2, Plus, Users, UserCheck, UserX } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import WhatsAppPhone from '../components/ui/WhatsAppPhone';
import AddTeacherModal from '../components/modals/AddTeacherModal';
import ViewTeacherModal from '../components/modals/ViewTeacherModal';
import EditTeacherModal from '../components/modals/EditTeacherModal';
import Pagination from '../components/ui/Pagination';
import CustomSelect from '../components/ui/CustomSelect';

interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  amount: number;
  currency: string;
  status: 'active' | 'inactive';
  subject: string;
  avatar?: string;
}

export default function Teachers() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const itemsPerPage = 7;

  const teachers: Teacher[] = [
    {
      id: '1',
      name: 'Mohammed',
      email: 'Mohammed123@gmail.com',
      phone: '1027373763',
      countryCode: '+20',
      amount: 100,
      currency: 'EGP',
      status: 'active',
      subject: 'الرياضيات',
    },
    {
      id: '2',
      name: 'Mahmoud',
      email: 'Mahmoud@gmail.com',
      phone: '1234567890',
      countryCode: '+20',
      amount: 120,
      currency: 'EGP',
      status: 'active',
      subject: 'الرياضيات',
    },
    {
      id: '3',
      name: 're',
      email: 'aheelff@gmail.com',
      phone: '102141478',
      countryCode: '+20',
      amount: 250,
      currency: 'EGP',
      status: 'active',
      subject: 'القرآن الكريم، اللغة العربية',
    },
    {
      id: '4',
      name: 'Ahmed Ali',
      email: 'ahmed12@example.com',
      phone: '1023020214',
      countryCode: '+20',
      amount: 150,
      currency: 'EGP',
      status: 'active',
      subject: 'القرآن الكريم، اللغة العربية',
    },
    {
      id: '5',
      name: 'محمد عبدالباري',
      email: 'engahmedgamal00086sdd@gmail.com',
      phone: '1023065856',
      countryCode: '+20',
      amount: 150,
      currency: 'EGP',
      status: 'active',
      subject: 'حساب ، تفسيت',
    },
    {
      id: '6',
      name: 'أحمد محمد',
      email: 'ahmed.teacher@gmail.com',
      phone: '1012345678',
      countryCode: '+20',
      amount: 180,
      currency: 'EGP',
      status: 'active',
      subject: 'الفيزياء',
    },
    {
      id: '7',
      name: 'سارة أحمد',
      email: 'sara.ahmed@gmail.com',
      phone: '1098765432',
      countryCode: '+20',
      amount: 200,
      currency: 'EGP',
      status: 'active',
      subject: 'الكيمياء',
    },
  ];

  const statsCards = [
    {
      id: 'total',
      label: language === 'ar' ? 'إجمالي المعلمين' : 'Total Teachers',
      value: teachers.length,
      icon: Users,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      valueColor: 'text-blue-600',
    },
    {
      id: 'active',
      label: language === 'ar' ? 'نشط' : 'Active',
      value: teachers.filter((t) => t.status === 'active').length,
      icon: UserCheck,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      valueColor: 'text-green-600',
    },
    {
      id: 'inactive',
      label: language === 'ar' ? 'غير نشط' : 'Inactive',
      value: teachers.filter((t) => t.status === 'inactive').length,
      icon: UserX,
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      valueColor: 'text-orange-600',
    },
  ];

  const statuses = [
    { id: 'all', label: 'الحالة', labelEn: 'Status' },
    { id: 'active', label: 'نشط', labelEn: 'Active' },
    { id: 'inactive', label: 'غير نشط', labelEn: 'Inactive' },
  ];

  const countries = [
    { id: 'all', label: 'كل الدول', labelEn: 'All Countries' },
    { id: 'egypt', label: 'مصر', labelEn: 'Egypt' },
    { id: 'saudi', label: 'السعودية', labelEn: 'Saudi Arabia' },
    { id: 'uae', label: 'الإمارات', labelEn: 'UAE' },
    { id: 'kuwait', label: 'الكويت', labelEn: 'Kuwait' },
  ];

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.phone.includes(searchTerm);
    const matchesStatus = selectedStatus === 'all' || teacher.status === selectedStatus;
    const matchesCountry = selectedCountry === 'all';
    return matchesSearch && matchesStatus && matchesCountry;
  });

  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTeachers = filteredTeachers.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleViewTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsViewModalOpen(true);
  };

  const handleEditTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsEditModalOpen(true);
  };

  const handleDeleteTeacher = async (teacherId: string) => {
    if (
      window.confirm(
        language === 'ar' ? 'هل أنت متأكد من حذف هذا المعلم؟' : 'Are you sure you want to delete this teacher?'
      )
    ) {
      try {
        console.log('Deleting teacher:', teacherId);
        alert(language === 'ar' ? 'تم حذف المعلم بنجاح' : 'Teacher deleted successfully');
      } catch (error) {
        console.error('Error deleting teacher:', error);
        alert(language === 'ar' ? 'حدث خطأ أثناء حذف المعلم' : 'Error deleting teacher');
      }
    }
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div className="text-right">
          <h1 className="text-3xl font-bold text-gray-900">
            {language === 'ar' ? 'إدارة المعلمين' : 'Teacher Management'}
          </h1>
          <p className="text-gray-600 mt-1">
            {language === 'ar'
              ? 'إدارة بيانات جميع المعلمين والمواد الدراسية'
              : 'Manage all teacher data and subjects'}
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 btn-primary text-white px-6 py-3 rounded-xl transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">
            {language === 'ar' ? 'إضافة معلم جديد' : 'Add New Teacher'}
          </span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statsCards.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="text-right flex-1">
                <p className="text-sm text-gray-600 mb-2">{card.label}</p>
                <p className={`text-3xl font-bold ${card.valueColor}`}>{card.value}</p>
              </div>
              <div className={`${card.bgColor} w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0`}>
                <card.icon className={`w-7 h-7 ${card.iconColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder={
                language === 'ar'
                  ? 'ابحث بالاسم أو البريد الإلكتروني...'
                  : 'Search by name or email...'
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-right"
              dir="rtl"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          {/* Status Filter */}
          <CustomSelect
    value={selectedStatus}
    options={statuses.map((c) =>{
      return { value: c.id, label: language === 'ar' ? c.label : c.labelEn };
    })}
    onChange={(val) => setSelectedStatus(val as string)}
    className="h-[46px]"
  />

          {/* Country Filter */}
         <CustomSelect
             value={selectedCountry}
             options={countries.map((c) =>{
               return { value: c.id, label: language === 'ar' ? c.label : c.labelEn };
             })}
             onChange={(val) => setSelectedCountry(val as string)}
             className="h-[46px]"
           />
        </div>
      </div>

      {/* Teachers Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                  {language === 'ar' ? 'بيانات المعلم' : 'Teacher Info'}
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                  {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                  {language === 'ar' ? 'الهاتف' : 'Phone'}
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                  {language === 'ar' ? 'المبلغ' : 'Amount'}
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                  {language === 'ar' ? 'الحالة' : 'Status'}
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                  {language === 'ar' ? 'المادة' : 'Subject'}
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                  {language === 'ar' ? 'الإجراءات' : 'Actions'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentTeachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 justify-end">
                      <span className="text-sm font-medium text-gray-900">{teacher.name}</span>
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 text-gray-500" />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{teacher.email}</span>
                  </td>
                  <td className="px-6 py-4">
                    <WhatsAppPhone
                      phone={`${teacher.countryCode} ${teacher.phone}`}
                      className="text-sm text-green-600 hover:text-green-700"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">
                      {teacher.currency} {teacher.amount.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        teacher.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {teacher.status === 'active'
                        ? language === 'ar'
                          ? 'نشط'
                          : 'Active'
                        : language === 'ar'
                        ? 'غير نشط'
                        : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1 justify-end">
                      {teacher.subject.split('،').map((sub, index) => (
                        <span
                          key={index}
                          className="inline-flex px-2 py-1 bg-purple-100 text-purple-700 rounded-md text-xs"
                        >
                          {sub.trim()}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => handleViewTeacher(teacher)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                        title={language === 'ar' ? 'عرض' : 'View'}
                      >
                        <Eye className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleEditTeacher(teacher)}
                        className="p-2 hover:bg-primary-light rounded-lg transition-colors group"
                        title={language === 'ar' ? 'تعديل' : 'Edit'}
                      >
                        <Pencil className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteTeacher(teacher.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                        title={language === 'ar' ? 'حذف' : 'Delete'}
                      >
                        <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredTeachers.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Add Teacher Modal */}
      <AddTeacherModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={(teacherData) => {
          console.log('New teacher data:', teacherData);
          alert(language === 'ar' ? 'تم إضافة المعلم بنجاح' : 'Teacher added successfully');
        }}
      />

      {/* View Teacher Modal */}
      <ViewTeacherModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedTeacher(null);
        }}
        teacher={selectedTeacher}
      />

      {/* Edit Teacher Modal */}
      <EditTeacherModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedTeacher(null);
        }}
        onSubmit={(teacherData) => {
          console.log('Updated teacher data:', teacherData);
        }}
        teacher={selectedTeacher}
      />
    </div>
  );
}
