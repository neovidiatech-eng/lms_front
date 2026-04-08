import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const language = i18n.language.split('-')[0];
  const setLanguage = (lang: string) => i18n.changeLanguage(lang);

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="relative inline-block">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as 'ar' | 'en')}
          className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 cursor-pointer hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
        >
          <option value="ar">{t('arabic')}</option>
          <option value="en">{t('english')}</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
      </div>
    </div>
  );
}
