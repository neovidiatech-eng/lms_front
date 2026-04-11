import { DatePicker, ConfigProvider } from 'antd';
import ar_EG from 'antd/locale/ar_EG';
import dayjs from 'dayjs';
import 'dayjs/locale/ar';

interface DatePickerFieldProps {
  value?: string;        // YYYY-MM-DD or YYYY-MM string
  onChange?: (value: string) => void;
  label?: string;
  error?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  picker?: 'date' | 'month' | 'year' | 'week' | 'quarter';
}

export default function DatePickerField({
  value,
  onChange,
  label,
  error,
  placeholder = 'اختر التاريخ',
  className = '',
  disabled = false,
  picker = 'date',
}: DatePickerFieldProps) {
  const dayjsValue = value ? dayjs(value) : null;

  const formatMap: Record<string, string> = {
    date: 'DD/MM/YYYY',
    month: 'MM/YYYY',
    year: 'YYYY',
    week: 'wo/YYYY',
    quarter: 'Q/YYYY',
  };

  const outputFormatMap: Record<string, string> = {
    date: 'YYYY-MM-DD',
    month: 'YYYY-MM',
    year: 'YYYY',
    week: 'YYYY-wo',
    quarter: 'YYYY-Q',
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
          {label}
        </label>
      )}
      <ConfigProvider locale={ar_EG} direction="rtl"
        theme={{
          components: {
            DatePicker: {
              cellHeight: 35,
              cellWidth: 45,
            },
          },
        }}
      >
        <DatePicker
          picker={picker}
          value={dayjsValue}
          onChange={(date) => onChange?.(date ? date.format(outputFormatMap[picker]) : '')}
          placeholder={placeholder}
          format={formatMap[picker]}
          style={{ width: '100%' }}
          disabled={disabled}
          size="large"
          status={error ? 'error' : undefined}
        />
      </ConfigProvider>
      {error && <p className="text-red-500 text-xs mt-1 text-right">{error}</p>}
    </div>
  );
}

