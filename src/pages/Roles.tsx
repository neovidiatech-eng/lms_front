import { useEffect, useState } from "react";
import { Trash2, Plus, Pencil } from "lucide-react";
import { useTranslation } from "react-i18next";
import Pagination from "../components/ui/Pagination";
import { useDeleteRole, useAddRole, useSearchRoles, useUpdateRole } from "../hooks/useRoles";
import AddRoleModal from "../components/modals/AddRoleModal";
import { Role } from "../types/roles";
import { RoleFormData } from "../lib/schemas/RoleSchema";

export default function Roles() {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<any>(null);
    const { data: roles, isLoading } = useSearchRoles(debouncedSearch);
    const { mutate: addRole, isPending: isAdding } = useAddRole();
    const { mutate: updateRole, isPending: isUpdating } = useUpdateRole();
    const { mutate: deleteRole } = useDeleteRole();

    const itemsPerPage = 7;
    useEffect(() => {
        if (searchTerm.length > 2) {
            setDebouncedSearch(searchTerm);
        } else {
            setDebouncedSearch("");
        }
    }, [searchTerm]);



    if (isLoading) return <div className="p-6">Loading...</div>;

    const filteredRoles = roles?.data || [];

    const totalPages = Math.ceil(filteredRoles.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentRoles = filteredRoles.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    const handleDeleteRole = (id: string) => {
        if (window.confirm(t("deleteConfirmRole"))) {
            deleteRole({ id });
        }
    };
    const handleEditClick = (role: Role) => {
        setSelectedRole(role);
        setIsModalOpen(true);
    };

    const handleSubmitRole = (data: RoleFormData) => {
        if (selectedRole) {
            updateRole({
                id: selectedRole.id,
                role: { name: data.name },
            });
        } else {
            addRole({ name: data.name });
        }

        setIsModalOpen(false);
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between mb-6">
                <h1 className="text-2xl font-bold">{t("roles")}</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn-primary flex items-center gap-2 px-4 py-2"
                >
                    <Plus /> {t("addNewRole")}
                </button>
            </div>

            {/* Search */}
            <input
                type="text"
                placeholder={t("search")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 w-full border p-2 rounded"
            />

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">

                        {/* HEADER */}
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                                    {t("roleName")}
                                </th>

                                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                                    {t("actions")}
                                </th>
                            </tr>
                        </thead>

                        {/* BODY */}
                        <tbody className="divide-y divide-gray-200">

                            {currentRoles.length > 0 ? (
                                currentRoles.map((role: any) => (
                                    <tr
                                        key={role.id}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        {/* ROLE NAME */}
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-medium text-gray-900">
                                                {role.name}
                                            </span>
                                        </td>

                                        {/* ACTIONS */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 justify-start">

                                                <button
                                                    onClick={() => handleEditClick(role)}
                                                    className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                                                >
                                                    <Pencil className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                                                </button>

                                                <button
                                                    onClick={() => handleDeleteRole(role.id)}
                                                    className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                                                >
                                                    <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={2} className="px-6 py-12 text-center text-gray-500">
                                        {t("noData")}
                                    </td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={filteredRoles.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                />
            </div>
            {/* Modal */}
            <AddRoleModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmitRole}
                initialData={selectedRole}
                isLoading={isAdding || isUpdating}
            />
        </div>
    );
}