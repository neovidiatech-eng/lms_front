import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, DollarSign, Search, Star, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import AddCurrencyModal from '../components/modals/AddCurrencyModal';
import EditCurrencyModal from '../components/modals/EditCurrencyModal';
import ViewCurrencyModal from '../components/modals/ViewCurrencyModal';

interface Currency {
  id: string;
  code: string;
  nameAr: string;
  nameEn: string;
  symbol: string;
  exchangeRate: number;
  isDefault: boolean;
}

export default function Currencies() {
  const { language } = useLanguage();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const text = {
    title: { ar: 'إدارة العملات', en: 'Currency Management' },
    addCurrency: { ar: 'إضافة عملة', en: 'Add Currency' },
    search: { ar: 'البحث في العملات...', en: 'Search currencies...' },
    code: { ar: 'الكود', en: 'Code' },
    name: { ar: 'الاسم', en: 'Name' },
    symbol: { ar: 'الرمز', en: 'Symbol' },
    exchangeRate: { ar: 'سعر الصرف', en: 'Exchange Rate' },
    isDefault: { ar: 'افتراضي', en: 'Default' },
    actions: { ar: 'الإجراءات', en: 'Actions' },
    edit: { ar: 'تعديل', en: 'Edit' },
    delete: { ar: 'حذف', en: 'Delete' },
    view: { ar: 'عرض', en: 'View' },
    yes: { ar: 'نعم', en: 'Yes' },
    no: { ar: 'لا', en: 'No' },
    noCurrencies: { ar: 'لا توجد عملات', en: 'No currencies found' },
    confirmDelete: { ar: 'هل أنت متأكد من حذف هذه العملة؟', en: 'Are you sure you want to delete this currency?' },
    cannotDeleteDefault: { ar: 'لا يمكن حذف العملة الافتراضية', en: 'Cannot delete default currency' },
    totalCurrencies: { ar: 'إجمالي العملات', en: 'Total Currencies' },
    defaultCurrency: { ar: 'العملة الافتراضية', en: 'Default Currency' },
  };

  const [currencies, setCurrencies] = useState<Currency[]>([
    {
      id: '1',
      code: 'SAR',
      nameAr: 'ر.س',
      nameEn: 'Saudi Riyal',
      symbol: 'ر.س',
      exchangeRate: 1,
      isDefault: true
    },
    {
      id: '2',
      code: 'EGP',
      nameAr: 'ج.م',
      nameEn: 'Egyptian Pound',
      symbol: 'ج.م',
      exchangeRate: 12.72,
      isDefault: false
    },
    {
      id: '3',
      code: 'USD',
      nameAr: 'دولار أمريكي',
      nameEn: 'US Dollar',
      symbol: '$',
      exchangeRate: 0.27,
      isDefault: false
    }
  ]);

  const recalculateExchangeRates = (oldDefaultRate: number, newDefaultId: string) => {
    setCurrencies(prevCurrencies =>
      prevCurrencies.map(curr => {
        if (curr.id === newDefaultId) {
          return { ...curr, isDefault: true, exchangeRate: 1 };
        }
        if (curr.isDefault) {
          return { ...curr, isDefault: false, exchangeRate: oldDefaultRate };
        }
        const newRate = curr.exchangeRate / oldDefaultRate;
        return { ...curr, exchangeRate: parseFloat(newRate.toFixed(4)) };
      })
    );
  };

  const handleAddCurrency = (currency: Omit<Currency, 'id'>) => {
    const newCurrency = { ...currency, id: Date.now().toString() };
    if (newCurrency.isDefault) {
      const oldDefault = currencies.find(c => c.isDefault);
      if (oldDefault) recalculateExchangeRates(newCurrency.exchangeRate, newCurrency.id);
      setCurrencies([...currencies, { ...newCurrency, exchangeRate: 1 }]);
    } else {
      setCurrencies([...currencies, newCurrency]);
    }
  };

  const handleEditCurrency = (updatedCurrency: Currency) => {
    const oldCurrency = currencies.find(c => c.id === updatedCurrency.id);
    if (updatedCurrency.isDefault && !oldCurrency?.isDefault) {
      recalculateExchangeRates(updatedCurrency.exchangeRate, updatedCurrency.id);
    } else {
      setCurrencies(currencies.map(c => c.id === updatedCurrency.id ? updatedCurrency : c));
    }
  };

  const handleDeleteCurrency = (id: string) => {
    const currency = currencies.find(c => c.id === id);
    if (currency?.isDefault) {
      alert(text.cannotDeleteDefault[language]);
      return;
    }
    if (window.confirm(text.confirmDelete[language])) {
      setCurrencies(currencies.filter(c => c.id !== id));
    }
  };

  const handleViewCurrency = (currency: Currency) => {
    setSelectedCurrency(currency);
    setShowViewModal(true);
  };

  const handleEditClick = (currency: Currency) => {
    setSelectedCurrency(currency);
    setShowEditModal(true);
  };

  const filteredCurrencies = currencies.filter(currency =>
    currency.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    currency.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
    currency.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const defaultCurrency = currencies.find(c => c.isDefault);

  return (
    <div className="p-6" dir="rtl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{text.title[language]}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {currencies.length} {language === 'ar' ? 'عملة مضافة' : 'currencies added'}
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 btn-primary text-white rounded-xl font-medium"
        >
          <Plus className="w-4 h-4" />
          <span>{text.addCurrency[language]}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center flex-shrink-0">
            <DollarSign className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-gray-500">{text.totalCurrencies[language]}</p>
            <p className="text-2xl font-bold text-gray-900">{currencies.length}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
            <Star className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">{text.defaultCurrency[language]}</p>
            <p className="text-lg font-bold text-gray-900">
              {defaultCurrency ? (language === 'ar' ? defaultCurrency.nameAr : defaultCurrency.nameEn) : '-'}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder={text.search[language]}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-xs pr-9 pl-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-right"
            />
          </div>
        </div>

        {filteredCurrencies.length === 0 ? (
          <div className="py-20 text-center">
            <DollarSign className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">{text.noCurrencies[language]}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">{text.code[language]}</th>
                  <th className="px-6 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">{text.name[language]}</th>
                  <th className="px-6 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">{text.symbol[language]}</th>
                  <th className="px-6 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">{text.exchangeRate[language]}</th>
                  <th className="px-6 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">{text.isDefault[language]}</th>
                  <th className="px-6 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">{text.actions[language]}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredCurrencies.map((currency) => (
                  <tr
                    key={currency.id}
                    className={`hover:bg-gray-50 transition-colors ${currency.isDefault ? 'bg-green-50/40' : ''}`}
                  >
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-gray-100 text-gray-800 text-sm font-bold font-mono">
                        {currency.code}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-medium text-gray-900">
                        {language === 'ar' ? currency.nameAr : currency.nameEn}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-base font-bold text-gray-700">{currency.symbol}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-sm font-semibold text-gray-900">{currency.exchangeRate}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {currency.isDefault ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                          <Star className="w-3 h-3" />
                          {text.yes[language]}
                        </span>
                      ) : (
                        <span className="inline-flex px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-medium">
                          {text.no[language]}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleViewCurrency(currency)}
                          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title={text.view[language]}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditClick(currency)}
                          className="p-1.5 icon-btn-primary rounded-lg transition-colors"
                          title={text.edit[language]}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCurrency(currency.id)}
                          className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title={text.delete[language]}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showAddModal && (
        <AddCurrencyModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddCurrency}
        />
      )}

      {showEditModal && selectedCurrency && (
        <EditCurrencyModal
          isOpen={showEditModal}
          onClose={() => { setShowEditModal(false); setSelectedCurrency(null); }}
          currency={selectedCurrency}
          onSave={handleEditCurrency}
        />
      )}

      {showViewModal && selectedCurrency && (
        <ViewCurrencyModal
          isOpen={showViewModal}
          onClose={() => { setShowViewModal(false); setSelectedCurrency(null); }}
          currency={selectedCurrency}
        />
      )}
    </div>
  );
}
