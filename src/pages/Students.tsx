import { useState } from 'react';
import { Search, Eye, Pencil, Trash2, Plus, Users, UserCheck, UserX, ClipboardList } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import WhatsAppPhone from '../components/ui/WhatsAppPhone';
import AddStudentModal from '../components/modals/AddStudentModal';
import ViewStudentModal from '../components/modals/ViewStudentModal';
import EditStudentModal from '../components/modals/EditStudentModal';
import Pagination from '../components/ui/Pagination';

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  country: string;
  grade: string;
  status: 'active' | 'inactive';
  avatar?: string;
}

export default function Students() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const itemsPerPage = 7;

  const students: Student[] = [
    {
      id: '1',
      name: 'محمد ذكر',
      email: 'Mohamed@gmail.com',
      phone: '01101646637',
      countryCode: '+20',
      country: 'مصر',
      grade: 'ثانية القصيرة',
      status: 'active',
    },
    {
      id: '2',
      name: 'أحمد ذكر',
      email: 'Ahmed@gmail.com',
      phone: '01101236635',
      countryCode: '+20',
      country: 'مصر',
      grade: 'ثانية القصيرة',
      status: 'active',
    },
    {
      id: '3',
      name: 'Ahmed ذكر',
      email: 'Ahmed.hegazy@gmail.com',
      phone: '01102394475',
      countryCode: '+20',
      country: 'مصر',
      grade: 'ثانية القصيرة',
      status: 'active',
    },
    {
      id: '4',
      name: 'mohamed ذكر',
      email: 'mohamed123@gmail.com',
      phone: '01234567898',
      countryCode: '+20',
      country: 'مصر',
      grade: 'ثانية القصيرة',
      status: 'active',
    },
    {
      id: '5',
      name: 'Ahmed Gamal ذكر',
      email: 'engahmedgamal01086@gmail.com',
      phone: '01091530978',
      countryCode: '+20',
      country: 'مصر',
      grade: 'ثانية التفاضلية',
      status: 'active',
    },
  ];

  const stats = [
    {
      id: 'total',
      label: language === 'ar' ? 'إجمالي الطلاب' : 'Total Students',
      value: 22,
      icon: Users,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      valueColor: 'text-blue-600',
    },
    {
      id: 'active',
      label: language === 'ar' ? 'الطلاب النشطون' : 'Active Students',
      value: 5,
      icon: UserCheck,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      valueColor: 'text-green-600',
    },
    {
      id: 'suspended',
      label: language === 'ar' ? 'الطلاب المتوقفون' : 'Suspended Students',
      value: 0,
      icon: UserX,
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
      valueColor: 'text-red-600',
    },
    {
      id: 'plans',
      label: language === 'ar' ? 'عدد الخطط' : 'Number of Plans',
      value: 5,
      icon: ClipboardList,
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      valueColor: 'text-purple-600',
    },
  ];

  const grades = [
    { id: 'all', label: 'كل الخطط', labelEn: 'All Plans' },
    { id: 'secondary_1', label: 'ثانية القصيرة', labelEn: 'Secondary 1' },
    { id: 'secondary_2', label: 'ثانية التفاضلية', labelEn: 'Secondary 2' },
  ];

  const countries = [
    { id: 'all', label: 'اختر الدولة', labelEn: 'Select Country' },
    { id: 'egypt', label: 'مصر', labelEn: 'Egypt' },
    { id: 'saudi', label: 'السعودية', labelEn: 'Saudi Arabia' },
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.phone.includes(searchTerm);
    const matchesGrade = selectedGrade === 'all' || student.grade === selectedGrade;
    const matchesCountry = selectedCountry === 'all' || student.country === selectedCountry;
    return matchesSearch && matchesGrade && matchesCountry;
  });

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStudents = filteredStudents.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsViewModalOpen(true);
  };

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  const handleDeleteStudent = async (studentId: string) => {
    if (
      window.confirm(
        language === 'ar' ? 'هل أنت متأكد من حذف هذا الطالب؟' : 'Are you sure you want to delete this student?'
      )
    ) {
      try {
        console.log('Deleting student:', studentId);
        alert(language === 'ar' ? 'تم حذف الطالب بنجاح' : 'Student deleted successfully');
      } catch (error) {
        console.error('Error deleting student:', error);
        alert(language === 'ar' ? 'حدث خطأ أثناء حذف الطالب' : 'Error deleting student');
      }
    }
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div className="text-right">
          <h1 className="text-3xl font-bold text-gray-900">
            {language === 'ar' ? 'إدارة الطلاب' : 'Student Management'}
          </h1>
          <p className="text-gray-600 mt-1">
            {language === 'ar'
              ? 'إدارة بيانات جميع الطلاب والخطط الدراسية'
              : 'Manage all student data and study plans'}
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 btn-primary text-white px-6 py-3 rounded-xl transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">
            {language === 'ar' ? 'إضافة طالب جديد' : 'Add New Student'}
          </span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className={`${stat.bgColor} rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
            </div>
            <div className="text-right">
              <p className={`text-4xl font-bold ${stat.valueColor} mb-2`}>{stat.value}</p>
              <p className="text-sm font-medium text-gray-700">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={
                language === 'ar'
                  ? 'ابحث بالاسم أو البريد الإلكتروني...'
                  : 'Search by name or email...'
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-right"
            />
          </div>

          {/* Country Filter */}
          <div>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-right bg-white"
            >
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {language === 'ar' ? country.label : country.labelEn}
                </option>
              ))}
            </select>
          </div>

          {/* Grade Filter */}
          <div>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-right bg-white"
            >
              {grades.map((grade) => (
                <option key={grade.id} value={grade.id}>
                  {language === 'ar' ? grade.label : grade.labelEn}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                  {language === 'ar' ? 'الطالب' : 'Student'}
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                  {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                  {language === 'ar' ? 'الهاتف' : 'Phone'}
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                  {language === 'ar' ? 'الخطة' : 'Plan'}
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                  {language === 'ar' ? 'الدولة' : 'Country'}
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                  {language === 'ar' ? 'الحالة' : 'Status'}
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                  {language === 'ar' ? 'الإجراءات' : 'Actions'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-600 text-sm font-medium">
                          {student.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">{student.name}</div>
                        <div className="text-xs text-gray-500">{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{student.email}</span>
                  </td>
                  <td className="px-6 py-4">
                    <WhatsAppPhone
                      phone={`${student.countryCode} ${student.phone}`}
                      className="text-sm text-gray-900"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-3 py-1 badge-primary rounded-full text-xs font-medium">
                      {student.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{student.country}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        student.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      ✓ {language === 'ar' ? 'نشط' : 'Active'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => handleViewStudent(student)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                        title={language === 'ar' ? 'عرض' : 'View'}
                      >
                        <Eye className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleEditStudent(student)}
                        className="p-2 hover:bg-primary-light rounded-lg transition-colors group"
                        title={language === 'ar' ? 'تعديل' : 'Edit'}
                      >
                        <Pencil className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteStudent(student.id)}
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
          totalItems={filteredStudents.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Modals */}
      <AddStudentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={(studentData) => {
          console.log('New student data:', studentData);
          alert(language === 'ar' ? 'تم إضافة الطالب بنجاح' : 'Student added successfully');
        }}
      />

      <ViewStudentModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        studentData={selectedStudent}
      />

      <EditStudentModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        studentData={selectedStudent}
        onSubmit={(studentData) => {
          console.log('Updated student data:', studentData);
          alert(language === 'ar' ? 'تم تحديث بيانات الطالب بنجاح' : 'Student updated successfully');
        }}
      />
    </div>
  );
}
