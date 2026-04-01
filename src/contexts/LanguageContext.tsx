import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'ar' | 'en';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  ar: {
    createNewStudentAccount: 'إنشاء حساب طالب جديد',
    orLogin: 'أو سجل الدخول',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    rememberMe: 'تذكرني',
    forgotPassword: 'هل نسيت كلمة المرور؟',
    login: 'تسجيل الدخول',
    academyName: 'أكاديمية',
    academySubtitle: 'النمر التعليمية',
    academyDescription: 'منصة تعليمية متكاملة لإدارة العملية التعليمية',
    footerText: '© 2024 أكاديمية النمر التعليمية - جميع الحقوق محفوظة',
    arabic: 'العربية',
    english: 'English',
    registerNewStudent: 'تسجيل طالب جديد',
    joinAcademy: 'انضم إلى أكاديمية النمر وابدأ رحلتك التعليمية',
    fullName: 'الاسم الكامل',
    phoneNumber: 'رقم الهاتف',
    choosePackage: 'اختر الباقة',
    registerNow: 'تسجيل الآن',
    afterRegistration: 'بعد التسجيل، سيتم مراجعة طلبك من قبل الإدارة وسيتم إشعارك بالموافقة',
    backToLogin: 'العودة لتسجيل الدخول',
    donthaveanaccount: "ليس لديك حساب؟",
    or: "أو"
  },
  en: {
    createNewStudentAccount: 'Create New Student Account',
    orLogin: 'Or Login',
    email: 'Email',
    password: 'Password',
    rememberMe: 'Remember Me',
    forgotPassword: 'Forgot Password?',
    login: 'Login',
    academyName: 'Academy',
    academySubtitle: 'Al-Nimr Educational',
    academyDescription: 'Integrated educational platform for managing the educational process',
    footerText: '© 2024 Al-Nimr Educational Academy - All Rights Reserved',
    arabic: 'العربية',
    english: 'English',
    registerNewStudent: 'Register New Student',
    joinAcademy: 'Join Al-Nimr Academy and start your educational journey',
    fullName: 'Full Name',
    phoneNumber: 'Phone Number',
    choosePackage: 'Choose Package',
    registerNow: 'Register Now',
    afterRegistration: 'After registration, your request will be reviewed by the administration and you will be notified of approval',
    backToLogin: 'Back to Login',
    donthaveanaccount: "Don't have an account",
    or: "Or"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ar');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.ar] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen">
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
