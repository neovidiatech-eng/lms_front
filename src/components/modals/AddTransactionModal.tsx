import { useState } from 'react';
import { X, Save } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import type { Transaction } from '../../pages/Transactions';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: Omit<Transaction, 'id'>) => void;
  currencies: { code: string; symbol: string; rate: number }[];
}

export default function AddTransactionModal({ isOpen, onClose, onSave, currencies }: AddTransactionModalProps) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    type: 'income' as 'income' | 'teacher_expense',
    studentName: '',
    teacherName: '',
    amount: '',
    currency: 'SAR',
    paymentMethod: '',
    date: new Date().toISOString().split('T')[0],
    status: 'pending' as 'completed' | 'pending',
    notes: '',
    sessionCount: '',
    sessionDuration: 60,
    ratePerHour: ''
  });

  const text = {
    title: { ar: 'إضافة معاملة جديدة', en: 'Add New Transaction' },
    type: { ar: 'النوع', en: 'Type' },
    income: { ar: 'إيراد (اشتراك طالب)', en: 'Income (Student Subscription)' },
    teacher_expense: { ar: 'مصروف معلم', en: 'Teacher Expense' },
    student: { ar: 'اسم الطالب', en: 'Student Name' },
    teacher: { ar: 'اسم المعلم', en: 'Teacher Name' },
    amount: { ar: 'المبلغ', en: 'Amount' },
    currency: { ar: 'العملة', en: 'Currency' },
    paymentMethod: { ar: 'طريقة الدفع', en: 'Payment Method' },
    date: { ar: 'التاريخ', en: 'Date' },
    status: { ar: 'الحالة', en: 'Status' },
    completed: { ar: 'مكتمل', en: 'Completed' },
    pending: { ar: 'معلق', en: 'Pending' },
    notes: { ar: 'ملاحظات', en: 'Notes' },
    sessionCount: { ar: 'عدد الحصص', en: 'Session Count' },
    sessionDuration: { ar: 'مدة الحصة (دقيقة)', en: 'Session Duration (min)' },
    ratePerHour: { ar: 'سعر الساعة للمعلم', en: 'Teacher Rate/Hour' },
    save: { ar: 'إضافة', en: 'Add' },
    cancel: { ar: 'إلغاء', en: 'Cancel' },
    calcNote: { ar: 'المبلغ = عدد الحصص × (مدة الحصة / 60) × سعر الساعة', en: 'Amount = sessions × (duration/60) × rate/hour' }
  };

  if (!isOpen) return null;

  const handleCalculate = () => {
    const sessions = parseFloat(formData.sessionCount) || 0;
    const duration = formData.sessionDuration;
    const rate = parseFloat(formData.ratePerHour) || 0;
    const calculated = sessions * (duration / 60) * rate;
    setFormData(prev => ({ ...prev, amount: calculated.toFixed(2) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      type: formData.type,
      studentName: formData.studentName,
      teacherName: formData.teacherName,
      amount: parseFloat(formData.amount),
      currency: formData.currency,
      paymentMethod: formData.paymentMethod,
      date: formData.date,
      status: formData.status,
      notes: formData.notes,
      sessionCount: parseInt(formData.sessionCount) || undefined,
      sessionDuration: formData.sessionDuration,
      ratePerHour: parseFloat(formData.ratePerHour) || undefined
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-bold text-gray-900">{text.title[language]}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">{text.type[language]}</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as 'income' | 'teacher_expense' })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-right bg-white appearance-none"
            >
              <option value="income">{text.income[language]}</option>
              <option value="teacher_expense">{text.teacher_expense[language]}</option>
            </select>
          </div>

          {formData.type === 'income' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">{text.student[language]} *</label>
              <input
                type="text"
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-right"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">{text.teacher[language]} *</label>
            <input
              type="text"
              value={formData.teacherName}
              onChange={(e) => setFormData({ ...formData, teacherName: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-right"
              required
            />
          </div>

          {formData.type === 'teacher_expense' && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-4">
              <p className="text-sm text-primary font-medium text-right">{text.calcNote[language]}</p>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1 text-right">{text.sessionCount[language]}</label>
                  <input
                    type="number"
                    value={formData.sessionCount}
                    onChange={(e) => setFormData({ ...formData, sessionCount: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-right text-sm"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1 text-right">{text.sessionDuration[language]}</label>
                  <select
                    value={formData.sessionDuration}
                    onChange={(e) => setFormData({ ...formData, sessionDuration: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-right text-sm bg-white appearance-none"
                  >
                    <option value={30}>30</option>
                    <option value={45}>45</option>
                    <option value={60}>60</option>
                    <option value={90}>90</option>
                    <option value={120}>120</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1 text-right">{text.ratePerHour[language]}</label>
                  <input
                    type="number"
                    value={formData.ratePerHour}
                    onChange={(e) => setFormData({ ...formData, ratePerHour: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-right text-sm"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={handleCalculate}
                className="w-full py-2 btn-primary text-white rounded-lg text-sm font-medium transition-colors"
              >
                {language === 'ar' ? 'احسب المبلغ تلقائياً' : 'Auto Calculate Amount'}
              </button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">{text.amount[language]} *</label>
              <input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-right"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">{text.currency[language]}</label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-right bg-white appearance-none"
              >
                {currencies.map(c => (
                  <option key={c.code} value={c.code}>{c.symbol} {c.code}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">{text.date[language]} *</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-right"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">{text.paymentMethod[language]}</label>
              <input
                type="text"
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-right"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">{text.status[language]}</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'completed' | 'pending' })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-right bg-white appearance-none"
            >
              <option value="pending">{text.pending[language]}</option>
              <option value="completed">{text.completed[language]}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">{text.notes[language]}</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-right resize-none"
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
            >
              {text.cancel[language]}
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 btn-primary text-white rounded-lg font-medium flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              {text.save[language]}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
