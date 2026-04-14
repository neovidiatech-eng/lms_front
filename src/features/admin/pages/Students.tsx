import { useState } from 'react';
import { Search, Eye, Pencil, Trash2, Plus, Users, UserCheck, UserX, ClipboardList } from 'lucide-react';
import WhatsAppPhone from '../../../components/ui/WhatsAppPhone';
import AddStudentModal from '../../../components/modals/AddStudentModal';
import ViewStudentModal from '../../../components/modals/ViewStudentModal';
import EditStudentModal from '../../../components/modals/EditStudentModal';
import Pagination from '../../../components/ui/Pagination';
import CustomSelect from '../../../components/ui/CustomSelect';
import { useTranslation } from 'react-i18next';
import { useStudents, useCreateStudent, useUpdateStudent, useDeleteStudent } from '../hooks/useStudents';
import { Student } from '../../../types/student';
import ErrorService from '../../../utils/ErrorService';


export default function Students() {
  const { t, i18n } = useTranslation();
  const language = i18n.language.split('-')[0];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const itemsPerPage = 7;

  const { data: apiResponse } = useStudents();

  const rawData: any = apiResponse?.data;
  const studentsList: Student[] = Array.isArray(rawData) ? rawData : (rawData?.students || rawData?.data || []);
  const { mutateAsync: createStudent } = useCreateStudent();
  const { mutateAsync: updateStudent } = useUpdateStudent();
  const { mutateAsync: deleteStudent } = useDeleteStudent();

  const stats = [
    {
      id: 'total',
      label: t('totalStudents'),
      value: studentsList.length,
      icon: Users,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      valueColor: 'text-blue-600',
    },
    {
      id: 'active',
      label: t('activeStudents'),
      value: studentsList.filter(student => student.status === 'pending').length,
      icon: UserCheck,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      valueColor: 'text-green-600',
    },
    {
      id: 'suspended',
      label: t('suspendedStudents'),
      value: 0,
      icon: UserX,
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
      valueColor: 'text-red-600',
    },
    {
      id: 'plans',
      label: t('numberOfPlans'),
      value: 3
      ,
      icon: ClipboardList,
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      valueColor: 'text-purple-600',
    },
  ];

  const grades = [
    { id: 'all', label: t('allPlans'), labelEn: 'All Plans' },
    { id: 'secondary_1', label: t('secondary1'), labelEn: 'Secondary 1' },
    { id: 'secondary_2', label: t('secondary2'), labelEn: 'Secondary 2' },
  ];

  const countries = [
    { id: 'all', label: t('selectCountry'), labelEn: 'Select Country' },
    { id: 'egypt', label: t('egypt'), labelEn: 'Egypt' },
    { id: 'saudi', label: t('saudiArabia'), labelEn: 'Saudi Arabia' },
  ];

  const filteredStudents = studentsList.filter(student => {
    const matchesSearch =
      student.user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.user.phone?.includes(searchTerm);

    const matchesGrade = selectedGrade === 'all' || student.planId === selectedGrade;
    const matchesCountry = selectedCountry === 'all' || student.country === selectedCountry;

    return matchesSearch && matchesGrade && matchesCountry;
  });
  const totalPages = Math.ceil((filteredStudents?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStudents = filteredStudents?.slice(startIndex, endIndex);

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
        t('deleteConfirmStudent')
      )
    ) {
      try {
        await deleteStudent(studentId);
        ErrorService.success(t('studentDeletedSuccess'));
      } catch (error) {
        console.error('Error deleting student:', error);
        // Detailed error is handled by axios interceptor
      }
    }
  };



  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div className="text-right">
          <h1 className="text-3xl font-bold text-gray-900">
            {t('studentManagement')}
          </h1>
          <p className="text-gray-600 mt-1">
            {t('manageStudentsDescription')}
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 btn-primary text-white px-6 py-3 rounded-xl transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">
            {t('addNewStudent')}
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
              placeholder={t('searchUsersPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-right"
            />
          </div>

          {/* Country Filter */}
          <div>
            <CustomSelect
              value={selectedCountry}
              options={countries.map((country) => ({
                value: country.id,
                label: language === 'ar' ? country.label : country.labelEn,
                searchText: `${country.label} ${country.labelEn}`,
              }))}
              onChange={(val) => setSelectedCountry(val as string)}
              className="h-[46px]"
            />
          </div>

          {/* Grade Filter */}
          <div>
            <CustomSelect
              value={selectedGrade}
              options={grades.map((grade) => ({
                value: grade.id,
                label: language === 'ar' ? grade.label : grade.labelEn,
                searchText: `${grade.label} ${grade.labelEn}`,
              }))}
              onChange={(val) => setSelectedGrade(val as string)}
              className="h-[46px]"
            />
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
                  {t('studentInfo')}
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                  {t('phone')}
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                  {t('plan')}
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                  {t('hours')}
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                  {t('country')}
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                  {t('status')}
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                  {t('actions')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 text-sm font-semibold">
                          {student.user.name ? student.user.name.charAt(0).toUpperCase() : '?'}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">{student.user.name}</div>
                        <div className="text-xs text-gray-500">{student.user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <WhatsAppPhone
                      phone={`${student.user.code_country} ${student.user.phone}`}
                      className="text-sm text-gray-900"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium border border-purple-100">
                      {student.plan.name_ar || student.plan.name_en || t('noPlan')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {student.hours_attended} / {student.hours}
                      </div>
                      <div className="w-24 h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden ml-auto">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all duration-500"
                          style={{ width: `${student.hours > 0 ? (student.hours_attended / student.hours) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{student.country}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${student.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : student.status === 'pending'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-gray-100 text-gray-700'
                        }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${student.status === 'active' ? 'bg-green-500' : student.status === 'pending' ? 'bg-orange-500' : 'bg-gray-500'
                        }`} />
                      {student.status === 'active' ? t('active') : student.status === 'pending' ? t('pending') : t('inactive')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => handleViewStudent(student)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                        title={t('view')}
                      >
                        <Eye className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleEditStudent(student)}
                        className="p-2 hover:bg-primary-light rounded-lg transition-colors group"
                        title={t('edit')}
                      >
                        <Pencil className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteStudent(student.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                        title={t('delete')}
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
        onSubmit={async (studentData) => {
          try {
            const payload: any = {
              name: studentData.name,
              email: studentData.email,
              phone: studentData.countryCode + studentData.phone.replace(/^0/, ''),
              phone_code: studentData.countryCode,
              birth_date: (studentData.birthDate && studentData.birthDate !== "") ? new Date(studentData.birthDate).toISOString() : null,
              gender: studentData.gender,
              country: studentData.country,
              active: studentData.status === 'active',
            };

            // Only include planId if it's a valid GUID string (not empty)
            if (studentData.plan && studentData.plan.trim() !== "") {
              payload.planId = studentData.plan;
            }

            if (studentData.password) {
              payload.password = studentData.password;
            }
            await createStudent(payload);
            setIsAddModalOpen(false);
            ErrorService.success(t('studentAddedSuccess'));
          } catch (error) {
            console.error('Error adding student:', error);
            // Detailed error is handled by axios interceptor
          }
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
        studentData={
          selectedStudent
            ? {
              id: selectedStudent.id,
              name: selectedStudent.user.name,
              email: selectedStudent.user.email,
              phone: selectedStudent.user.phone,
              countryCode: selectedStudent.user.code_country,
              country: selectedStudent.country ? selectedStudent.country.toLowerCase() : 'egypt',
              status: (selectedStudent.status || (selectedStudent.active ? 'active' : 'inactive')) as 'active' | 'inactive' | 'pending',
              gender: selectedStudent.gender || 'male',
              plan: selectedStudent.planId || '',
              birthDate: selectedStudent.birth_date ? selectedStudent.birth_date.split('T')[0] : '',
            }
            : null
        }
        onSubmit={async (updatedData) => {
          try {
            const payload: any = {
              name: updatedData.name,
              // Backend expects combined phone and separate phone_code
              phone: updatedData.countryCode + updatedData.phone.replace(/^0/, ''),
              phone_code: updatedData.countryCode,
              country: updatedData.country,
              birth_date: (updatedData.birthDate && updatedData.birthDate !== "") ? new Date(updatedData.birthDate).toISOString() : null,
              gender: updatedData.gender,
              active: updatedData.status === 'active',
            };

            if (updatedData.plan && updatedData.plan.trim() !== "") {
              payload.planId = updatedData.plan;
            } else {
              payload.planId = null;
            }

            if (updatedData.password) {
              payload.password = updatedData.password;
            }
            await updateStudent({ id: updatedData.id, data: payload });
            ErrorService.success(t('studentUpdatedSuccess'));
            setIsEditModalOpen(false);
          } catch (error) {
            console.error('Error updating student:', error);
            // Detailed error is handled by axios interceptor
          }
        }}
      />
    </div>
  );
}
