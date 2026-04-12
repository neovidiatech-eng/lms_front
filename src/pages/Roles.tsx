import { useState } from 'react';
import { Search, Pencil, Trash2, Plus, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Pagination from '../components/ui/Pagination';
import { Role } from '../types/roles';



export default function Roles() {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    const roles: Role[] = [
        {
            id: "bb0d0f48-1c2a-4249-9308-b9f09437b3a8",
            name: "super_admin",
            createdAt: "2026-04-11T14:53:47.896Z",
            updatedAt: "2026-04-11T18:35:55.195Z"
        },
        {
            id: "e766f684-fe13-4fac-874b-7a002129316e",
            name: "student",
            createdAt: "2026-04-11T14:53:47.896Z",
            updatedAt: "2026-04-11T18:35:55.196Z"
        },
        {
            id: "8f1fe0ba-8275-4796-8782-9012946abcd6",
            name: "teacher",
            createdAt: "2026-04-11T14:53:47.896Z",
            updatedAt: "2026-04-11T18:35:55.196Z"
        },
        {
            id: "b57abf18-86d2-459b-a1d2-3f1732a2320a",
            name: "admin",
            createdAt: "2026-04-11T14:53:47.896Z",
            updatedAt: "2026-04-11T18:35:55.196Z"
        }
    ];

    const filteredRoles = roles.filter(role =>
        role.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredRoles.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentRoles = filteredRoles.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleDeleteRole = (roleId: string) => {
        if (window.confirm(t('deleteConfirmRole'))) {
            console.log('Deleting role:', roleId);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="p-6 lg:p-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                <span>{t('home')}</span>
                <span>/</span>
                <span className="text-primary font-medium">{t('roles')}</span>
            </div>

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {t('roleManagement')}
                    </h1>
                    <p className="text-gray-500">{t('roleManagementSubtitle')}</p>
                </div>
                <button
                    className="flex items-center gap-2 btn-primary text-white px-6 py-3 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
                >
                    <Plus className="w-5 h-5" />
                    <span className="font-medium whitespace-nowrap">
                        {t('addNewRole')}
                    </span>
                </button>
            </div>

            {/* Search Section */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                <div className="relative group">
                    <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-primary" />
                    <input
                        type="text"
                        placeholder={t('search')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pr-12 pl-4 py-4 bg-gray-50/50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-right"
                    />
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-5 text-right text-sm font-bold text-gray-900 uppercase tracking-wider">
                                    {t('roleName')}
                                </th>
                                <th className="px-6 py-5 text-right text-sm font-bold text-gray-900 uppercase tracking-wider">
                                    {t('createdAt')}
                                </th>
                                <th className="px-6 py-5 text-right text-sm font-bold text-gray-900 uppercase tracking-wider">
                                    {t('updatedAt')}
                                </th>
                                <th className="px-6 py-5 text-right text-sm font-bold text-gray-900 uppercase tracking-wider">
                                    {t('actions')}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {currentRoles.map((role) => (
                                <tr key={role.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                                <ShieldCheck className="w-6 h-6" />
                                            </div>
                                            <span className="font-semibold text-gray-900">{role.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="text-sm text-gray-600 line-clamp-1">{formatDate(role.createdAt)}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="text-sm text-gray-600 line-clamp-1">{formatDate(role.updatedAt)}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2 justify-end">
                                            <button
                                                className="p-2 hover:bg-blue-50 rounded-lg transition-colors group/edit"
                                                title={t('edit')}
                                            >
                                                <Pencil className="w-4 h-4 text-gray-400 group-hover/edit:text-blue-600" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteRole(role.id)}
                                                className="p-2 hover:bg-red-50 rounded-lg transition-colors group/del"
                                                title={t('delete')}
                                            >
                                                <Trash2 className="w-4 h-4 text-gray-400 group-hover/del:text-red-600" />
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
                    totalItems={filteredRoles.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}
