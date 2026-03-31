import { useState } from 'react';
import { X, Save, Bell, Send } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface EditSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscription: {
    id: string;
    studentName: string;
    planName: string;
    planPrice: string;
    startDate: string;
    endDate: string;
    status: 'active' | 'expired' | 'cancelled';
    sessionsRemaining: number;
    totalSessions: number;
  };
  onSave: (updatedSubscription: any) => void;
}

export default function EditSubscriptionModal({
  isOpen,
  onClose,
  subscription,
  onSave
}: EditSubscriptionModalProps) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    planName: subscription.planName,
    planPrice: subscription.planPrice,
    startDate: subscription.startDate,
    endDate: subscription.endDate,
    status: subscription.status,
    totalSessions: subscription.totalSessions,
    sessionsRemaining: subscription.sessionsRemaining
  });
  const [showNotificationBox, setShowNotificationBox] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const text = {
    title: { ar: 'تعديل الاشتراك', en: 'Edit Subscription' },
    studentName: { ar: 'اسم الطالب', en: 'Student Name' },
    planName: { ar: 'اسم الباقة', en: 'Plan Name' },
    price: { ar: 'السعر', en: 'Price' },
    startDate: { ar: 'تاريخ البدء', en: 'Start Date' },
    endDate: { ar: 'تاريخ الانتهاء', en: 'End Date' },
    status: { ar: 'الحالة', en: 'Status' },
    active: { ar: 'نشط', en: 'Active' },
    expired: { ar: 'منتهي', en: 'Expired' },
    cancelled: { ar: 'ملغي', en: 'Cancelled' },
    totalSessions: { ar: 'إجمالي الحصص', en: 'Total Sessions' },
    remainingSessions: { ar: 'الحصص المتبقية', en: 'Remaining Sessions' },
    save: { ar: 'حفظ', en: 'Save' },
    cancel: { ar: 'إلغاء', en: 'Cancel' },
    sendNotification: { ar: 'إرسال تنبيه', en: 'Send Notification' },
    notificationTitle: { ar: 'إرسال رسالة تنبيه', en: 'Send Notification Message' },
    notificationPlaceholder: { ar: 'اكتب رسالة التنبيه هنا...', en: 'Write notification message here...' },
    send: { ar: 'إرسال', en: 'Send' },
    notificationSent: { ar: 'تم إرسال التنبيه بنجاح!', en: 'Notification sent successfully!' }
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...subscription, ...formData });
    onClose();
  };

  const handleSendNotification = () => {
    if (notificationMessage.trim()) {
      console.log('Sending notification:', {
        to: subscription.studentName,
        message: notificationMessage
      });
      alert(text.notificationSent[language]);
      setNotificationMessage('');
      setShowNotificationBox(false);
    }
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
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              {text.studentName[language]}
            </label>
            <input
              type="text"
              value={subscription.studentName}
              disabled
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 text-right cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              {text.planName[language]}
            </label>
            <input
              type="text"
              value={formData.planName}
              onChange={(e) => setFormData({ ...formData, planName: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              {text.price[language]}
            </label>
            <input
              type="text"
              value={formData.planPrice}
              onChange={(e) => setFormData({ ...formData, planPrice: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                {text.startDate[language]}
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                {text.endDate[language]}
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              {text.status[language]}
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
            >
              <option value="active">{text.active[language]}</option>
              <option value="expired">{text.expired[language]}</option>
              <option value="cancelled">{text.cancelled[language]}</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                {text.totalSessions[language]}
              </label>
              <input
                type="number"
                value={formData.totalSessions}
                onChange={(e) => setFormData({ ...formData, totalSessions: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                {text.remainingSessions[language]}
              </label>
              <input
                type="number"
                value={formData.sessionsRemaining}
                onChange={(e) => setFormData({ ...formData, sessionsRemaining: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                min="0"
                max={formData.totalSessions}
                required
              />
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <button
              type="button"
              onClick={() => setShowNotificationBox(!showNotificationBox)}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all font-medium shadow-lg"
            >
              <Bell className="w-5 h-5" />
              {text.sendNotification[language]}
            </button>

            {showNotificationBox && (
              <div className="mt-4 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-4 space-y-3 animate-fadeIn">
                <h3 className="text-base font-semibold text-gray-900 text-right">
                  {text.notificationTitle[language]}
                </h3>
                <textarea
                  value={notificationMessage}
                  onChange={(e) => setNotificationMessage(e.target.value)}
                  placeholder={text.notificationPlaceholder[language]}
                  className="w-full px-4 py-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-right resize-none"
                  rows={4}
                />
                <button
                  type="button"
                  onClick={handleSendNotification}
                  disabled={!notificationMessage.trim()}
                  className="w-full flex items-center justify-center gap-2 px-6 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                  {text.send[language]}
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              {text.cancel[language]}
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all font-medium shadow-lg"
            >
              <Save className="w-5 h-5" />
              {text.save[language]}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
