import { useState } from 'react';
import { BookOpen, Plus, Pencil, Trash2, Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import SubjectForm, { COLORS } from '../components/modals/SubjectsModal';

interface Subject {
  id: string;
  nameAr: string;
  nameEn?: string;
  status: 'active' | 'inactive';
  color: string;
}
function getColorClasses(colorId: string) {
  return COLORS.find(c => c.id === colorId) || COLORS[0];
}

const INITIAL_SUBJECTS: Subject[] = [
  { id: '1', nameAr: 'الرياضيات', nameEn: 'Math', status: 'active', color: 'green' },
  { id: '2', nameAr: 'اللغة العربية', nameEn: 'Arabic', status: 'active', color: 'orange' },
  { id: '3', nameAr: 'القرآن الكريم', nameEn: 'Quran', status: 'active', color: 'green' },
  { id: '4', nameAr: 'الفيزياء', nameEn: 'Physics', status: 'active', color: 'blue' },
  { id: '5', nameAr: 'الكيمياء', nameEn: 'Chemistry', status: 'active', color: 'teal' },
];

export default function Subjects() {
  const { language } = useLanguage();
  const [subjects, setSubjects] = useState<Subject[]>(INITIAL_SUBJECTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

  const filtered = subjects.filter(s => {
    const matchSearch =
      s.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.nameEn && s.nameEn.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchStatus = filterStatus === 'all' || s.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleAdd = (data: Omit<Subject, 'id'>) => {
    setSubjects(prev => [...prev, { ...data, id: Date.now().toString() }]);
    setShowAddModal(false);
  };

  const handleEdit = (data: Omit<Subject, 'id'>) => {
    if (!editingSubject) return;
    setSubjects(prev => prev.map(s => s.id === editingSubject.id ? { ...data, id: s.id } : s));
    setEditingSubject(null);
  };

  const handleDelete = (id: string) => {
    const subject = subjects.find(s => s.id === id);
    const name = subject ? subject.nameAr : '';
    if (window.confirm(language === 'ar' ? `هل أنت متأكد من حذف "${name}"؟` : `Delete "${name}"?`)) {
      setSubjects(prev => prev.filter(s => s.id !== id));
    }
  };

  const toggleStatus = (id: string) => {
    setSubjects(prev => prev.map(s =>
      s.id === id ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' } : s
    ));
  };

  return (
    <div className="p-6 lg:p-8" dir="rtl">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{language === 'ar' ? 'إدارة المواد الدراسية' : 'Subject Management'}</h1>
          <p className="text-gray-500 text-sm mt-1">{language === 'ar' ? 'إضافة وتعديل المواد الدراسية المتاحة' : 'Add and manage available subjects'}</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-blue-600/20"
        >
          <Plus className="w-5 h-5" />
          {language === 'ar' ? 'إضافة مادة جديدة' : 'Add Subject'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">{language === 'ar' ? 'إجمالي المواد' : 'Total Subjects'}</p>
            <p className="text-3xl font-bold text-blue-600">{subjects.length}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">{language === 'ar' ? 'نشطة' : 'Active'}</p>
            <p className="text-3xl font-bold text-green-600">{subjects.filter(s => s.status === 'active').length}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-gray-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">{language === 'ar' ? 'غير نشطة' : 'Inactive'}</p>
            <p className="text-3xl font-bold text-gray-500">{subjects.filter(s => s.status === 'inactive').length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={language === 'ar' ? 'بحث في المواد...' : 'Search subjects...'}
              dir="rtl"
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-right"
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'active', 'inactive'] as const).map(s => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  filterStatus === s
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {s === 'all' ? (language === 'ar' ? 'الكل' : 'All') : s === 'active' ? (language === 'ar' ? 'نشط' : 'Active') : (language === 'ar' ? 'غير نشط' : 'Inactive')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center shadow-sm">
          <BookOpen className="w-16 h-16 text-gray-200 mx-auto mb-4" />
          <p className="text-gray-500 text-lg font-medium">{language === 'ar' ? 'لا توجد مواد' : 'No subjects found'}</p>
          <p className="text-gray-400 text-sm mt-1">{language === 'ar' ? 'اضغط على "إضافة مادة جديدة" للبدء' : 'Click "Add Subject" to get started'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(subject => {
            const colorClasses = getColorClasses(subject.color);
            return (
              <div
                key={subject.id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleDelete(subject.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title={language === 'ar' ? 'حذف' : 'Delete'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setEditingSubject(subject)}
                        className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        title={language === 'ar' ? 'تعديل' : 'Edit'}
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                    </div>
                    <div className={`w-14 h-14 ${colorClasses.bg} rounded-2xl flex items-center justify-center border ${colorClasses.border}`}>
                      <BookOpen className={`w-7 h-7 ${colorClasses.icon}`} />
                    </div>
                  </div>

                  <div className="text-right">
                    <h3 className="text-lg font-bold text-gray-900 mb-0.5">{subject.nameAr}</h3>
                    {subject.nameEn && <p className="text-sm text-gray-400 mb-3">{subject.nameEn}</p>}
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => toggleStatus(subject.id)}
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                          subject.status === 'active'
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {subject.status === 'active' ? (language === 'ar' ? 'نشط' : 'Active') : (language === 'ar' ? 'غير نشط' : 'Inactive')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showAddModal && (
        <SubjectForm
          title={language === 'ar' ? 'إضافة مادة جديدة' : 'Add New Subject'}
          onSave={handleAdd}
          onCancel={() => setShowAddModal(false)}
        />
      )}

      {editingSubject && (
        <SubjectForm
          title={language === 'ar' ? 'تعديل المادة' : 'Edit Subject'}
          initial={editingSubject}
          onSave={handleEdit}
          onCancel={() => setEditingSubject(null)}
        />
      )}
    </div>
  );
}
