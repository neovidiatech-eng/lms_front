import { useState } from 'react';
import { Search, Eye, Pencil, Trash2, Plus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import WhatsAppPhone from '../components/ui/WhatsAppPhone';
import AddUserModal from '../components/modals/AddUserModal';
import EditUserModal from '../components/modals/EditUserModal';
import ViewUserModal from '../components/modals/ViewUserModal';
import Pagination from '../components/ui/Pagination';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  countryCode?: string;
  role: string;
  status: 'active' | 'inactive';
  avatar?: string;
  permissions?: string[];
}

export default function Users() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const itemsPerPage = 7;

  const users: User[] = [
    {
      id: '1',
      name: 'ahmed khaled',
      email: 'aj@demo.app',
      phone: '0181262145',
      countryCode: '+20',
      role: 'student',
      status: 'active',
      permissions: ['dashboard_view', 'students_manage'],
    },
    {
      id: '2',
      name: 'Ahmed Gamal',
      email: 'ahmed@demo.com',
      phone: '01091536978',
      countryCode: '+20',
      role: 'admin',
      status: 'inactive',
      permissions: ['dashboard_view', 'students_manage', 'teachers_manage', 'sessions_manage'],
    },
    {
      id: '3',
      name: 'محاسب مالي',
      email: 'account@demo.all',
      phone: '0109153698547',
      countryCode: '+20',
      role: 'admin',
      status: 'active',
      permissions: ['dashboard_view', 'finance_manage', 'users_manage'],
    },
    {
      id: '4',
      name: 'Super Admin',
      email: 'admin@admin.com',
      phone: '012022222',
      countryCode: '+966',
      role: 'super_admin',
      status: 'active',
      permissions: [
        'dashboard_view',
        'students_manage',
        'teachers_manage',
        'sessions_manage',
        'plans_manage',
        'subscriptions_manage',
        'exams_manage',
        'homework_manage',
        'settings_manage',
        'preparations_manage',
        'users_manage',
        'finance_manage',
        'chats_manage',
        'withdrawals_manage',
        'creative_manage',
      ],
    },
    {
      id: '5',
      name: 'Ahmed Gamal',
      email: 'adminffff@app.com',
      phone: '01091536978',
      countryCode: '+966',
      role: 'teacher',
      status: 'active',
      permissions: ['dashboard_view', 'students_manage', 'homework_manage', 'exams_manage'],
    },
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddUser = (userData: any) => {
    console.log('New user data:', userData);
    setIsAddModalOpen(false);
  };

  const handleEditUser = (userData: any) => {
    console.log('Updated user data:', userData);
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذا المستخدم؟' : 'Are you sure you want to delete this user?')) {
      try {
        console.log('Deleting user:', userId);
        alert(language === 'ar' ? 'تم حذف المستخدم بنجاح' : 'User deleted successfully');
      } catch (error) {
        console.error('Error deleting user:', error);
        alert(language === 'ar' ? 'حدث خطأ أثناء حذف المستخدم' : 'Error deleting user');
      }
    }
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <span>{language === 'ar' ? 'الرئيسية' : 'Home'}</span>
        <span>/</span>
        <span>{language === 'ar' ? 'المستخدمين' : 'Users'}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {language === 'ar' ? 'إدارة المستخدمين' : 'User Management'}
        </h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 btn-primary text-white px-6 py-3 rounded-xl transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">
            {language === 'ar' ? 'إضافة مستخدم جديد' : 'Add New User'}
          </span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="relative">
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={language === 'ar' ? 'بحث...' : 'Search...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-12 pl-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-right"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                  {language === 'ar' ? 'الإسم' : 'Name'}
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                  {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                  {language === 'ar' ? 'الهاتف' : 'Phone'}
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                  {language === 'ar' ? 'الدور' : 'Role'}
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
              {currentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-600 text-sm font-medium">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{user.email}</span>
                  </td>
                  <td className="px-6 py-4">
                    <WhatsAppPhone
                      phone={`${user.countryCode || '+20'} ${user.phone}`}
                      className="text-gray-900"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-purple-600 font-medium">{user.role}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-purple-100 text-purple-700'
                      }`}
                    >
                      {user.status === 'active'
                        ? language === 'ar'
                          ? 'نشط'
                          : 'Active'
                        : language === 'ar'
                        ? 'مسؤول'
                        : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => handleViewUser(user)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                        title={language === 'ar' ? 'عرض' : 'View'}
                      >
                        <Eye className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleEditClick(user)}
                        className="p-2 hover:bg-primary-light rounded-lg transition-colors group"
                        title={language === 'ar' ? 'تعديل' : 'Edit'}
                      >
                        <Pencil className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
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
          totalItems={filteredUsers.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Add User Modal */}
      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddUser}
      />

      {/* Edit User Modal */}
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedUser(null);
        }}
        onSubmit={handleEditUser}
        userData={selectedUser}
      />

      {/* View User Modal */}
      <ViewUserModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedUser(null);
        }}
        userData={selectedUser}
      />
    </div>
  );
}
