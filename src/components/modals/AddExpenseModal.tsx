import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (expense: any) => void;
}

export default function AddExpenseModal({ isOpen, onClose, onSave }: AddExpenseModalProps) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    currency: 'SAR',
    category: 'general',
    date: new Date().toISOString().split('T')[0],
    paymentMethod: '',
    status: 'pending' as 'paid' | 'pending'
  });

  const text = {
    title: { ar: 'إضافة مصروف جديد', en: 'Add New Expense' },
    description: { ar: 'الوصف', en: 'Description' },
    descriptionPlaceholder: { ar: 'أدخل الوصف', en: 'Enter description' },
    amount: { ar: 'المبلغ', en: 'Amount' },
    currency: { ar: 'العملة', en: 'Currency' },
    category: { ar: 'الفئة', en: 'Category' },
    date: { ar: 'التاريخ', en: 'Date' },
    paymentMethod: { ar: 'طريقة الدفع', en: 'Payment Method' },
    paymentMethodPlaceholder: { ar: 'أدخل طريقة الدفع', en: 'Enter payment method' },
    status: { ar: 'الحالة', en: 'Status' },
    paid: { ar: 'مقبول', en: 'Paid' },
    pending: { ar: 'معلق', en: 'Pending' },
    save: { ar: 'إضافة', en: 'Add' },
    cancel: { ar: 'إلغاء', en: 'Cancel' },
    salaries: { ar: 'رواتب', en: 'Salaries' },
    utilities: { ar: 'مرافق', en: 'Utilities' },
    supplies: { ar: 'لوازم', en: 'Supplies' },
    marketing: { ar: 'تسويق', en: 'Marketing' },
    general: { ar: 'عام', en: 'General' },
    administrative: { ar: 'إدارية', en: 'Administrative' },
    other: { ar: 'أخرى', en: 'Other' }
  };

  const categories = [
    { id: 'salaries', label: text.salaries },
    { id: 'utilities', label: text.utilities },
    { id: 'supplies', label: text.supplies },
    { id: 'marketing', label: text.marketing },
    { id: 'general', label: text.general },
    { id: 'administrative', label: text.administrative },
    { id: 'other', label: text.other }
  ];

  const currencies = [
    { code: 'SAR', symbol: 'ر.س' },
    { code: 'EGP', symbol: 'ج.م' },
    { code: 'USD', symbol: '$' }
  ];

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      description: formData.description,
      amount: parseFloat(formData.amount),
      currency: formData.currency,
      category: formData.category,
      date: formData.date,
      paymentMethod: formData.paymentMethod,
      status: formData.status
    });
    onClose();
    setFormData({
      description: '',
      amount: '',
      currency: 'SAR',
      category: 'general',
      date: new Date().toISOString().split('T')[0],
      paymentMethod: '',
      status: 'pending'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">{text.title[language]}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              {text.description[language]} *
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder={text.descriptionPlaceholder[language]}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-right"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                {text.category[language]} *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-right appearance-none bg-white"
                required
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.label[language]}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                {text.currency[language]} *
              </label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-right appearance-none bg-white"
                required
              >
                {currencies.map(curr => (
                  <option key={curr.code} value={curr.code}>{curr.symbol}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              {text.amount[language]} *
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="0.00"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-right"
              min="0"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              {text.date[language]} *
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-right"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              {text.paymentMethod[language]}
            </label>
            <input
              type="text"
              value={formData.paymentMethod}
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              placeholder={text.paymentMethodPlaceholder[language]}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-right"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              {text.status[language]} *
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'paid' | 'pending' })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-right appearance-none bg-white"
              required
            >
              <option value="pending">{text.pending[language]}</option>
              <option value="paid">{text.paid[language]}</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              {text.cancel[language]}
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 btn-primary text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              <span>{text.save[language]}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
