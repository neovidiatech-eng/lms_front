import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface SidebarToggleProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function SidebarToggle({ isCollapsed, onToggle }: SidebarToggleProps) {
  const { language } = useLanguage();
  const isRtl = language === 'ar';

  return (
    <button
      onClick={onToggle}
      className={`absolute bottom-8 ${isRtl ? '-left-3' : '-right-3'} w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all z-50`}
    >
      {isCollapsed ? (
        isRtl ? <ChevronLeft className="w-4 h-4 text-gray-600" /> : <ChevronRight className="w-4 h-4 text-gray-600" />
      ) : (
        isRtl ? <ChevronRight className="w-4 h-4 text-gray-600" /> : <ChevronLeft className="w-4 h-4 text-gray-600" />
      )}
    </button>
  );
}
